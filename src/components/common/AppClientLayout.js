// Renamed from ClientLayout.js for clarity
'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Loader, Nav, Social, Email, Footer } from '@/components/layout'

export default function AppClientLayout({ children }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
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
