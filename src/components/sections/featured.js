'use client'
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import sr from '@/utils/sr';
import { srConfig } from '@/config';
import { Icon } from '@/components/icons';
import { usePrefersReducedMotion } from '@/hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;
      margin-left: auto; // Align container to right

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: 0;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: ${props => props.theme.higlight};
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: ${props => props.theme.lightestslate};
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      // color: ${props => props.theme.white};

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: ${props => props.theme.lightnavy};
    color: ${props => props.theme.lightslate};
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: ${props => props.theme.white};
      font-weight: normal;
    }
    a,
    img {
      display: block;
      width: 50%;
      margin: 0 auto;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 10px 0 10px;
    padding: 10px 15px; // Add padding around list
    list-style: none;

    // Semi-blur background
    background-color: ${props => props.theme.isDark ? 'rgba(12, 45, 95, 0.6)' : 'rgba(255, 255, 255, 0.5)'};
    backdrop-filter: blur(2px);
    border-radius: var(--border-radius);
    width: fit-content;
    max-width: 100%;

    li {
      margin: 0 20px 5px 0;
      color: ${props => props.theme.lightestslate};
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: ${props => props.theme.lightestslate};
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: ${props => props.theme.lightestslate};

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 900px;
    height: auto;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: auto;
      opacity: 0.25;
    }

    a {
      width: 100%;
      height: 100%;
      background-color: ${props => props.theme.higlighttint};
      border-radius: var(--border-radius);
      vertical-align: middle;
      overflow: hidden;
      display: block; // Ensures anchor takes up space
      position: relative; // For the pseudo-element

      // Removed fixed aspect-ratio to allow image to dictate size on desktop
      // aspect-ratio: 16 / 9; 

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
          transform: translateY(-4px) scale(1.02);
          opacity: 1;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
      width: 100%;
      height: auto; // Allow natural height on desktop
      object-fit: contain; // Ensure full image is seen if it has constraints
      opacity: 0.97;
      transition: transform 200ms ease, opacity 200ms ease, filter 200ms ease;

      @media (max-width: 768px) {
        object-fit: cover; // Keep background effect on mobile
        width: 100%;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const Featured = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/featured');
        if (!res.ok) throw new Error(`Failed to fetch featured (${res.status})`);
        const data = await res.json();
        setFeaturedProjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (revealTitle.current) {
      sr.reveal(revealTitle.current, srConfig());
    }

    revealProjects.current.forEach((ref, i) => {
      if (!ref) return;
      sr.reveal(ref, srConfig(i * 100));
    });
  }, [prefersReducedMotion, featuredProjects]);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects.map((project, i) => {
          const { external, title, tech = [], github, cover, cta, description } = project;
          const projectLink = external || github || '#';

          return (
            <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
              <div className="project-content">
                <div>
                  <p className="project-overline">Featured Project</p>

                  <h3 className="project-title">
                    <a href={projectLink}>{title || 'Untitled project'}</a>
                  </h3>

                  {description && (
                    <div className="project-description" dangerouslySetInnerHTML={{ __html: description }} />
                  )}

                  {tech.length > 0 && (
                    <ul className="project-tech-list">
                      {tech.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className="project-links">
                    {cta && (
                      <a href={cta} aria-label="Course Link" className="cta">
                        Learn More
                      </a>
                    )}
                    {github && (
                      <a href={github} aria-label="GitHub Link">
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {external && !cta && (
                      <a href={external} aria-label="External Link" className="external">
                        <Icon name="External" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {cover && (
                <div className="project-image">
                  <a href={projectLink}>
                    <img
                      src={cover}
                      alt={title || 'Project image'}
                      className="img"
                      loading="lazy"
                    />
                  </a>
                </div>
              )}
            </StyledProject>
          );
        })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
