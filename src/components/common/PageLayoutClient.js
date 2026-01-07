'use client'
import styled from 'styled-components';

/**
 * Client-side page container with padding-top/bottom only
 */
export const ClientPageContainer = styled.main`
  padding-top: 150px;
  padding-bottom: 150px;

  & > header {
    margin-bottom: 50px;
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

/**
 * Page header with consistent styling
 */
export const PageHeader = styled.header`
  margin-bottom: 50px;
  text-align: ${props => props.align || 'center'};

  .subtitle {
    color: var(--font-color-muted);
    font-size: var(--fz-md);
    font-family: var(--font-mono);
    margin-bottom: 5px;

    .highlight {
      color: ${({ theme }) => theme.higlight};
    }
  }

  h1 {
    margin-bottom: 10px;
  }
`;
