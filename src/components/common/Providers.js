'use client'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '@/styles/GlobalStyle'
import theme from '@/styles/theme'
import { useState, createContext, useContext } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within Providers')
  }
  return context
}

export default function Providers({ children }) {
  // Default to light mode
  const [isDark, setIsDark] = useState(false) 
  
  const changeTheme = () => {
    setIsDark(prev => !prev)
  }
  
  const isDarkMode = () => isDark
  
  return (
    <ThemeContext.Provider value={{ changeTheme, isDark: isDarkMode }}>
      <ThemeProvider theme={theme(isDark)}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
