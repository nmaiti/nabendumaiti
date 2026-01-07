import { getPostsByCategory, getSortedPostsData } from '@/lib/api'
import { computeTaxonomy, normalizePostsForDisplay } from '@/lib/taxonomy'
import { Posts, SidebarLayout } from '@/components/blog'
import { AppPageContainer, AppPageHeader } from '@/components/common'
import { notFound } from 'next/navigation'
import { slugify } from '@/utils/helpers'

export async function generateStaticParams() {
  const allPosts = getSortedPostsData()
  const { categories } = computeTaxonomy(allPosts)
  return categories.map((cat) => ({
    slug: slugify(cat.name),
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const posts = getPostsByCategory(slug)
  if (posts.length === 0) return {}
  
  const allPosts = getSortedPostsData()
  const { categories } = computeTaxonomy(allPosts)
  const catObj = categories.find(c => slugify(c.name) === slug)
  const catName = catObj ? catObj.name : slug
  
  return {
    title: `${catName} - Blog Categories`,
    description: `${posts.length} posts categorized as ${catName}`,
  }
}

export default function CategoryPage({ params }) {
  const { slug } = params
  const posts = getPostsByCategory(slug)

  if (posts.length === 0) {
    notFound()
  }

  const allPosts = getSortedPostsData()
  const { categories, tags } = computeTaxonomy(allPosts)
  const normalizedPosts = normalizePostsForDisplay(posts)

  // Find original category name
  const catObj = categories.find(c => slugify(c.name) === slug)
  const catName = catObj ? catObj.name : slug
  const totalCount = posts.length

  return (
    <AppPageContainer>
      <SidebarLayout categories={categories} tags={tags} currentCategory={slug}>
        <AppPageHeader $align="left">
          <div
            className="subtitle"
            style={{ marginBottom: '5px' }}
          >
            <span className="highlight">{totalCount}</span>
            {totalCount === 1 ? ' post categorized as:' : ' posts categorized as:'}
          </div>
          <h1 style={{ textTransform: 'uppercase', fontSize: '2em' }}>
            {catName}
          </h1>
        </AppPageHeader>
        <Posts data={normalizedPosts} showYears />
      </SidebarLayout>
    </AppPageContainer>
  )
}

