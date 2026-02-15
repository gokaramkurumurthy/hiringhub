import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { AuthProvider } from "@/app/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { DataProvider } from "@/app/contexts/data-context"
import { ThemeProvider } from "@/components/theme-provider"
import { ServiceRequestProvider } from "@/app/contexts/service-request-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FindEasy - Connect with Professionals",
  description: "Find and connect with professionals across various fields quickly and easily",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <DataProvider>
              <ServiceRequestProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </ServiceRequestProvider>
            </DataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
