'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Loader, Nav, Social, Email, Footer } from '@/components/layout'

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  // Initialize state based on whether we are on the homepage *at mount time*
  // If we land on a subpage, isHome is false, so no loader.
  // If we land on home, isHome is true, so loader shows.
  const [isLoading, setIsLoading] = useState(isHome)

  const handleFinishLoading = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && isHome && <Loader finishLoading={handleFinishLoading} />}
      
      <Nav isHome={isHome} />
      <Social isHome={isHome} />
      <Email isHome={isHome} />
      <div id="content">
        {children}
        <Footer />
      </div>
    </>
  )
}
