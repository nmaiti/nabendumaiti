/**
 * Reusable page layout styles - Can be used in both server and client components
 * Use inline styles for server components or styled-components for client components
 */

// Inline style objects for server components
export const pageContainerStyle = {
  maxWidth: '1600px',
  margin: '0 auto',
  padding: '200px 150px',
};

export const pageHeaderStyle = (align = 'center') => ({
  marginBottom: '50px',
  textAlign: align,
});

// For client components, export styled components
export { ClientPageContainer, PageHeader as StyledPageHeader } from './PageLayoutClient';

