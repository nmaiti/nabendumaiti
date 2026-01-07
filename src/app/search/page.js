'use client'

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Posts, SidebarLayout } from '@/components/blog';
import { ClientPageContainer, PageHeader } from '@/components/common';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        
        // Use dynamic import for client-side taxonomy computation
        const { computeTaxonomy, normalizePostsForDisplay } = await import('@/lib/taxonomy');
        
        const normalized = normalizePostsForDisplay(data);
        const { categories, tags } = computeTaxonomy(data);

        setCategories(categories);
        setTags(tags);
        setPosts(normalized);
      } catch (e) {
        console.error("Failed to load posts", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredPosts = posts.filter(post => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    const titleMatch = post.title?.toLowerCase().includes(lowerQuery);
    const descMatch = post.description?.toLowerCase().includes(lowerQuery);
    const tagMatch = post.tags?.some(t => t.toLowerCase().includes(lowerQuery));
    // Category match?
    const catMatch = post.categories?.some(c => c.toLowerCase().includes(lowerQuery));
    
    return titleMatch || descMatch || tagMatch || catMatch;
  });

  if (loading) {
      return (
          <ClientPageContainer>
              <div style={{ textAlign: 'center' }}>Loading...</div>
          </ClientPageContainer>
      )
  }

  return (
    <ClientPageContainer>
      <SidebarLayout categories={categories} tags={tags} currentSearchQuery={query}>
        <PageHeader align="left">
          {query ? (
            <>
              <div className="subtitle">
                {filteredPosts.length > 0 ? (
                    <>
                        <span className="highlight">{filteredPosts.length}</span>
                        {filteredPosts.length === 1 ? ' result found for' : ' results found for'}
                    </>
                ) : (
                    'No results found for'
                )}
              </div>
              <h1>
                <span style={{ textTransform: 'none' }}>&ldquo;{query}&rdquo;</span>
              </h1>
            </>
          ) : (
             <h1>Search</h1>
          )}
        </PageHeader>

        {filteredPosts.length > 0 && <Posts data={filteredPosts} />}
        
      </SidebarLayout>
    </ClientPageContainer>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <SearchContent />
        </Suspense>
    )
}
