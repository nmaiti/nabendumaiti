'use client'

import React from 'react';
import styled from 'styled-components';
import { BlogSidebar } from './BlogSidebar';
import SearchWidget from './SearchWidget';
import SidebarContent from '../common/SidebarContent';

const SidebarSection = styled.section`
  max-width: var(--content-width);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const MobileSearchWrapper = styled.div`
  display: none;
  margin-bottom: 2rem;
  
  @media (max-width: 1060px) {
    display: block;
  }
`;

const SidebarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  @media (max-width: 1060px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleContent = styled.div`
  max-width: 100%;
  min-width: 0;
  
  h1 span.highlight {
      color: ${props => props.theme.highlight};
  }
`;



export const SidebarLayout = ({ children, categories, tags, currentCategory, currentTag, currentSearchQuery, onSearchChange }) => (
  <SidebarSection>
    <MobileSearchWrapper>
      <SearchWidget value={currentSearchQuery} onChange={onSearchChange} />
    </MobileSearchWrapper>
    <SidebarGrid>
      <ArticleContent>{children}</ArticleContent>
      <SidebarContent>
        <BlogSidebar
          categories={categories}
          tags={tags}
          currentCategory={currentCategory}
          currentTag={currentTag}
          currentSearchQuery={currentSearchQuery}
          onSearchChange={onSearchChange}
        />
      </SidebarContent>
    </SidebarGrid>
  </SidebarSection>
);
