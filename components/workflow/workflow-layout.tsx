import type React from "react"
interface WorkflowLayoutProps {
  children: React.ReactNode
}

export function WorkflowLayout({ children }: WorkflowLayoutProps) {
  return <>{children}</>
}
