import path from 'path'
import { handleCoverImage } from '@/lib/imageHandler'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export async function GET(_req, { params }) {
  const { slug } = params
  return handleCoverImage(projectsDirectory, slug, false)
}
