import type { ReactNode } from "react"

export interface WorkflowStep {
  id: number
  title: string
  description: string
}

export interface WorkflowConfig {
  id: string
  title: string
  description: string
  steps: WorkflowStep[]
  initialMessage: string | ReactNode
}

export interface Industry {
  id: string
  name: string
  macroSector: string
  subSector: string
}

export interface ChartData {
  id: string
  title: string
  type: string
  data?: any[]
}

export interface MarketData {
  title?: string
  marketSize: string
  cagr: string
  keyDrivers?: string[]
  risks?: string[]
  charts?: ChartData[]
  benchmarks?: { metric: string; industry: string; market: string; topQuartile?: string }[]
  summary: string
  sources?: string[]
}

export interface Message {
  id: string
  role: "system" | "user" | "loading"
  content: string | ReactNode
  timestamp: Date
  showCustomization?: boolean
  step?: number
}
