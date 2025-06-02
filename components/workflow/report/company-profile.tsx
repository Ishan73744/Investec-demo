"use client"

import { Download, FileSpreadsheet, Globe, Mail, RefreshCw } from "lucide-react"

interface CompanyData {
  name: string
  established: string
  stockInfo: string
  overview: string
  products: { category: string; description: string }[]
  manufacturing: string
  transactions: { year: string; description: string }[]
  keyMetrics: { label: string; value: string }[]
  financials: { metric: string; fy2023: string; fy2022: string; fy2021: string }[]
  website: string
  email: string
  websiteUrl?: string // Add this line for the new website URL field
  financialFile?: string // Add this line for the financial file
}

interface Props {
  companyData: CompanyData
  onRestart: () => void
}

export function CompanyProfile({ companyData, onRestart }: Props) {
  return (
    <div className="flex w-full flex-col rounded-md border border-zinc-200 bg-white">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Company Profile</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              <Download className="mr-2 h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#8098c4]">Name</span>
            <span className="text-sm text-[#4e5971]">{companyData.name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#8098c4]">Established</span>
            <span className="text-sm text-[#4e5971]">{companyData.established}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#8098c4]">Stock Info</span>
            <span className="text-sm text-[#4e5971]">{companyData.stockInfo}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#8098c4]">Website & Contact</span>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4 text-[#8098c4]" />
                <a
                  href={companyData.websiteUrl || `https://${companyData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#004ce6] hover:underline"
                >
                  {companyData.website}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-[#8098c4]" />
                <span className="text-[#4e5971]">{companyData.email}</span>
              </div>
              {companyData.financialFile && (
                <div className="flex items-center gap-1 mt-1">
                  <FileSpreadsheet className="h-4 w-4 text-[#8098c4]" />
                  <span className="text-[#4e5971]">Financial data from: {companyData.financialFile}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#8098c4]">Overview</span>
          <span className="text-sm text-[#4e5971]">{companyData.overview}</span>
        </div>
      </div>
    </div>
  )
}
