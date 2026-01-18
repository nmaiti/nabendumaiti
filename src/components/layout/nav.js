"use client"
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import config from '@/config';
import { usePathname } from 'next/navigation';
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
    align-items: right;
    justify-content: end;
    
    svg {
      color: ${props => props.theme.highlight};
    }

    &:hover,
    &:focus-visible {
      transform: translate(+2px, +2px);
      svg {
        color: ${props => props.theme.highlighttint};
      }
    }
    &:active {
      transform: none;
      svg {
        color: ${props => props.theme.highlight};
      }
    }
  }

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};
    a {
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    svg {
      color: ${props => props.theme.highlight};
    }

    &:hover,
    &:focus-visible {
      transform: translate(+2px, +2px);
      color: ${props => props.theme.highlighttint};
      svg {
        color: ${props => props.theme.highlight};
      }
    }
    &:active {
      transform: none;
      color: ${props => props.theme.highlight};
      svg {
        color: ${props => props.theme.highlight};
      }
    }
  
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 94%;   

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
        transition: color 0.2s, background 0.2s;

        &.active {
          color: ${props => props.theme.highlight || '#fd8624'};
          font-weight: bold;
          border-bottom: 2px solid ${props => props.theme.highlight || '#24b4fd'};
        }

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: ${props => props.theme.highlight};
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
  const [isMounted, setIsMounted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const timeout = 1800;
  const fadeClass = 'fade';
  const fadeDownClass = 'fadedown';
  const pathname = usePathname();
  const navLinks = config.navLinks || [];

  // nodeRefs for CSSTransition
  const logoRef = useRef(null);
  const navLinkRefs = useRef(navLinks.map(() => React.createRef()));
  const resumeRef = useRef(null);
  const menuRef = useRef(null);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    setHasMounted(true);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const Logo = (
    <div className="logo" tabIndex="-1" ref={logoRef}>
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
      ref={resumeRef}
    >
      Resume
    </a>
  );

  if (!hasMounted) return null;

  // Helper: determine if Blog link should be active (robust for all blog-related pages)
  const normalizePath = (p) => {
    if (!p) return '';
    // Remove trailing slash (except for root)
    return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
  };
  const isBlogActive = () => {
    // Match /blogs, /categories, /tags, /search, /posts and their subpaths (with or without trailing slash)
    const blogRegex = /^(\/blogs(\/.*)?|\/categories(\/.*)?|\/tags(\/.*)?|\/search(\/.*)?|\/posts(\/.*)?)$/;
    return blogRegex.test(normalizePath(pathname));
  };

  return (
    <StyledHeader $scrollDirection={scrollDirection} $scrolledToTop={scrolledToTop}>
      <StyledNav>
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout} nodeRef={logoRef}>
              {Logo}
            </CSSTransition>
          )}
        </TransitionGroup>
        <StyledLinks>
          <ol>
            <TransitionGroup component={null}>
              {isMounted &&
                navLinks &&
                navLinks.map(({ url, name }, i) => {
                  // For hash links, check if on home and hash matches
                  let isActive = false;
                  if (url.startsWith('/#')) {
                    isActive = typeof window !== 'undefined' && pathname === '/' && window.location.hash === url.replace('/', '');
                  } else {
                    isActive = normalizePath(url) === normalizePath(pathname) || (name === 'Blog' && isBlogActive());
                  }
                  return (
                    <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout} nodeRef={navLinkRefs.current[i]}>
                      <li ref={navLinkRefs.current[i]} style={{ transitionDelay: `${i * 100}ms` }}>
                        <Link
                          href={url}
                          className={isActive ? 'active' : ''}
                        >
                          {name}
                        </Link>
                      </li>
                    </CSSTransition>
                  );
                })}
            </TransitionGroup>
          </ol>
          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames={fadeDownClass} timeout={timeout} nodeRef={resumeRef}>
                <div ref={resumeRef} style={{ marginLeft: '20px', transitionDelay: `${navLinks.length * 100}ms` }}>
                  {ResumeLink}
                </div>
              </CSSTransition>
            )}
          </TransitionGroup>
        </StyledLinks>
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout} nodeRef={menuRef}>
              <div ref={menuRef} style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                {DarkMode}
                <Menu />
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </StyledNav>
    </StyledHeader>
  );
}

export default Nav;
