'use client'
import React, { useEffect, useState } from 'react';
import { Posts, SidebarLayout } from '@/components/blog';
import { ClientPageContainer } from '@/components/common';

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      
      // Use dynamic import for client-side taxonomy computation
      const { computeTaxonomy, normalizePostsForDisplay } = await import('@/lib/taxonomy');
      
      const normalized = normalizePostsForDisplay(data);
      const { categories, tags } = computeTaxonomy(data);

      setCategories(categories);
      setTags(tags);
      setPosts(normalized);
    };
    load();
  }, []);

  return (
    <ClientPageContainer>
      <SidebarLayout categories={categories} tags={tags}>
        <header className="hero">
          <h1 style={{ fontSize: '2em' }}>Writing</h1>
        </header>
        <Posts data={posts} showYears />
      </SidebarLayout>
    </ClientPageContainer>
  );
}
