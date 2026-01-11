import { Social, Email, Footer } from '@/components/layout';
import HomePage from './homePage';

// Note: metadata must be exported from layout.js for client components

export default function Home() {
  return (
    <>
      <HomePage />
      <Social isHome={true} />
      <Email isHome={true} />
      <Footer />
    </>
  );
}
