import './globals.css'

export const metadata = {
  title: 'Ayan Malik | React Developer Portfolio',
  description:
    'Premium React developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-hero-mesh text-slate-100 antialiased">{children}</body>
    </html>
  )
}
