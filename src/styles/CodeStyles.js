import { css } from 'styled-components';

const CodeStyles = css`
  [data-rehype-pretty-code-figure] {
    margin: 2em 0;
    position: relative;
  }

  [data-rehype-pretty-code-title] {
    padding: 1em 1.5em;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    background-color: ${props => props.theme.isDark ? 'var(--shiki-dark-bg)' : 'var(--shiki-light-bg)'};
    color: ${props => props.theme.isDark ? 'var(--shiki-dark)' : 'var(--shiki-light)'};
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    border-bottom: 1px solid ${props => props.theme.navyshadow};

    & + pre {
      margin-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  pre {
    background-color: ${props => props.theme.isDark ? 'var(--shiki-dark-bg)' : 'var(--shiki-light-bg)'} !important;
    color: ${props => props.theme.isDark ? 'var(--shiki-dark)' : 'var(--shiki-light)'} !important;
    border-radius: var(--border-radius);
    padding: 1.25em;
    overflow: auto;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    line-height: 1.5;
    tab-size: 2;
  }

  code {
    font-family: var(--font-mono);
    font-size: inherit;
  }

  pre > code {
    display: grid;
  }
  
  code[data-line-numbers] {
    counter-reset: line;
  }

  code[data-line-numbers] > [data-line] {
    padding: 0 1rem 0 1.5rem;
    border-left: 2px solid transparent;
  }

  code[data-line-numbers] > [data-line]::before {
    counter-increment: line;
    content: counter(line);
    display: inline-block;
    width: 1rem;
    margin-right: 1rem;
    text-align: right;
    color: gray;
  }

  span[data-highlighted-line] {
    background-color: rgba(200, 200, 255, 0.1);
    border-left-color: ${props => props.theme.highlight || '#64ffda'};
  }

  /* Language badges */
  pre[data-language]::before {
    content: attr(data-language);
    background: #3c3836;
    color: white;
    font-size: var(--fz-xxs);
    font-family: var(--font-mono);
    line-height: 1.5;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 0 0 3px 3px;
    position: absolute;
    top: 0;
    right: 1.25rem;
    padding: 0.25rem 0.5rem;
  }
  
  /* Token colors */
  code span {
    color: ${props => props.theme.isDark ? 'var(--shiki-dark)' : 'var(--shiki-light)'};
  }
`;

export default CodeStyles;
