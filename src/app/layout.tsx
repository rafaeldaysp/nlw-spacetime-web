import { ReactNode } from 'react'
import './globals.css'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-baijamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
