"use client";
import React, { useState, useMemo } from "react";
import { Posts, SidebarLayout } from '@/components/blog';
import { AppPageContainer, AppPageHeader } from '@/components/common';

export default function TagClient({
  categories,
  tags,
  slug,
  tagName,
  normalizedPosts,
}) {
  const [search, setSearch] = useState("");
  const filteredPosts = useMemo(() => {
    if (!search) return normalizedPosts;
    const lowerQuery = search.toLowerCase();
    return normalizedPosts.filter(post => {
      const titleMatch = post.title?.toLowerCase().includes(lowerQuery);
      const descMatch = post.description?.toLowerCase().includes(lowerQuery);
      const tagMatch = post.tags?.some(t => t.toLowerCase().includes(lowerQuery));
      const catMatch = post.categories?.some(c => c.toLowerCase().includes(lowerQuery));
      return titleMatch || descMatch || tagMatch || catMatch;
    });
  }, [search, normalizedPosts]);
  const totalCount = filteredPosts.length;
  return (
    <>
      <AppPageContainer>
        <SidebarLayout
          categories={categories}
          tags={tags}
          currentTag={slug}
          currentSearchQuery={search}
          onSearchChange={setSearch}
        >
          <AppPageHeader $align="left">
            <div className="subtitle">
              <span className="highlight">{totalCount}</span>
              {totalCount === 1 ? " post tagged as:" : " posts tagged as:"}
            </div>
            <h1 style={{ fontSize: "2em" }}>Tag: {tagName}</h1>
          </AppPageHeader>
          <Posts data={filteredPosts} showYears />
        </SidebarLayout>
      </AppPageContainer>
    </>
  );
}
