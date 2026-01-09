import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import remarkGithub from 'remark-github'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { slugify } from '../utils/helpers'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const featuredDirectory = path.join(process.cwd(), 'content/featured')
const jobsDirectory = path.join(process.cwd(), 'content/jobs')
const projectsDirectory = path.join(process.cwd(), 'content/projects')
const uploadsDirectory = path.join(process.cwd(), 'content/uploads')

let postsCache = null;

function myDirectiveTransformer() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (node.name === 'video') {
            const data = node.data || (node.data = {})
            // The content should be the first child paragraph's text with the URL
            // We assume the structure ::: video \n URL \n :::
            // The parser might put the URL inside a paragraph node inside the containerDirective
            
            let videoUrl = '';
            
            // Try to find the URL in the children
             if (node.children && node.children.length > 0) {
                 const firstChild = node.children[0];
                 // console.log('Video Directive Child:', JSON.stringify(firstChild, null, 2)); 

                 if (firstChild.type === 'paragraph' && firstChild.children && firstChild.children.length > 0) {
                     // Check if first child of paragraph has value
                     if(firstChild.children[0].type === 'link') {
                         videoUrl = firstChild.children[0].url;
                     } else if(firstChild.children[0].value) {
                        videoUrl = firstChild.children[0].value.trim();
                     } else if (firstChild.children[0].url) { // It might be a link node
                         videoUrl = firstChild.children[0].url;
                     }
                 } else if (firstChild.type === 'text' && firstChild.value) {
                     videoUrl = firstChild.value.trim();
                 } else if (firstChild.type === 'link') {
                     videoUrl = firstChild.url;
                 }
             }

             if (videoUrl) {
                 // YouTube Match
                 const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                 
                 // Instagram Match (Posts & Reels)
                 // Matches /p/ (post), /reel/ (reel), /tv/ (IGTV)
                 const igMatch = videoUrl.match(/(?:instagram\.com\/(?:p|reel|tv)\/)([^/?#&]+)/);

                 if (ytMatch && ytMatch[1]) {
                     const videoId = ytMatch[1];
                     data.hName = 'iframe';
                     data.hProperties = {
                         src: `https://www.youtube.com/embed/${videoId}`,
                         className: ['video-embed', 'youtube-embed'],
                         width: 560,
                         height: 315,
                         frameBorder: 0,
                         allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                         allowFullScreen: true,
                         title: 'Embedded YouTube Video'
                     };
                     node.children = [];
                 } else if (igMatch && igMatch[1]) {
                     const igId = igMatch[1];
                     data.hName = 'iframe';
                     data.hProperties = {
                         // Instagram embed endpoint
                         src: `https://www.instagram.com/p/${igId}/embed/captioned/`,
                         className: ['video-embed', 'instagram-embed'],
                         width: 400,
                         height: 480, // Reels are vertical, so height > width is better
                         frameBorder: 0,
                         scrolling: 'no',
                         allowTransparency: true,
                         title: 'Embedded Instagram Post'
                     };
                     node.children = [];
                 }
             }
        }
      }
    })
  }
}

function remarkRelativeImages(relativeFolder) {
  if (!relativeFolder) return () => {};
  return (tree) => {
    visit(tree, 'image', (node) => {
      if (node.url && !node.url.startsWith('http') && !node.url.startsWith('//') && !node.url.startsWith('/') && !node.url.startsWith('mailto:')) {
         const cleanUrl = node.url.replace(/^\.\//, '');
         // Ensure forward slashes for URL
         const folderPart = relativeFolder.split(path.sep).join('/');
         node.url = `/api/uploads/${folderPart}/${cleanUrl}`;
      }
    });
  };
}

async function markdownToHtml(markdown, relativeFolder = '') {
  const result = await remark()
    // It's good to process specific syntax first (like directives)
    // transforming relative images before other things might be safer or vice versa.
    // Usually images are plain markdown nodes initially.
    .use(remarkRelativeImages, relativeFolder) 
    .use(remarkGfm)
    .use(remarkGithub, { repository: 'nmaiti/nabendumaiti' })
    .use(remarkDirective)
    .use(myDirectiveTransformer)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: {
        dark: 'catppuccin-mocha',
        light: 'catppuccin-latte',
      },
      keepBackground: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  return result.toString()
}

export function getSortedPostsData() {
  if (postsCache) {
    return postsCache;
  }
  // Get file names under /posts
  // Note: The structure is year/month/post/index.md or similar. 
  // We need to recursively find all markdown files.
  
  const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        if (file.endsWith('.md')) {
            arrayOfFiles.push(path.join(dirPath, file))
        }
      }
    })

    return arrayOfFiles
  }

  const allFiles = getAllFiles(postsDirectory)

  const allPostsData = allFiles.map(fullPath => {
    // Remove ".md" from file name to get id
    // We need to construct a slug. 
    // Let's assume frontmatter slug or relative path.
    
    let matterResult;
    try {
        // Optimization: read only first 2KB for metadata
        const fd = fs.openSync(fullPath, 'r')
        const buf = Buffer.alloc(2048)
        const len = fs.readSync(fd, buf, 0, 2048, 0)
        fs.closeSync(fd)
        const fileHead = buf.toString('utf8', 0, len)
        matterResult = matter(fileHead)
    } catch (e) {
        // Fallback or if header is too large
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        matterResult = matter(fileContents)
    }

    // Use frontmatter slug if available, otherwise derive from path
    let slug = matterResult.data.slug
    if (!slug || typeof slug !== 'string') {
        const relativePath = path.relative(postsDirectory, fullPath)
        slug = relativePath.replace(/\/index\.md$/, '').replace(/\.md$/, '')
    }
    // Always remove leading slash if present
    slug = slug.replace(/^\/+/, '');

    return {
      ...matterResult.data,
      slug,
      filePath: fullPath,
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  });
}

