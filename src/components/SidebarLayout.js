
import React from 'react';
import styled from 'styled-components';
import { BlogSidebar } from './BlogSidebar';

const SidebarSection = styled.section`
  max-width: var(--content-width);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
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
`;

const SidebarContent = styled.div`
  min-width: 0;
`;

export const SidebarLayout = ({ children }) => (
  <SidebarSection>
    <SidebarGrid>
      <ArticleContent>{children}</ArticleContent>
      <SidebarContent>
        <BlogSidebar />
      </SidebarContent>
    </SidebarGrid>
  </SidebarSection>
);
