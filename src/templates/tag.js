import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet';


import { Posts } from '../components/Posts'
import { PHero } from '../components/Hero'
import { SidebarLayout } from '../components/SidebarLayout'
import { getSimplifiedPosts } from '../utils/helpers'

import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostContainer = styled.main`
  max-width: 1700px;
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
    color: var(--light-slate);
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }
`;


export default function TagTemplate({ data, pageContext }) {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post tagged:' : ' posts tagged:'

  return (
    <div>
      <Layout>
      <Helmet title={`Posts tagged: #${tag} `} />
        <StyledPostContainer>

          <SidebarLayout>
            <PHero highlight={totalCount} subTitle={message} title={tag} />
            <Posts data={simplifiedPosts} showYears />
          </SidebarLayout>
        </StyledPostContainer>
      </Layout>

    </div>
  )
}

TagTemplate.Layout = Layout

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            id
            date
            title
            tags
            slug
            categories
          }
        }
      }
    }
  }
`
