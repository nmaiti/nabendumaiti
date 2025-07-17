import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
//  grid-template-columns: repeat(4, minmax(180px, 500px));
//grid-template-columns: repeat(4, 1fr);
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));

    grid-gap: 0 10px;
    padding: 0;
    margin: 5px 0 0 0;
    overflow: hidden;
    list-style: none;
    position: relative;

    li {
      position: relative;
      margin-bottom: 8px;
      padding-left: 12px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${props => props.theme.higlight};
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: ${props => props.theme.higlight};

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 12px;
        left: 12px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: ${props => props.theme.navy};
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid ${props => props.theme.higlight};
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skillsSW = [
    'C',
    'Python',
    'shellscript',
    'Linux/VxWorks',
    'SQL',
    'OpenWrt',
    'Cryptography',
    'Git',
    'JIRA',
    'AFL',
    'restler-fuzzer',
    'Uboot',
    'Docker/kubernets',
    'Fuzzing',
    'AWS',
    'JavaScript (ES6+)',
    'React',
    'Flask',
  ];
  const skillsHW = [
    'JTAGS',
    'Intel',
    'PIC',
    'Optiga SE',
    'Atinny85',
    'ESP-8266/32',
    'RT5350',
    'SDcard',
    'I2C/SPI',
    'PIR',
    'EagleCAD',
    'ProteousCAD',
    'AutoCAD Fusion360',
  ];
  const randomFacts = [
    'Certified Scuba Diver',
    'Love travel',
    'Adventurers sports',
    'Love Gadgets',
    'Stock Technical Analysis',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! I'm Nabendu Bikash Maiti, a software professional with a passion for technology that began with electronics in 2000.
              I've worked across industries—from {' '}
              <a href="https://www.intel.com/">Semiconductor</a>, and{' '}
              <a href="https://www.broadcom.com/">Network</a>, and{' '}
              <a href="https://www.capgemini.com/">IT Service</a>,{' '}
              <a href="https://global.abb/group/en">an Automation</a>company.
              These experiences have enriched my understanding of both hardware and software domains.
            </p>

            <p>
              Currently, I develop secure, user-friendly platform software for OEMs and end-users.
              While I have a background in schematic and PCB design, my main focus is system software development.
              Lately, I’ve been exploring machine learning-based fuzzing to enhance Intel software security using AI.
            </p>
            <p>Here are a few technologies I’ve worked on:</p>
          </div>{' '}
          <p />
          <p />
          Software:
          <ul className="skills-list">
            {skillsSW && skillsSW.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
          <span>Hardware:</span>
          <ul className="skills-list">
            {skillsHW && skillsHW.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
          <p> </p>
          <p>Other than work some Random Facts about Me:</p>
          <ul className="skills-list">
            {randomFacts && randomFacts.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/avtar.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
