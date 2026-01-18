import { getPostsByCategory, getSortedPostsData } from '@/lib/api';
import { computeTaxonomy, normalizePostsForDisplay } from '@/lib/taxonomy';
import { Social, Email } from '@/components/layout';
import { slugify } from '@/utils/helpers';
import CategoryClient from './CategoryClient';

export default async function CategoryPage({ params }) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const posts = getPostsByCategory(slug);
  if (posts.length === 0) {
    return null;
  }
  const allPosts = getSortedPostsData();
  const { categories, tags } = computeTaxonomy(allPosts);
  const normalizedPosts = normalizePostsForDisplay(posts);
  const catObj = categories.find(c => slugify(c.name) === slug);
  const catName = catObj ? catObj.name : slug;
  return (
    <>
      <CategoryClient
        categories={categories}
        tags={tags}
        slug={slug}
        catName={catName}
        normalizedPosts={normalizedPosts}
      />
      <Social isHome={false} />
      <Email isHome={false} />
    </>
  );
}

