import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bhiwadi Car Repair | Expert Mechanic & Service Center',
  description: 'Best car repair service in Bhiwadi, Rajasthan. Denting, painting, AC repair, and periodic service. Free pickup and drop available.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}