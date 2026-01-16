import { NextResponse } from 'next/server'
import { readUpload } from '@/lib/api'

const mimeFromExt = ext => {
  switch (ext.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.png':
      return 'image/png'
    case '.gif':
      return 'image/gif'
    case '.webp':
      return 'image/webp'
    case '.svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

export async function GET(_req, { params }) {
  const awaitedParams = await params;
  try {
    const parts = Array.isArray(awaitedParams?.path) ? awaitedParams.path : [];
    // Try uploads first
    let result = readUpload(parts);
    // Fallback: try posts, featured, jobs, projects
    if (!result) {
      const { join } = require('path');
      const fs = require('fs');
      const baseDirs = [
        join(process.cwd(), 'content/posts'),
        join(process.cwd(), 'content/featured'),
        join(process.cwd(), 'content/jobs'),
        join(process.cwd(), 'content/projects'),
      ];
      for (const baseDir of baseDirs) {
        const targetPath = join(baseDir, ...parts);
        // Prevent path traversal
        if (!targetPath.startsWith(baseDir)) continue;
        if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
          const buffer = fs.readFileSync(targetPath);
          const ext = require('path').extname(targetPath);
          result = { buffer, ext };
          break;
        }
      }
    }
    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const { buffer, ext } = result;
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mimeFromExt(ext),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Failed to serve upload', error);
    return NextResponse.json({ error: 'Failed to load upload' }, { status: 500 });
  }
}
