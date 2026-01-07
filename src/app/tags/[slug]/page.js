import { getPostsByTag, getSortedPostsData } from '@/lib/api'
import { computeTaxonomy, normalizePostsForDisplay } from '@/lib/taxonomy'
import { Posts, SidebarLayout } from '@/components/blog'
import { pageContainerStyle, pageHeaderStyle } from '@/components/common'
import { notFound } from 'next/navigation'
import { slugify } from '@/utils/helpers'

export async function generateStaticParams() {
  const allPosts = getSortedPostsData()
  const { tags } = computeTaxonomy(allPosts)
  return tags.map((tag) => ({
    slug: slugify(tag.name),
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const posts = getPostsByTag(slug)
  if (posts.length === 0) return {}
  
  const allPosts = getSortedPostsData()
  const { tags } = computeTaxonomy(allPosts)
  const tagObj = tags.find(t => slugify(t.name) === slug)
  const tagName = tagObj ? tagObj.name : slug
  
  return {
    title: `${tagName} - Blog Tags`,
    description: `Posts tagged with ${tagName}`,
  }
}

export default function TagPage({ params }) {
  const { slug } = params
  const posts = getPostsByTag(slug)

  if (posts.length === 0) {
    notFound()
  }

  const allPosts = getSortedPostsData()
  const { categories, tags } = computeTaxonomy(allPosts)
  const normalizedPosts = normalizePostsForDisplay(posts)

  // Find original tag name
  const tagObj = tags.find(t => slugify(t.name) === slug)
  const tagName = tagObj ? tagObj.name : slug

  return (
    <main style={pageContainerStyle}>
       <SidebarLayout categories={categories} tags={tags}>
        <header style={pageHeaderStyle()}>
          <h1>Tag: {tagName}</h1>
        </header>
        <Posts data={normalizedPosts} showYears />
      </SidebarLayout>
    </main>
  )
}
