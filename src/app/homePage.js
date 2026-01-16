'use client';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';

const Jobs = dynamic(() => import('@/components/sections/jobs'));
const Featured = dynamic(() => import('@/components/sections/featured'));
const Projects = dynamic(() => import('@/components/sections/projects'));
const Contact = dynamic(() => import('@/components/sections/contact'));

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

export default function HomePage() {
  return (
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Projects />
      <Contact />
    </StyledMainContainer>
  );
}
