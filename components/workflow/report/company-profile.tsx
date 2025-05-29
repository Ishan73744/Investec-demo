"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { Hanken_Grotesk } from "next/font/google"

// Initialize the Hanken Grotesk font
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

interface CompanyProfileProps {
  companyData: any
  onRestart: () => void
}

export function CompanyProfile({ companyData, onRestart }: CompanyProfileProps) {
  const pageRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    alert("In a production environment, this would download a PDF of the company profile.")
  }

  // Helper function to bold numbers in text
  const boldNumbers = (text: string) => {
    return text.split(/(\d+\.?\d*%?x?)/).map((part, i) => {
      const isNumber = /^\d+\.?\d*%?x?$/.test(part)
      return isNumber ? (
        <span key={i} className="font-bold">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    })
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
        <div ref={pageRef} className={`w-full mx-auto bg-white p-8 overflow-visible ${hankenGrotesk.className}`}>
          {/* Header with Logo and Title */}
          <div className="border-b-2 border-emerald-700 pb-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-emerald-800">{companyData.name}</h1>
                <p className="text-xs text-gray-600 mt-1">
                  Established {companyData.established} | {companyData.stockInfo}
                </p>
              </div>
              <div className="flex-shrink-0">
                <img src="/aarti-drugs-logo.png" alt="Aarti Drugs Logo" className="h-10 w-auto" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - 8/12 width */}
            <div className="col-span-12 md:col-span-8">
              {/* Company Overview */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-emerald-700 flex items-center">
                  <span className="mr-2">🏢</span> Company Overview
                </h2>
                <p className="text-sm mt-2">{companyData.overview}</p>
              </div>

              {/* Product Portfolio - Updated content */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-emerald-700 flex items-center">
                  <span className="mr-2">📦</span> Product Portfolio
                </h2>
                <p className="text-sm mt-2">Aarti operates through three main segments:</p>
                <ul className="text-sm mt-2 list-disc pl-5">
                  <li className="mb-1">
                    <span className="font-semibold">Active Pharmaceutical Ingredients (APIs):</span>{" "}
                    <span className="font-bold">~65%</span> of revenue – focused on Metronidazole, Ketoconazole, and
                    Ciprofloxacin.
                  </li>
                  <li className="mb-1">
                    <span className="font-semibold">Formulations:</span> <span className="font-bold">~20%</span> –
                    supplied to both institutional buyers and branded generics, include Tablets, capsules, dry syrups
                    (human and veterinary)
                  </li>
                  <li className="mb-1">
                    <span className="font-semibold">Intermediates & Others:</span>{" "}
                    <span className="font-bold">~15%</span> – includes custom synthesis for international pharma clients
                  </li>
                </ul>
              </div>

              {/* Manufacturing Information */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-emerald-700 flex items-center">
                  <span className="mr-2">🏭</span> Manufacturing Information
                </h2>
                <p className="text-sm mt-2">{companyData.manufacturing}</p>
              </div>

              {/* Transaction History */}
              <div>
                <h2 className="text-lg font-bold text-emerald-700 flex items-center">
                  <span className="mr-2">💳</span> Transaction History
                </h2>
                <ul className="text-sm mt-2 list-disc pl-5">
                  {companyData.transactions.map((transaction: any, index: number) => (
                    <li key={index} className="mb-1">
                      <span className="font-semibold">{transaction.year}:</span> {transaction.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - 4/12 width */}
            <div className="col-span-12 md:col-span-4">
              {/* Key Metrics */}
              <div className="mb-6">
                <div className="space-y-3">
                  {companyData.keyMetrics.map((metric: any, index: number) => (
                    <div key={index} className="border border-gray-300 p-3 rounded">
                      <p className="text-gray-600 text-xs">{metric.label}</p>
                      <p className="font-bold text-sm">{boldNumbers(metric.value)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Valuation Insight section removed as requested */}
            </div>
          </div>

          {/* Financial Analysis - Bottom */}
          <div className="mt-6">
            <div className="border-t-2 border-emerald-700 pt-4 mt-4">
              <h2 className="text-lg font-bold text-emerald-700 flex items-center mb-3">
                <span className="mr-2">📊</span> Financial Analysis
              </h2>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-white">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-gray-700">
                        Metric
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-gray-700">
                        FY2023
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-gray-700">
                        FY2022
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-bold text-gray-700">
                        FY2021
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {companyData.financials.map((row: any, index: number) => (
                      <tr key={index}>
                        <td className="px-3 py-1.5 text-xs font-medium">{row.metric}</td>
                        <td className="px-3 py-1.5 text-xs text-left">{row.fy2023}</td>
                        <td className="px-3 py-1.5 text-xs text-left">{row.fy2022}</td>
                        <td className="px-3 py-1.5 text-xs text-left">{row.fy2021}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-1 italic">
                (YoY growth in parentheses; financial years ending March 31.)
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
            <div>© 2023 {companyData.name}. All Rights Reserved.</div>
            <div>
              {companyData.website} | {companyData.email}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start gap-2 mt-4">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-1 bg-[#004ce6] hover:bg-[#0040c9] text-white"
          size="sm"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button onClick={onRestart} variant="outline" className="flex items-center gap-1" size="sm">
          <RefreshCw className="h-4 w-4" />
          New Profile
        </Button>
      </div>
    </div>
  )
}
