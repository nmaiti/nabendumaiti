import { css } from 'styled-components';

const button = css`
  color: ${props => props.theme.higlight};
  background-color: transparent;
  border: 1px solid ${props => props.theme.higlight};
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.25rem 1.75rem;

  &:hover,
  &:focus,
  &:active {
    background-color: ${props => props.theme.higlighttint};
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:active,
    &:focus {
      color: ${props => props.theme.higlight};
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: var(--transition);
    color: ${props => props.theme.higlight};
    &:hover,
    &:focus,
    &:active {
      color: ${props => props.theme.higlight};
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: ${props => props.theme.higlight} !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: ${props => props.theme.higlight};
      transition: var(--transition);
      opacity: 0.5;
    }
  `,

  button,

  smallButton: css`
    background-color: ${props => props.theme.higlight};
    background-color: transparent;
    border: 1px solid ${props => props.theme.higlight};
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: ${props => props.theme.higlighttint};
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: ${props => props.theme.higlight};
    background-color: transparent;
    border: 1px solid ${props => props.theme.higlight};
    border-radius: var(--border-radius);
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: ${props => props.theme.higlighttint};
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px ${props => props.theme.navyshadow};
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 20px 30px -15px ${props => props.theme.navyshadow};
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${props => props.theme.higlight};
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
