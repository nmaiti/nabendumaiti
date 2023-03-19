import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';


import { PostSidebar } from '../components/PostSidebar'
//import { Comments } from '../components/Comments'
//import config from '../utils/config'


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

export default function PostTemplate({ data, location }) {
  const post = data.markdownRemark
  const { tags, categories, title, date, thumbnail, comments_off } = post.frontmatter

  return (
    <div>
      <Layout location={location}>

        <Helmet title={`${post.frontmatter.title} `} />
        <StyledPostContainer>
          <div className="grid">
            <div className="article-content">
              <div className="post-header medium width">
                <h1>{title}</h1>
              </div>
              <div className="StyledPostContent">
                <div
                  id={post.slug}
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </div>
            </div>

            <PostSidebar
              date={date}
              tags={tags}
              categories={categories}
              thumbnail={thumbnail}
            />
          </div>

        </StyledPostContainer>
      </Layout>
    </div>
  )
}

PostTemplate.Layout = Layout

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        id
        title
        description
        date
        slug
        categories
        tags
      }
    }
  }
`
