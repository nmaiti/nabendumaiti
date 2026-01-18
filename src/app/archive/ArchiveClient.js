'use client';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { srConfig } from '@/config';
import sr from '@/utils/sr';
import { Icon } from '@/components/icons';
import { usePrefersReducedMotion } from '@/hooks';

const StyledTableContainer = styled.div`
  margin: 100px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: ${props => props.theme.lightnavy};
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.year {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: ${props => props.theme.lightestslate};
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }

      &.company {
        font-size: var(--fz-lg);
        white-space: nowrap;
      }

      &.tech {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;
        .separator {
          margin: 0 5px;
        }
        span {
          display: inline-block;
        }
      }

      &.links {
        min-width: 100px;

        div {
          display: flex;
          align-items: center;

          a {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-shrink: 0;
          }

          a + a {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

const StyledMainContainer = styled.main`
  max-width: 1600px;
`;

function ArchiveClient({ projects }) {
  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [search, setSearch] = useState("");
  const filteredProjects = useMemo(() => {
    if (!search) return projects;
    const lower = search.toLowerCase();
    return projects.filter(project => {
      const titleMatch = project.title?.toLowerCase().includes(lower);
      const companyMatch = project.company?.toLowerCase().includes(lower);
      const techMatch = project.tech?.some(t => t.toLowerCase().includes(lower));
      return titleMatch || companyMatch || techMatch;
    });
  }, [search, projects]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig(200, 0));
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, [filteredProjects, prefersReducedMotion]);

  return (
    <StyledMainContainer>
      <header ref={revealTitle}>
        <h1 className="big-heading">Archive</h1>
        <p className="subtitle">A big list of things I’ve worked on</p>
        <div style={{ margin: '2rem 0' }}>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 1rem', fontSize: '1.2rem', borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
      </header>
      <StyledTableContainer ref={revealTable}>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
              <th className="hide-on-mobile">Made at</th>
              <th className="hide-on-mobile">Built with</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 &&
              filteredProjects.map((project, i) => {
                const { date, github, external, blog, android, title, tech, company } = project;
                return (
                  <tr key={i} ref={el => (revealProjects.current[i] = el)}>
                    <td className="overline year">
                      <p>{date ? new Date(date).getFullYear() : '—'}</p>
                    </td>
                    <td className="title">{title}</td>
                    <td className="company hide-on-mobile">
                      {company ? <span>{company}</span> : <span>—</span>}
                    </td>
                    <td className="tech hide-on-mobile">
                      {tech?.length > 0 &&
                        tech.map((item, i) => (
                          <span key={i}>
                            {item}
                            {''}
                            {i !== tech.length - 1 && <span className="separator">&middot;</span>}
                          </span>
                        ))}
                    </td>
                    <td className="links">
                      <div>
                        {external && (
                          <a href={external} aria-label="External Link" target="_blank" rel="noopener noreferrer">
                            <Icon name="External" />
                          </a>
                        )}
                        {github && (
                          <a href={github} aria-label="GitHub Link" target="_blank" rel="noopener noreferrer">
                            <Icon name="GitHub" />
                          </a>
                        )}
                        {blog && (
                          <a href={blog} aria-label="Article Link" target="_blank" rel="noopener noreferrer">
                            <Icon name="Post" />
                          </a>
                        )}
                        {android && (
                          <a href={android} aria-label="Google Play Store Link" target="_blank" rel="noopener noreferrer">
                            <Icon name="PlayStore" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </StyledTableContainer>
    </StyledMainContainer>
  );
}

export default ArchiveClient;