export function getAllPostSlugs() {
  const posts = getSortedPostsData()
  return posts
    .filter(post => post.slug && typeof post.slug === 'string' && post.slug.length > 0)
    .map(post => {
      return {
        params: {
          slug: post.slug.split('/').filter(Boolean)
        }
      }
    })
}

export function getPostsByTag(tag) {
  const allPosts = getSortedPostsData()
  return allPosts.filter(post => {
    if (!post.tags) return false
    const slugifiedTags = post.tags.map(t => slugify(t))
    return slugifiedTags.includes(tag)
  })
}

export function getPostsByCategory(category) {
  const allPosts = getSortedPostsData()
  return allPosts.filter(post => {
    if (!post.categories) return false
    const slugifiedCategories = post.categories.map(c => slugify(c))
    return slugifiedCategories.includes(category)
  })
}

export async function getFeaturedProjects() {
  if (!fs.existsSync(featuredDirectory)) {
    return []
  }

  const folders = fs
    .readdirSync(featuredDirectory)
    .filter(name => fs.statSync(path.join(featuredDirectory, name)).isDirectory())

  const projects = await Promise.all(
    folders.map(async slug => {
      const filePath = path.join(featuredDirectory, slug, 'index.md')
      if (!fs.existsSync(filePath)) return null

      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      const description = await markdownToHtml(content)
      const resolvedCover = data.cover ? `/api/featured/${slug}/cover` : undefined

      return {
        slug,
        ...data,
        cover: resolvedCover,
        description,
      }
    })
  )

  const filtered = projects.filter(Boolean)

  return filtered.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}

export async function getJobs() {
  if (!fs.existsSync(jobsDirectory)) {
    return []
  }

  const folders = fs
    .readdirSync(jobsDirectory)
    .filter(name => fs.statSync(path.join(jobsDirectory, name)).isDirectory())

  const jobs = await Promise.all(folders.map(async slug => {
    const filePath = path.join(jobsDirectory, slug, 'index.md')
    if (!fs.existsSync(filePath)) return null

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const contentHtml = await markdownToHtml(content)
    return {
      slug,
      content: contentHtml,
      ...data,
    }
  }))

  const filtered = jobs.filter(Boolean)

  return filtered.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}

export async function getProjects() {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const files = fs
    .readdirSync(projectsDirectory)
    .filter(name => name.toLowerCase().endsWith('.md'))

  const projects = await Promise.all(files.map(async file => {
    const filePath = path.join(projectsDirectory, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const description = await markdownToHtml(content)
    const slug = file.replace(/\.md$/, '')

    let cover
    if (data.cover) {
      const normalized = data.cover.replace(/^\.\//, '')
      // Allow project covers to reference uploads or project folder-relative paths
      if (normalized.startsWith('uploads/')) {
        cover = `/api/uploads/${normalized.replace(/^uploads\//, '')}`
      } else {
        cover = `/api/projects/${slug}/cover`
      }
    }

    return {
      slug,
      ...data,
      cover,
      description,
    }
  }))

  return projects.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}

export function readUpload(pathParts = []) {
  const tryRead = baseDir => {
    const targetPath = path.join(baseDir, ...pathParts)
    if (!targetPath.startsWith(baseDir)) {
      return null
    }
    if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) {
      return null
    }
    const buffer = fs.readFileSync(targetPath)
    return { buffer, ext: path.extname(targetPath) }
  }

  // First, look under the canonical uploads directory.
  let result = tryRead(uploadsDirectory)
  // If not found, fall back to the posts directory to support images stored
  // alongside markdown (e.g., content/posts/YYYY/MM/slug/*.png).
  if (!result) {
    result = tryRead(postsDirectory)
  }

  return result
}

export async function getPostData(slugArray) {
  if (!Array.isArray(slugArray) || slugArray.length === 0 || slugArray.some(s => typeof s !== 'string')) {
    console.warn('[getPostData] Invalid slugArray:', slugArray);
    return null;
  }
  const slugPath = slugArray.filter(Boolean).join('/');
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(slugPath)) {
    return null;
  }
  let fullPath = path.join(postsDirectory, `${slugPath}/index.md`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${slugPath}.md`);
  }
  if (!fs.existsSync(fullPath)) {
    const allFiles = getSortedPostsData();
    const post = allFiles.find(p => p.slug === slugPath);
    if (!post) {
      console.warn('[getPostData] No post for slug:', slugPath, 'Available slugs:', allFiles.map(f => f.slug));
      return null;
    }
    fullPath = post.filePath || fullPath;
    if (!fullPath || !fs.existsSync(fullPath)) {
      console.warn('[getPostData] Resolved file missing for slug:', slugPath, 'filePath:', fullPath);
      return null;
    }
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const relativeFolder = path.relative(postsDirectory, path.dirname(fullPath));
  const contentHtml = await markdownToHtml(matterResult.content, relativeFolder);
  const result = {
    slug: slugPath,
    contentHtml,
    ...matterResult.data
  };
  return result;
}
