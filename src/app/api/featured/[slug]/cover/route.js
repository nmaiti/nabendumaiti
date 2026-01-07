import path from 'path'
import { handleCoverImage } from '@/lib/imageHandler'

const featuredDirectory = path.join(process.cwd(), 'content/featured')

export async function GET(_req, { params }) {
  const { slug } = params
  return handleCoverImage(featuredDirectory, slug, true)
}
