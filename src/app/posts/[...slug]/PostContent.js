'use client'
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Giscus from '@giscus/react';
import { PostSidebar } from '@/components/blog';
import mermaid from 'mermaid';
import { useTheme } from '@/components/common';

const StyledPostContainer = styled.main`
  max-width: 1700px;
  margin: 0 auto;
  padding: 0 20px;
`;
const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`;
const StyledPostContent = styled.div`
  margin-bottom: 100px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: ${props => props.theme.lightslate};
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: ${props => props.theme.lightestnavy};
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  img[alt=""],
  img:not([alt]) {
    filter: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 2em 0;
    font-size: var(--fz-md);
  }

  th, td {
    padding: 10px;
    border: 1px solid ${props => props.theme.lightestnavy};
  }

  th {
    text-align: left;
    background-color: ${props => props.theme.lightnavy};
    font-weight: 600;
    color: ${props => props.theme.lightestslate};
  }

  iframe.youtube-embed {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border: 0;
    margin: 2em 0;
    display: block;
  }
  
  iframe.instagram-embed {
    width: 100%;
    max-width: 450px;
    height: 580px; /* Give it enough height for caption */
    border: 0;
    margin: 2em auto;
    display: block;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  /* Fallback for other iframes */
  iframe:not(.video-embed) {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border: 0;
    margin: 2em 0;
    display: block;
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  margin: 150px;
  @media (max-width: 1060px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleContent = styled.div`
  max-width: 100%;
  min-width: 0;
`;

export default function PostContent({ post }) {
  const { tags, categories, title, date, thumbnail } = post;
  const { isDark } = useTheme();

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: isDark() ? 'neutral' : 'default' });
    
    // Select both .language-mermaid (standard remark) and data-language="mermaid" (rehype-pretty-code)
    const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid, code[data-language="mermaid"]');
    
    if (mermaidBlocks.length > 0) {
        mermaidBlocks.forEach((block, index) => {
            const content = block.textContent;
            // Try to find the container to replace (figure or pre)
            const pre = block.closest('pre');
            const figure = block.closest('figure[data-rehype-pretty-code-figure]');
            const target = figure || pre;
            
            if (!target) return;

            const div = document.createElement('div');
            div.className = 'mermaid';
            div.textContent = content;
            div.id = `mermaid-${index}`;
            target.replaceWith(div);
        });

        mermaid.run({
            querySelector: '.mermaid'
        });
    }
  }, [post.contentHtml, isDark]);

  return (
    <StyledPostContainer>
      <PostGrid>
        <ArticleContent>
          <div className="post-header medium width">
            <h1>{title}</h1>
          </div>
          <StyledPostContent>
            <div
              key={isDark() ? 'dark' : 'light'}
              id={post.slug}
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
            <div style={{ marginTop: '3rem' }}>
              <Giscus
                id="comments"
                repo="nmaiti/nabendumaiti"
                repoId="R_kgDOJLdIMg"
                category="General"
                categoryId="DIC_kwDOJLdIMs4CtFYL"
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme={isDark() ? 'dark' : 'light'}
                lang="en"
                loading="lazy"
              />
            </div>
          </StyledPostContent>
        </ArticleContent>
        <PostSidebar date={date} tags={tags} categories={categories} thumbnail={thumbnail} />
      </PostGrid>
    </StyledPostContainer>
  );
}
