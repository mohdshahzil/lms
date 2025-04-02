import React from 'react'
import './styles.css'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-black text-white">
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
