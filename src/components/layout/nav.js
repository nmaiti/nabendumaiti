'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { navLinks } from '@/config';
import { useScrollDirection } from '@/hooks';
import { IconLogo, IconSun, IconMoon } from '@/components/icons';
import { useTheme } from '@/components/common';
import Menu from './menu';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: ${props => props.theme.darknavy};
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
      props.$scrollDirection === 'up' &&
      !props.$scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: ${props => props.theme.darknavy};
        box-shadow: 0 10px 30px -10px ${props => props.theme.navyshadow};
      `};

    ${props =>
      props.$scrollDirection === 'down' &&
      !props.$scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px ${props => props.theme.navyshadow};
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: ${props => props.theme.lightestslate};
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .dark-mode {
    width: 25px;
    height: 25px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    > svg {
      color: ${props => props.theme.higlight};
    }
  }

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: ${props => props.theme.higlight};
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover,
      &:focus {
        svg {
          fill: ${props => props.theme.higlighttint};
        }
      }

      svg {
        fill: none;
        transition: var(--transition);
        user-select: none;
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: ${props => props.theme.higlight};
          font-size: var(--fz-xxs);
          text-align: right;
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }
`;

const Nav = () => {
  const { changeTheme, isDark } = useTheme();
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Logo = (
    <div className="logo" tabIndex="-1">
      <Link href="/" aria-label="home">
        <IconLogo />
      </Link>
    </div>
  );

  const DarkMode = (
    <button className="dark-mode" onClick={() => changeTheme()}>
      {isDark() ? <IconSun /> : <IconMoon />}
    </button>
  );

  const ResumeLink = (
    <a
      className="resume-button"
      href="/api/uploads/Nabendu_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a>
  );

  return (
    <StyledHeader $scrollDirection={scrollDirection} $scrolledToTop={scrolledToTop}>
      <StyledNav>
        {Logo}
        <StyledLinks>
          <ol>
            {navLinks &&
              navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <Link href={url}>{name}</Link>
                </li>
              ))}
          </ol>
          <div>{ResumeLink}</div>
        </StyledLinks>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {DarkMode}
          <Menu />
        </div>
      </StyledNav>
    </StyledHeader>
  );
};

export default Nav;
