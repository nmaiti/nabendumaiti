'use client'
import styled from 'styled-components';

/**
 * Responsive page container with adaptive padding
 * Works for both client and server components (via children)
 */
export const ClientPageContainer = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: 150px 120px;
  min-height: calc(100vh - 200px);

  /* Tablet */
  @media (max-width: 1080px) {
    padding: 140px 100px;
  }

  /* Mobile */
  @media (max-width: 768px) {
    padding: 120px 90px;
  }

  /* Small mobile */
  @media (max-width: 480px) {
    padding: 100px 35px;
  }

  & > header {
    margin-bottom: 50px;
    text-align: center;

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }

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
 * Responsive page header with adaptive font sizes
 */
export const PageHeader = styled.header`
  margin-bottom: 50px;
  text-align: ${props => props.$align || 'center'};

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  .subtitle {
    color: var(--font-color-muted);
    font-size: var(--fz-md);
    font-family: var(--font-mono);
    margin-bottom: 5px;

    .highlight {
      color: ${({ theme }) => theme.higlight};
    }

    @media (max-width: 768px) {
      font-size: var(--fz-sm);
    }
  }

  h1 {
    margin-bottom: 10px;
    font-size: clamp(30px, 4vw, 60px);
    
    @media (max-width: 768px) {
      font-size: clamp(20px, 6vw, 40px);
    }
  }
`;

/**
 * Server-safe wrapper component
 * Use this in server components to get responsive styled layout
 */
export const ResponsiveContainer = ({ children, align = 'center' }) => {
  return <ClientPageContainer>{children}</ClientPageContainer>;
};
