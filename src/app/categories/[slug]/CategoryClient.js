"use client";
import React, { useState, useMemo } from "react";
import { Posts, SidebarLayout } from '@/components/blog';
import { AppPageContainer, AppPageHeader } from '@/components/common';

export default function CategoryClient({
  categories,
  tags,
  slug,
  catName,
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
          currentCategory={slug}
          currentSearchQuery={search}
          onSearchChange={setSearch}
        >
          <AppPageHeader $align="left">
            <div className="subtitle" style={{ marginBottom: "5px" }}>
              <span className="highlight">{totalCount}</span>
              {totalCount === 1 ? " post categorized as:" : " posts categorized as:"}
            </div>
            <h1 style={{ textTransform: "uppercase", fontSize: "2em" }}>{catName}</h1>
          </AppPageHeader>
          <Posts data={filteredPosts} showYears />
        </SidebarLayout>
      </AppPageContainer>
    </>
  );
}
