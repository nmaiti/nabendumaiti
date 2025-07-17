import React from 'react';
import styled from 'styled-components';

const StyledHighlightContainer = styled.span`
  color: ${props => props.theme.higlight};
`;

export const PHero = ({ highlight, subTitle, title, children, index }) => {
  return (
    <header className={`hero ${index ? 'index' : ''}`}>
      {subTitle && (
        <div className="sub-title">
          {highlight && <StyledHighlightContainer>{highlight}</StyledHighlightContainer>}
          {subTitle}
        </div>
      )}
      {title && <h1>{title}</h1>}
      {children && children}
    </header>
  );
};
