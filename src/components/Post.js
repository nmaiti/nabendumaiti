import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { getFormattedDate } from '../utils/helpers';


const PostLink = styled.a`
  display: flex;
  gap: 1rem;
  padding: 0.4rem 0;
  background: transparent;
  text-decoration: none;
  border-bottom: 1px solid ${props => props.theme.darkslate};

  &:last-of-type {
    border: none;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    color: var(--font-color-heading);
    font-weight: 500;
    font-family: var(--font-family-base);
    transition: color 0.2s;
  }

  time {
    display: none;
    font-family: var(--font-family-monospace);
    color: ${props => props.theme.darkslate};
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    margin-left: auto;
    transition: color 0.2s;
  }

  &:hover,
  &:hover h3,
  &:hover time {
    color: ${props => props.theme.highlight};
    text-decoration-line: underline;
    text-decoration-thickness: 2px;
  }

  @media screen and (min-width: 700px) {
    time {
      display: block;
    }
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
    }
  }
`;

export const Post = ({ node, prefix, newspaper }) => {
  let formattedDate = new Date(node.date);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthName = months[formattedDate.getMonth()];
  formattedDate = monthName + ' ' + formattedDate.getDate();

  return (
    <PostLink as={Link} to={node.slug} key={node.id}>
      <h3>{node.title}</h3>
      <time>{formattedDate}</time>
    </PostLink>
  );
};
