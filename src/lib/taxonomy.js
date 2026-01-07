/**
 * Taxonomy utilities for computing categories and tags counts
 */

export function computeTaxonomy(posts) {
  const categoryCounts = {};
  const tagCounts = {};

  posts.forEach(post => {
    (post.categories || []).forEach(cat => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    (post.tags || []).forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const categories = Object.entries(categoryCounts)
    .filter(([name]) => name && name !== 'Highlight')
    .map(([name, totalCount]) => ({ name, totalCount }))
    .sort((a, b) => b.totalCount - a.totalCount || a.name.localeCompare(b.name));

  const tags = Object.entries(tagCounts)
    .filter(([name]) => !!name)
    .map(([name, totalCount]) => ({ name, totalCount }))
    .sort((a, b) => b.totalCount - a.totalCount || a.name.localeCompare(b.name));

  return { categories, tags };
}

export function normalizePostsForDisplay(posts) {
  return posts.map(post => ({
    id: post.slug,
    title: post.title,
    slug: `/posts/${post.slug}`,
    date: post.date,
    description: post.description,
    tags: post.tags || [],
    categories: post.categories || [],
  }));
}
