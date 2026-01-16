// Renamed from ClientLayout.js for clarity
'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Loader } from '@/components/layout'

export default function AppClientLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Only show loader on homepage */}
      {isHome && isLoading && <Loader finishLoading={handleFinishLoading} />}
      <div id="content">
        {children}
      </div>
    </>
  );
}
