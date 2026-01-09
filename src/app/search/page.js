'use client'

import React, { useEffect, useState, Suspense } from 'react';
import { Social, Email } from '@/components/layout';
import { useSearchParams } from 'next/navigation';
import { Posts, SidebarLayout } from '@/components/blog';
import { AppPageContainer, AppPageHeader } from '@/components/common';

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
          <AppPageContainer>
              <div style={{ textAlign: 'center' }}>Loading...</div>
          </AppPageContainer>
      )
  }

  return (
    <>
      <AppPageContainer>
        <SidebarLayout categories={categories} tags={tags} currentSearchQuery={query}>
          <AppPageHeader $align="left">
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
                <h1 style={{ fontSize: '2em' }}>
                  <span style={{ textTransform: 'none' }}>&ldquo;{query}&rdquo;</span>
                </h1>
              </>
            ) : (
               <h1>Search</h1>
            )}
          </AppPageHeader>

          {filteredPosts.length > 0 && <Posts data={filteredPosts} />}
          
        </SidebarLayout>
      </AppPageContainer>
      <Social isHome={false} />
      <Email isHome={false} />
    </>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <SearchContent />
        </Suspense>
    )
}
