import { notFound, redirect } from 'next/navigation'
import { getPostData, getAllPostSlugs } from '@/lib/api'
import PostContent from './PostContent'

export async function generateStaticParams() {
  const paths = getAllPostSlugs()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export async function generateMetadata({ params }) {
  const post = await getPostData(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function Post({ params }) {
  let slugPath = Array.isArray(params.slug) ? params.slug.join('/') : ''
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(slugPath)) {
    // Handle relative paths that resolve to /posts/uploads/...
    if (slugPath.startsWith('uploads/')) {
      slugPath = slugPath.replace(/^uploads\//, '')
    }
    redirect(`/api/uploads/${slugPath}`)
  }

  const post = await getPostData(params.slug)
  if (!post) {
    notFound()
  }
  return <PostContent post={post} />
}
