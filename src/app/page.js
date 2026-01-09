"use client";
import { AppClientLayout } from '@/components/common';
import { Social, Email, Footer } from '@/components/layout';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';

// Note: metadata must be exported from layout.js for client components

const Jobs = dynamic(() => import('@/components/sections/jobs'));
const Featured = dynamic(() => import('@/components/sections/featured'));
const Projects = dynamic(() => import('@/components/sections/projects'));
const Contact = dynamic(() => import('@/components/sections/contact'));

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

export default function Home() {
  return (
    <AppClientLayout>
      <StyledMainContainer className="fillHeight">
        <Hero />
        <About />
        <Jobs />
        <Featured />
        <Projects />
        <Contact />
      </StyledMainContainer>
      <Social isHome={true} />
      <Email isHome={true} />
      <Footer />
    </AppClientLayout>
  );
}
