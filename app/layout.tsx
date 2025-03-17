import type { Metadata } from 'next'
import './globals.css'
import Header from './header'

export const metadata: Metadata = {
  title: 'Health Food Trivia',
  description: 'Test your knowledge about health food, nutrition, sustainability, ethics, history, science, and culture.',
  keywords: ['health', 'food', 'nutrition', 'trivia', 'quiz'],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="min-h-screen bg-green-50">
        <div className="container mx-auto px-4 py-4">
          <Header />
          <main className="mt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}