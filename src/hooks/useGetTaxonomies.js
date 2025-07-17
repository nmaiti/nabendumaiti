import { useStaticQuery, graphql } from 'gatsby';

export const useGetTaxonomies = () => {
  const data = useStaticQuery(graphql`
    query TaxonomyQuery {
      tags: allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          name: fieldValue
          totalCount
        }
      }
      categories: allMarkdownRemark {
        group(field: { frontmatter: { categories: SELECT } }) {
          name: fieldValue
          totalCount
        }
      }
    }
  `);

  return data;
};
