import path from 'path'
import { handleCoverImage } from '@/lib/imageHandler'

const featuredDirectory = path.join(process.cwd(), 'content/featured')

export async function GET(_req, context) {
  const params = await context.params;
  const slug = params.slug;
  return handleCoverImage(featuredDirectory, slug, true);
}
