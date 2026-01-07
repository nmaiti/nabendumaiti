import React, { useState, useEffect } from 'react';


// Common styled container for sidebar content
import styled from 'styled-components';

const SidebarContent = React.memo(styled.div`
  min-width: 0;
`);

// Delays rendering children for animation using local state
export const SidebarContentWithDelay = React.memo(function SidebarContentWithDelay({ children, delay = 300 }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return <SidebarContent>{isMounted ? children : null}</SidebarContent>;
});

export default SidebarContent;
