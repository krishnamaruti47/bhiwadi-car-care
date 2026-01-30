import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Krishna Maruti Zone | Expert Mechanic & Service Center',
  description: 'Best car repair service in Rewari. Denting, painting, AC repair, insurance renewal and periodic service. Free pickup and drop available.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}