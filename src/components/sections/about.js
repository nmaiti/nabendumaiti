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
              Hello! My name is Nabendu Bikash Maiti and I am passionate about creating,
              experimenting, and developing software and hardware. I grew interest in electronics
              long back in my school days (2000)
            </p>

            <p>
              Fast-forward to the present day, and I've had the privilege of gaining work experience
              at <a href="https://www.intel.com/">Biggest Semiconductor manufacturer</a>, and{' '}
              <a href="https://www.broadcom.com/">Network Giant</a>, and{' '}
              <a href="https://www.capgemini.com/">IT Service company</a>,{' '}
              <a href="https://global.abb/group/en">a renowned Automation giant</a>. Currently, my
              main focus is on building and developing platform software that is both convenient and
              secure for both OEMs and end-users.
            </p>

            <p>
              I also recently started experimenting on cutting edge ML based fuzzing to ensure AI
              can fully utilized for few Intel software products.
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
