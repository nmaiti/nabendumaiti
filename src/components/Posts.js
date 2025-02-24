import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { getFormattedDate } from '../utils/helpers'

const PostLink = styled(Link)`
  display: flex;
  gap: 1rem;
  padding: 0.4rem 0;
  background: transparent;
  text-decoration: none;
  border-bottom: 1px solid var(--darkslate);

  &:last-of-type {
    border: none;
  }

  &:hover,
  &:hover h3 {
    color: var(--higlight);
  }

  &:hover h3 {
    text-decoration-line: underline;
    text-decoration-thickness: 2px;
  }
`;

const PostTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: var(--font-color-heading);
  font-weight: 500;
  font-family: var(--font-family-base);
  line-height: 1.3;

  @media screen and (min-width: 700px) {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const PostTime = styled.time`
  display: none;
  font-family: var(--font-family-monospace);
  color: var(--higlight);
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  margin-left: auto;

  @media screen and (min-width: 700px) {
    display: block;
  }
`;

export const Post = ({ node, prefix, newspaper }) => {
  let formattedDate = new Date(node.date)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthName = months[formattedDate.getMonth()]
  formattedDate = monthName + ' ' + formattedDate.getDate()

  return (
    <PostLink to={node.slug} key={node.id}>
      <PostTitle>{node.title}</PostTitle>
      <PostTime>{formattedDate}</PostTime>
    </PostLink>
  )
}
