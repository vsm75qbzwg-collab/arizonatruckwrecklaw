import type React from "react"
import type { Metadata } from "next"
import { Libre_Baskerville, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Gorski Injury Law | Commercial Trucking & Severe Injury Attorneys",
  description:
    "Peter Gorski, Attorney at Law since 1983. Specializing in commercial & semi truck accidents, severe injuries, and wrongful death cases. Offices in Pinetop and Chandler, Arizona.",
  generator: "v0.app",
  keywords: [
    "truck accident attorney",
    "commercial trucking lawyer",
    "severe injury attorney",
    "Arizona injury lawyer",
    "wrongful death attorney",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${libreBaskerville.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
