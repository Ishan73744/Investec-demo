"use client"

import { Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Chart } from "@/components/workflow/chart-component"
import type { MarketData } from "@/lib/workflow/types"

interface MarketReportProps {
  marketData: MarketData
  selectedCharts: {
    marketGrowth: boolean
    marketShare: boolean
    retentionRate: boolean
  }
  onRestart: () => void
}

export function MarketReport({ marketData, selectedCharts, onRestart }: MarketReportProps) {
  console.log("MarketReport rendering with data:", marketData)
  console.log("Selected charts:", selectedCharts)

  // Ensure we have valid data to display
  if (!marketData) {
    console.error("No market data provided to MarketReport component")
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md">
        <p className="text-red-600">Error: No market data available for this report.</p>
        <Button onClick={onRestart} className="mt-4">
          Restart Analysis
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="border-[#e1e8f6]">
        <CardContent className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#001742]">
              {marketData.title || "Quick Commerce Market Segmentation Report"}
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-md bg-[#f4f9ff] p-3">
                <div className="text-sm font-medium text-[#001742]">Market Size (2024)</div>
                <div className="text-lg font-semibold text-[#001742]">{marketData.marketSize || "N/A"}</div>
              </div>
              <div className="rounded-md bg-[#f4f9ff] p-3">
                <div className="text-sm font-medium text-[#001742]">CAGR</div>
                <div className="text-lg font-semibold text-[#001742]">{marketData.cagr || "N/A"}</div>
              </div>
            </div>

            <div className="whitespace-pre-line text-[#001742]">{marketData.summary || "No summary available."}</div>

            <div className="space-y-4 mt-4">
              {selectedCharts.marketGrowth && marketData.charts && marketData.charts[0] && (
                <div className="rounded-md border border-[#e1e8f6] p-4 bg-white">
                  <div className="h-[220px]">
                    <Chart
                      type={marketData.charts[0].type}
                      title={marketData.charts[0].title}
                      data={marketData.charts[0].data}
                    />
                  </div>
                </div>
              )}

              {selectedCharts.marketShare && marketData.charts && marketData.charts[1] && (
                <div className="rounded-md border border-[#e1e8f6] p-4 bg-white">
                  <div className="h-[220px]">
                    <Chart
                      type={marketData.charts[1].type}
                      title={marketData.charts[1].title}
                      data={marketData.charts[1].data}
                    />
                  </div>
                </div>
              )}

              {selectedCharts.retentionRate && marketData.charts && marketData.charts[2] && (
                <div className="rounded-md border border-[#e1e8f6] p-4 bg-white">
                  <div className="h-[220px]">
                    <Chart
                      type={marketData.charts[2].type}
                      title={marketData.charts[2].title}
                      data={marketData.charts[2].data}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="mb-2 font-medium text-[#001742]">Key Takeaways:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2 text-sm text-[#001742]">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Sector CAGR: {marketData.cagr || "N/A"}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#001742]">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Leading Players: Zepto, Blinkit, Swiggy Instamart</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#001742]">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>
                    Risks:{" "}
                    {marketData.risks && marketData.risks.length > 0
                      ? marketData.risks.join(", ")
                      : "Various market risks"}
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#001742]">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Opportunity: Private labels, subscription models</span>
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse rounded-md border border-[#e1e8f6]">
                <thead>
                  <tr className="bg-[#f4f7ff]">
                    <th className="border-b border-[#e1e8f6] p-3 text-left text-sm font-medium text-[#001742]">
                      Metric
                    </th>
                    <th className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]">
                      Industry Avg
                    </th>
                    <th className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]">
                      Market Leaders
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.benchmarks && marketData.benchmarks.length > 0 ? (
                    marketData.benchmarks.map((benchmark, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#f9fafc]"}>
                        <td className="border-b border-[#e1e8f6] p-3 text-sm text-[#001742]">{benchmark.metric}</td>
                        <td className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]">
                          {benchmark.industry}
                        </td>
                        <td className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]">
                          {benchmark.market}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="border-b border-[#e1e8f6] p-3 text-sm text-center text-[#6e7b96]">
                        No benchmark data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button size="sm" className="gap-2 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto">
          <Download className="h-4 w-4" />
          Download as PDF
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6] px-4 py-1.5 h-auto"
          onClick={onRestart}
        >
          <RefreshCw className="h-4 w-4" />
          Restart Workflow
        </Button>
      </div>
    </div>
  )
}
