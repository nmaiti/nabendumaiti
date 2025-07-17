import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { slugify } from '../utils/helpers';
import { useGetTaxonomies } from '../hooks/useGetTaxonomies';

const Sidebar = styled.aside`
  /* .post-sidebar */
  h2 {
    color: var(--font-color-heading);
    font-size: 1.4rem;
    border: none;
    margin: 0 0 1rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0;
  }
  p,
  ul {
    font-size: 1.2rem;
  }
  p:last-of-type {
    margin-bottom: 0;
  }
  .tags {
    gap: 0.3rem;
    display: flex;
    flex-wrap: wrap;
  }
  a {
    text-decoration-thickness: 2px;
  }
  a:hover {
    text-decoration: none;
  }
`;

export const SidebarCard = styled.div`
  /* .*/
  border: 1px solid ${props => props.theme.higlighttint};
  background: var(--card-background-color);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin: 1rem 0;
`;


const List = styled.div`
  /* .list */
  a {
    background-color: transparent;
    color: var(--font-color-base);
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0.1rem 0.5rem;
    margin: 0 -0.3rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  a:hover {
    background: ${props => props.theme.lightestnavy};
    color: ${props => props.theme.higlight};
    text-decoration: none;
  }
`;

export const Tag = styled(Link)`
  /* a.tag */
  font-size: 1.2rem;
  font-weight: 400;
  padding: 0.2rem 0.4rem;
  border: 1px solid ${props => props.theme.lightestnavy};
  border-radius: var(--border-radius);
  color: var(--font-color-base);
  background: ${props => props.theme.lightestnavy} !important;
  text-decoration: none;
  &.active {
    color: ${props => props.theme.higlight};
    border-color: ${props => props.theme.higlight};
    font-weight: 500;
  }
  &:hover {
    color: ${props => props.theme.higlight};
    border: 1px solid ${props => props.theme.higlight};
    text-decoration: none;
  }
`;

export const Category = styled(Link)`
  /* a.category */
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  &.active {
    color: ${props => props.theme.higlight};
  }
  &:hover .count,
  &.active .count {
    color: ${props => props.theme.higlight};
  }
`;

const Name = styled.div`
  /* .category .name */
  font-size: 1.3rem;
  font-weight: 400;
`;

const Count = styled.div`
  /* .category .count */
  font-weight: 400;
  font-size: 1.3rem;
  color: var(--font-color-muted);
  font-family: var(--font-family-monospace);
`;

export const BlogSidebar = () => {
  const data = useGetTaxonomies();
  const categories = data.categories.group;
  const tags = data.tags.group;

  return (
    <Sidebar>
      <SidebarCard>
        <h2>Categories</h2>
        <List>
          {categories
            .filter(category => category.name !== 'Highlight')
            .map(category => (
              <Category
                key={category.name}
                to={`/categories/${slugify(category.name)}`}
                activeClassName="active"
              >
                <Name className="name">{category.name}</Name>
                <Count className="count">{category.totalCount}</Count>
              </Category>
            ))}
        </List>
      </SidebarCard>
      <SidebarCard>
        <h2>Tags</h2>
        <div className="tags">
          {tags.map(tag => (
            <Tag
              key={tag.name}
              to={`/tags/${slugify(tag.name)}`}
              activeClassName="active"
              className="tag"
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </SidebarCard>
    </Sidebar>
  );
};
