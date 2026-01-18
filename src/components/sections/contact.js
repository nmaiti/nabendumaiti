'use client'
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@/config';
import sr from '@/utils/sr';
import { usePrefersReducedMotion } from '@/hooks';

const StyledContactSection = styled.section`
    .fadeup {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeUp 0.6s forwards;
      animation-timing-function: cubic-bezier(0.645,0.045,0.355,1);
      animation-delay: var(--fadeup-delay, 0ms);
    }

    @keyframes fadeUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: ${props => props.theme.highlight};
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  // State to ensure fadeup class/style only applied after hydration
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <div
        className={isHydrated && !prefersReducedMotion ? 'fadeup' : ''}
        style={isHydrated && !prefersReducedMotion ? { '--fadeup-delay': '300ms' } : {}}
      >
        <h2 className="numbered-heading overline">What’s Next?</h2>
        <h2 className="title">Get In Touch</h2>
        <p>
          Although I'm not actively searching for new opportunities, I'm open to hearing about
          exciting and challenging opportunities that may be of interest to me. Additionally, if you
          just want to say hello, please feel free to drop me a line and I'll do my best to respond.
        </p>
        <a className="email-link" href={`mailto:${email}`}>
          Let's Connect
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
