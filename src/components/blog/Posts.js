'use client'
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Post } from './Post';

const PostsContainer = styled.div`
  &.newspaper {
    display: grid;
    column-gap: 1rem;
    @media screen and (min-width: 700px) {
      display: grid;
      /* grid-template-columns: 1fr 1fr; */
      column-gap: 1rem;
    }
  }
`;

const YearSection = styled.section`
  margin: 1rem 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 5px;
}
`;

export const Posts = ({ data = [], showYears, query, prefix, hideDate, yearOnly, ...props }) => {
  const postsByYear = useMemo(() => {
    const collection = {};
    data.forEach(post => {
      const formattedDate = new Date(post.date);
      const year = formattedDate.getFullYear();
      collection[year] = [...(collection[year] || []), post];
    });
    return collection;
  }, [data]);
  const years = useMemo(() => Object.keys(postsByYear).reverse(), [postsByYear]);

  if (showYears) {
    return years.map(year => (
      <YearSection key={year}>
        <h2>{year}</h2>
        <PostsContainer>
          {postsByYear[year].map(node => (
            <Post key={node.id} node={node} query={query} prefix={prefix} />
          ))}
        </PostsContainer>
      </YearSection>
    ));
  } else {
    return (
      <PostsContainer className={props.newspaper ? 'newspaper' : ''}>
        {data.map(node => (
          <Post
            key={node.id}
            node={node}
            query={query}
            prefix={prefix}
            hideDate={hideDate}
            yearOnly={yearOnly}
            {...props}
          />
        ))}
      </PostsContainer>
    );
  }
};
