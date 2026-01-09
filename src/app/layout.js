import StyledComponentsRegistry from '@/lib/registry'
import { Providers, AppClientLayout } from '@/components/common'
import { Nav } from '@/components/layout'
import { calibre, sfMono } from './fonts'

export const metadata = {
  title: 'Nabendu Maiti',
  description: 'Nabendu Maiti is a security software engineer who working on platform security and full stack.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${calibre.variable} ${sfMono.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Nav />
            <AppClientLayout>
              {children}
            </AppClientLayout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
