import type React from "react"

interface DocumentIntelligenceLayoutProps {
  children: React.ReactNode
}

export function DocumentIntelligenceLayout({ children }: DocumentIntelligenceLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main
        className="flex-1 flex flex-col pt-6 px-[104px] overflow-y-auto rounded-xl"
        style={{
          backgroundColor: "#FAFCFF",
          boxShadow: "-1px -2px 8px 0px rgba(0, 76, 230, 0.03), 1px 2px 8px 0px rgba(0, 76, 230, 0.03)",
        }}
      >
        {children}
      </main>
    </div>
  )
}
