import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { IconPost } from '@components/icons';

import { Posts } from '../../components/Posts';
import { SidebarLayout } from '../../components/SidebarLayout';
import React, { useMemo } from 'react';

import { getSimplifiedPosts } from '../../utils/helpers';

const StyledMainContainer = styled.main`
  & > header {
    margin-bottom: 100px;
    text-align: center;

    a {
      &:hover,
      &:focus {
        cursor:
          url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>⚡</text></svg>")
            20 0,
          auto;
      }
    }
  }

  footer {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-top: 20px;
  }
`;

//   <Posts data={simplifiedPosts} showYears />
const BlogPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts]);
  const title = 'Writing';
  const description = 'Notes & tutorials';

  return (
    <div>
      <Layout location={location}>
        <StyledMainContainer>
          <SidebarLayout>
            <header className="hero">
              <h1>{title}</h1>
            </header>
            <Posts data={simplifiedPosts} showYears />
          </SidebarLayout>
        </StyledMainContainer>
      </Layout>
    </div>
  );
};

BlogPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default BlogPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/posts/" }
        frontmatter: { status: { ne: "draft" } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            tags
            draft
            categories
          }
          html
        }
      }
    }
  }
`;

//formattedDate: date(formatString: "MMMM DD, YYYY [at] hh:mm A [GMT]Z")
