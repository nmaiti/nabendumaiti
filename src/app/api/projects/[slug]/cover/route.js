import path from 'path'
import { handleCoverImage } from '@/lib/imageHandler'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export async function GET(_req, { params }) {
  const  awaitedParams  = await params
  const slug = awaitedParams.slug;
  return handleCoverImage(projectsDirectory, slug, false)
}
