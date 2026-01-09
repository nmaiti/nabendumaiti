import { getPostsByTag, getSortedPostsData } from '@/lib/api'
import { computeTaxonomy, normalizePostsForDisplay } from '@/lib/taxonomy'
import { Posts, SidebarLayout } from '@/components/blog'
import { Social, Email } from '@/components/layout';
import { AppPageContainer, AppPageHeader } from '@/components/common'
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
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const posts = getPostsByTag(slug);
  if (posts.length === 0) return {};
  const allPosts = getSortedPostsData();
  const { tags } = computeTaxonomy(allPosts);
  const tagObj = tags.find(t => slugify(t.name) === slug);
  const tagName = tagObj ? tagObj.name : slug;
  return {
    title: `${tagName} - Blog Tags`,
    description: `Posts tagged with ${tagName}`,
  };
}

export default async function TagPage({ params }) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const posts = getPostsByTag(slug);
  if (posts.length === 0) {
    notFound();
  }
  const allPosts = getSortedPostsData();
  const { categories, tags } = computeTaxonomy(allPosts);
  const normalizedPosts = normalizePostsForDisplay(posts);
  // Find original tag name
  const tagObj = tags.find(t => slugify(t.name) === slug);
  const tagName = tagObj ? tagObj.name : slug;
  const totalCount = posts.length;
  return (
    <>
      <AppPageContainer>
        <SidebarLayout categories={categories} tags={tags} currentTag={slug}>
          <AppPageHeader $align="left">
            <div className="subtitle">
              <span className="highlight">{totalCount}</span>
              {totalCount === 1 ? ' post tagged as:' : ' posts tagged as:'}
            </div>
            <h1 style={{ fontSize: '2em' }}>Tag: {tagName}</h1>
          </AppPageHeader>
          <Posts data={normalizedPosts} showYears />
        </SidebarLayout>
      </AppPageContainer>
      <Social isHome={false} />
      <Email isHome={false} />
    </>
  );
}
