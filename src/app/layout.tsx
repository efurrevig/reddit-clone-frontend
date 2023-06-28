import Navbar from '../components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/components/Provider'
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Creddit',
  description: 'Reddit clone using next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
        </Providers>
        {children}
      </body>
    </html>
  )
}
