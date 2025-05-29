"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"

interface IPOReportProps {
  companyData: any
  selectedSections: string[]
  detailLevel: "high" | "detailed"
  outputOptions: {
    includePeerComparisons: boolean
    includeIndustryBenchmarks: boolean
    includeRecentDeals: boolean
    additionalNotes: string
  }
  onRestart: () => void
}

export function IPOReport({ companyData, selectedSections, detailLevel, outputOptions, onRestart }: IPOReportProps) {
  const pageRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    alert("In a production environment, this would download a PDF of the IPO screening report.")
  }

  return (
    <div className="space-y-6">
      <div
        ref={pageRef}
        className="max-w-4xl mx-auto bg-white p-8 border border-gray-200 rounded-lg"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {/* Header with Logo and Title */}
        <div className="border-b-2 border-gray-200 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-medium text-gray-900">IPO Screening Report</h1>
              <p className="text-sm text-gray-600 mt-1">{companyData.exchange}</p>
            </div>
            <div className="h-12">
              <img
                src={companyData.logo || "/placeholder.svg"}
                alt={`${companyData.name} Logo`}
                className="h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        {selectedSections.includes("executiveSummary") && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 flex items-center mb-3">
              <span className="mr-2">📄</span> Executive Summary
            </h2>
            <div className="bg-red-50/30 rounded p-4">
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-semibold">Company:</span> {companyData.name}
                </li>
                <li>
                  <span className="font-semibold">Business:</span> {companyData.business}
                </li>
                <li>
                  <span className="font-semibold">Market Position:</span> {companyData.marketPosition}
                </li>
                <li>
                  <span className="font-semibold">IPO Highlight:</span> {companyData.ipoHighlight}
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Offering Details */}
        {selectedSections.includes("offeringDetails") && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 flex items-center mb-3">
              <span className="mr-2">📊</span> Offering Details
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium">Fresh Issue</td>
                    <td className="px-4 py-2 text-sm">{companyData.offeringDetails.freshIssue}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium">Offer for Sale (OFS)</td>
                    <td className="px-4 py-2 text-sm">{companyData.offeringDetails.offerForSale}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium">Total Issue Size</td>
                    <td className="px-4 py-2 text-sm">{companyData.offeringDetails.totalIssueSize}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium">Price Band</td>
                    <td className="px-4 py-2 text-sm">{companyData.offeringDetails.priceBand}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium">Lot Size</td>
                    <td className="px-4 py-2 text-sm">{companyData.offeringDetails.lotSize}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium">Listing Date</td>
                    <td className="px-4 py-2 text-sm">{companyData.offeringDetails.listingDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Financial Highlights */}
        {selectedSections.includes("financialHighlights") && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 flex items-center mb-3">
              <span className="mr-2">💰</span> Financial Highlights (FY 20)
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                      Metric
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                      Amount (₹ Cr)
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                      YoY Change
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {companyData.financialHighlights.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm font-medium">{item.metric}</td>
                      <td className="px-4 py-2 text-sm text-left">{item.amount}</td>
                      <td className="px-4 py-2 text-sm text-left text-green-600">{item.yoyChange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">
              • Notes: First operating‐profit quarter in Q3 FY21; strong delivery volume growth (+60% YoY).
            </p>
          </div>
        )}

        {/* Use of Proceeds */}
        {selectedSections.includes("useOfProceeds") && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 flex items-center mb-3">
              <span className="mr-2">🎯</span> Use of Proceeds
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {companyData.useOfProceeds.map((item: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded p-3 text-left">
                  <div className="text-2xl font-medium text-gray-900 mb-1">{item.percentage}</div>
                  <div className="text-xs">{item.purpose}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">
              Focus on technology stack, "Zomato Market" grocery push, and building dark-kitchen network.
            </p>
          </div>
        )}

        {/* Peer Comparison */}
        {selectedSections.includes("peerComparison") && outputOptions.includePeerComparisons && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 flex items-center mb-3">
              <span className="mr-2">🔍</span> Peer Comparison
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                      Company
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                      EV (₹ Cr)
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                      Revenue (₹ Cr)
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                      EV/Rev
                    </th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                      P/S
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {companyData.peerComparison.map((peer: any, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm font-medium">{peer.company}</td>
                      <td className="px-4 py-2 text-sm text-left">{peer.ev}</td>
                      <td className="px-4 py-2 text-sm text-left">{peer.revenue}</td>
                      <td className="px-4 py-2 text-sm text-left">{peer.evRev}</td>
                      <td className="px-4 py-2 text-sm text-left">{peer.ps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">
              *Estimates based on latest funding rounds. Indian peers limited; global comps shown for context.
            </p>
          </div>
        )}

        {/* Valuation Summary */}
        {selectedSections.includes("valuationSummary") && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 flex items-center mb-3">
              <span className="mr-2">💹</span> Valuation Summary
            </h2>
            <div className="bg-red-50/30 rounded p-4">
              <ul className="space-y-2 text-sm">
                {companyData.valuationSummary.map((item: any, index: number) => (
                  <li key={index}>
                    <span className="font-semibold">{item.metric}:</span> {item.value}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-3 italic">
                Zomato trades at a discount to global peers—reflects market growth outlook + profitability trajectory.
              </p>
            </div>
          </div>
        )}

        {/* Key Risk Factors */}
        {selectedSections.includes("riskFactors") && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 flex items-center mb-3">
              <span className="mr-2">⚠️</span> Key Risk Factors
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {companyData.riskFactors.map((risk: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded p-3">
                  <div className="font-medium mb-1 text-sm">
                    {index + 1}. {risk.title}
                  </div>
                  <div className="text-xs text-gray-600">{risk.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IPO Timeline */}
        {selectedSections.includes("ipoTimeline") && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 flex items-center mb-3">
              <span className="mr-2">📅</span> IPO Timeline
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <tbody className="divide-y divide-gray-200 bg-white">
                  {companyData.ipoTimeline.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm font-medium">{item.event}</td>
                      <td className="px-4 py-2 text-sm text-left">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analyst Recommendation */}
        {selectedSections.includes("analystRecommendation") && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 flex items-center mb-3">
              <span className="mr-2">🔎</span> Analyst Recommendation
            </h2>
            <div className="bg-red-50/30 border border-red-100 rounded-lg p-4">
              <p className="text-sm mb-4">{companyData.analystRecommendation.comment}</p>

              <div className="flex justify-between items-end">
                <div className="text-xs text-gray-500">
                  Target Price: {companyData.analystRecommendation.targetPrice}
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < companyData.analystRecommendation.ratingScore ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 mt-8">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div>© 2023 Financial Research Group. All Rights Reserved.</div>
            <div>
              IPO Screening Report | {companyData.name} ({companyData.ticker})
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
          New Report
        </Button>
      </div>
    </div>
  )
}
