import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledTagsContainer = styled.main`
  max-width: 1000px;

  h1 {
    margin-bottom: 50px;
  }
  ul {
    color: ${props => props.theme.lightestslate};

    li {
      font-size: var(--fz-xxl);

      a {
        color: ${props => props.theme.lightestslate};

        .count {
          color: ${props => props.theme.slate};
          font-family: var(--font-mono);
          font-size: var(--fz-md);
        }
      }
    }
  }
`;

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
  location,
}) => (
  <Layout location={location}>
    <Helmet title="Tags" />

    <StyledTagsContainer>
      <span className="breadcrumb">
        <span className="arrow">&larr;</span>
        <Link to="/blogs">All memories</Link>
      </span>

      <h1>Tags</h1>
      <ul className="fancy-list">
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/blogs/tags/${kebabCase(tag.fieldValue)}/`} className="inline-link">
              {tag.fieldValue} <span className="count">({tag.totalCount})</span>
            </Link>
          </li>
        ))}
      </ul>
    </StyledTagsContainer>
  </Layout>
);

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
  location: PropTypes.object,
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000, filter: { frontmatter: { status: { ne: "draft" } } }) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
