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
    border-color: ${props => props.theme.highlight};
    outline: none;
  }
  
  &::placeholder {
    color: var(--font-color-muted);
  }
`;

const SearchForm = styled.form`
  width: 100%;
`;

const SearchWidget = ({ value = '', onChange }) => {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // No navigation, just filter in parent
    if (onChange) {
      onChange(query);
    }
  };

  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
    </SearchForm>
  );
};

export default SearchWidget;
