import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import sharp from 'sharp'

/**
 * Utility to determine MIME type from file extension
 */
export function mimeFromExt(ext) {
  switch (ext.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.png':
      return 'image/png'
    case '.webp':
      return 'image/webp'
    case '.gif':
      return 'image/gif'
    default:
      return 'application/octet-stream'
  }
}

/**
 * Generic cover image handler for featured/projects/etc.
 * @param {string} contentDir - Base directory (e.g., 'content/featured')
 * @param {string} slug - Resource slug
 * @param {boolean} isFolder - Whether the resource is a folder with index.md or a single .md file
 */
export async function handleCoverImage(contentDir, slug, isFolder = true) {
  try {
    let indexPath, folder;
    
    if (isFolder) {
      folder = path.join(contentDir, slug);
      indexPath = path.join(folder, 'index.md');
    } else {
      indexPath = path.join(contentDir, `${slug}.md`);
      folder = path.dirname(indexPath);
    }

    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(indexPath, 'utf8');
    const { data } = matter(fileContents);
    const cover = data.cover?.replace(/^\.\//, '');

    if (!cover) {
      return NextResponse.json({ error: 'Cover not found' }, { status: 404 });
    }

    const coverPath = path.join(folder, cover);
    if (!fs.existsSync(coverPath)) {
      return NextResponse.json({ error: 'Cover file missing' }, { status: 404 });
    }

    let buffer = fs.readFileSync(coverPath);
    let mimeType = mimeFromExt(path.extname(coverPath));

    // Optimize images using sharp
    try {
      if (mimeType.startsWith('image/')) {
        buffer = await sharp(buffer)
          .resize(800, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        mimeType = 'image/webp';
      }
    } catch (e) {
      console.error('Sharp optimization failed, serving original', e);
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Failed to serve cover image', error);
    return NextResponse.json({ error: 'Failed to load cover' }, { status: 500 });
  }
}
