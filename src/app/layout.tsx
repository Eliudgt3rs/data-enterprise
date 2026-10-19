import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DataFactor Enterprise Analytics Platform',
  description: 'Enterprise-grade full-stack application meeting DataFactor valuation standards.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500 selection:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </div>
      </body>
    </html>
  )
}
