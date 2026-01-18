import { getPostsByTag, getSortedPostsData } from '@/lib/api';
import { computeTaxonomy, normalizePostsForDisplay } from '@/lib/taxonomy';
import { Social, Email } from '@/components/layout';
import { slugify } from '@/utils/helpers';
import TagClient from './TagClient';

export default async function TagPage({ params }) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const posts = getPostsByTag(slug);
  if (posts.length === 0) {
    return null;
  }
  const allPosts = getSortedPostsData();
  const { categories, tags } = computeTaxonomy(allPosts);
  const normalizedPosts = normalizePostsForDisplay(posts);
  const tagObj = tags.find(t => slugify(t.name) === slug);
  const tagName = tagObj ? tagObj.name : slug;
  return (
    <>
      <TagClient
        categories={categories}
        tags={tags}
        slug={slug}
        tagName={tagName}
        normalizedPosts={normalizedPosts}
      />
      <Social isHome={false} />
      <Email isHome={false} />
    </>
  );
}
