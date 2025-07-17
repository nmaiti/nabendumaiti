import { css } from 'styled-components';

const prismColors = {
  bg: `#282828`,
  lineHighlight: `#1d2021`,
  lineselectbg: `#7c6f64`,
  lineselectfg: `#fbf1c7`,
  blue: `#5ccfe6`,
  purple: `#c3a6ff`,
  green: `#bae67e`,
  yellow: `#ffd580`,
  orange: `#ffae57`,
  red: `#ef6b73`,
  grey: `#a2aabc`,
  comment: `#8695b799`,
};

// https://www.gatsbyjs.org/packages/gatsby-remark-prismjs

const PrismStyles = css`
  /**
  * Add back the container background-color, border-radius, padding, margin
  * and overflow that we removed from <pre>.
  */
  .gatsby-highlight {
    background-color: ${prismColors.bg};
    color: ${prismColors.variable};

    border-radius: var(--border-radius);
    margin: 2em 0;
    padding: 1.25em;
    overflow: auto;
    position: relative;
    font-family: var(--font-mono);
    font-size: var(--fz-md);
  }

  .gatsby-highlight code[class*='language-'],
  .gatsby-highlight pre[class*='language-'] {
    height: auto !important;
    font-size: var(--fz-sm);
    line-height: 1.5;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 2;
    hyphens: none;
  }

  /**
  * Remove the default PrismJS theme background-color, border-radius, margin,
  * padding and overflow.
  * 1. Make the element just wide enough to fit its content.
  * 2. Always fill the visible space in .gatsby-highlight.
  * 3. Adjust the position of the line numbers
  */
  .gatsby-highlight pre[class*='language-'] {
    color: #fbf1c7; /* fg0 */

    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
    padding-top: 1em;
    padding-bottom: 0.2em;
  }

  /* File names */
  .gatsby-code-title {
    padding: 1em 1.5em;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    background-color: ${prismColors.bg};
    color: ${prismColors.grey};
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    border-bottom: 1px solid ${prismColors.lineHighlight};

    & + .gatsby-highlight {
      margin-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  /* Line highlighting */
  .gatsby-highlight-code-line {
    display: block;
    background-color: ${prismColors.lineHighlight};
    border-left: 2px solid ${props => props.theme.higlight};
    padding-left: calc(1em + 2px);
    padding-right: 1em;
    margin-right: -1.35em;
    margin-left: -1.35em;
  }

  /* Language badges */
  .gatsby-highlight pre[class*='language-']::before {
    background: #3c3836;
    color: ${props => props.theme.white};
    font-size: var(--fz-xxs);
    font-family: var(--font-mono);
    line-height: 1.5;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 0 0 3px 3px;
    position: absolute;
    top: 0;
    left: 1.25rem;
    padding: 0.25rem 0.5rem;
  }
  .gatsby-highlight pre[class='language-javascript']::before {
    content: 'js';
  }
  .gatsby-highlight pre[class='language-js']::before {
    content: 'js';
  }
  .gatsby-highlight pre[class='language-jsx']::before {
    content: 'jsx';
  }
  .gatsby-highlight pre[class='language-graphql']::before {
    content: 'GraphQL';
  }
  .gatsby-highlight pre[class='language-html']::before {
    content: 'html';
  }
  .gatsby-highlight pre[class='language-css']::before {
    content: 'css';
  }
  .gatsby-highlight pre[class='language-mdx']::before {
    content: 'mdx';
  }
  .gatsby-highlight pre[class='language-shell']::before {
    content: 'shell';
  }
  .gatsby-highlight pre[class='language-sh']::before {
    content: 'sh';
  }
  .gatsby-highlight pre[class='language-bash']::before {
    content: 'bash';
  }
  .gatsby-highlight pre[class='language-c']::before {
    content: 'C';
  }
  .gatsby-highlight pre[class='language-yaml']::before {
    content: 'yaml';
  }
  .gatsby-highlight pre[class='language-markdown']::before {
    content: 'md';
  }
  .gatsby-highlight pre[class='language-json']::before,
  .gatsby-highlight pre[class='language-json5']::before {
    content: 'json';
  }
  .gatsby-highlight pre[class='language-diff']::before {
    content: 'diff';
  }
  .gatsby-highlight pre[class='language-text']::before {
    content: 'text';
  }
  .gatsby-highlight pre[class='language-flow']::before {
    content: 'flow';
  }

  .token {
    display: inline;
  }

  /* Prism Styles */
  .token.comment,
  .token.prolog,
  .token.cdata {
    color: #a89984; /* fg4 / gray1 */
  }

  .token.delimiter,
  .token.boolean,
  .token.keyword,
  .token.selector,
  .token.important,
  .token.atrule {
    color: #fb4934; /* red2 */
  }

  .token.operator,
  .token.punctuation,
  .token.attr-name {
    color: #a89984; /* fg4 / gray1 */
  }

  .token.tag,
  .token.tag .punctuation,
  .token.doctype,
  .token.builtin {
    color: #fabd2f; /* yellow2 */
  }

  .token.entity,
  .token.number,
  .token.symbol {
    color: #d3869b; /* purple2 */
  }

  .token.property,
  .token.constant,
  .token.variable {
    color: #fb4934; /* red2 */
  }

  .token.string,
  .token.char {
    color: #b8bb26; /* green2 */
  }

  .token.attr-value,
  .token.attr-value .punctuation {
    color: #a89984; /* fg4 / gray1 */
  }

  .token.url {
    color: #b8bb26; /* green2 */
    text-decoration: underline;
  }

  .token.function {
    color: #fabd2f; /* yellow2 */
  }

  .token.regex {
    background: #b8bb26; /* green2 */
  }

  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.inserted {
    background: #a89984; /* fg4 / gray1 */
  }

  .token.deleted {
    background: #fb4934; /* red2 */
  }
`;

export default PrismStyles;
