'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: var(--font-color-base);
  border: 1px solid ${props => props.theme.lightestnavy};
  border-radius: var(--border-radius);
  font-size: 1.2rem;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus {
    border-color: ${props => props.theme.higlight};
    outline: none;
  }
  
  &::placeholder {
    color: var(--font-color-muted);
  }
`;

const SearchForm = styled.form`
  width: 100%;
`;

const SearchWidget = ({ currentSearchQuery = '' }) => {
  const [query, setQuery] = useState(currentSearchQuery);
  const router = useRouter();

  // Sync with prop change (e.g. navigation / Back button)
  useEffect(() => {
    setQuery(currentSearchQuery);
  }, [currentSearchQuery]);

  // Debounced search effect
  useEffect(() => {
     if (query === currentSearchQuery) return;

     const timeoutId = setTimeout(() => {
         if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
         } else if (currentSearchQuery) {
            router.push('/search');
         }
     }, 300); // 300ms debounce

     return () => clearTimeout(timeoutId);
  }, [query, currentSearchQuery, router]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <SearchForm onSubmit={handleSearch}>
        <SearchInput
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    </SearchForm>
  );
};

export default SearchWidget;
