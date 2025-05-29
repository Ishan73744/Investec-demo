import type { Metadata } from "next"
import type React from "react"
import { Inter } from "next/font/google"

import { SidebarNavigation } from "@/components/layout/sidebar-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bynd Workflows",
  description: "Financial workflows and analysis tools",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex h-screen overflow-hidden bg-[#F4F9FF]">
            {/* Universal Sidebar Navigation */}
            <SidebarNavigation />

            {/* Main content - fixed container with scrollable content */}
            <div className="flex-1 p-4 overflow-hidden bg-[#F4F9FF]">
              <div
                className="h-full rounded-lg bg-[#FAFCFF] flex flex-col"
                style={{
                  boxShadow: "-1px -2px 8px 0px rgba(0, 76, 230, 0.03), 1px 2px 8px 0px rgba(0, 76, 230, 0.03)",
                  borderRadius: "12px",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
