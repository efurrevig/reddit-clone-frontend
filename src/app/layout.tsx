import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/components/Provider'
import Navbar from '@/components/navbar/Navbar'
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
          <div className='flex flex-row gap-2 justify-center w-full my-3'>
            <div className='w-144'>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
