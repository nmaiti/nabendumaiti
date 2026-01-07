'use client'
import React from 'react';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@/hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: ${props => props.theme.higlight};
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: ${props => props.theme.slate};
    line-height: 0.9;
  }

  h4 {
    margin-top: 4px;
    color: ${props => props.theme.slate};
    font-size: clamp(var(--fz-md), 5vw, var(--fz-xxl));
    font-weight: 800;
    line-height: 0.8;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Nabendu Bikash Maiti.</h2>;
  const three = <h4 className="medium-heading">I build, tinker both software and hardware.</h4>;
  const four = (
    <>
      <p>
        I am a Senior Software Engineer skilled in creating and securing platform software
        solutions. With deep expertise in both hardware and software, I focus on platform security,
        utilizing technologies like SGX and TPM, and actively participate in bug bounty programs to
        identify vulnerabilities. I have recently begun working on Zephyr-based MCTP and PLDM
        implementations for an embedded controller.{' '}
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:nbmaiti at gmail dot com?subject = Feedback&body = Message"
      target="_blank"
      rel="noreferrer"
    >
      Say hallo!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </StyledHeroSection>
  );
};

export default Hero;
