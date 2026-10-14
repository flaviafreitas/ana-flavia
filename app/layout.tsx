import type {Metadata} from 'next'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import './globals.scss'

export const metadata: Metadata = {
  title: {default: 'Ana Flavia', template: '%s | Ana Flavia'},
  description: 'Site institucional de Ana Flavia',
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
