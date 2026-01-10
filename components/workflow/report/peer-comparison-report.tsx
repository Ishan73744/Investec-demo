"use client"

import { Download, Copy, ExternalLink, RotateCcw, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Company {
  id: string
  name: string
  sector: string
  marketCap: string
}

interface TimePeriod {
  period: string
  quarters: number
}

interface PeerComparisonReportProps {
  primaryCompany: Company
  peerCompanies: Company[]
  selectedMetrics: string[]
  timePeriod: TimePeriod
  onRestart: () => void
}

// Sample data for demonstration
const sampleMetricsData = {
  "Revenue Growth": {
    "Aarti Drugs Limited": { value: 4.2, trend: "up", rank: 3 },
    "Sun Pharmaceutical Industries": { value: 10.8, trend: "up", rank: 1 },
    "Cipla Limited": { value: 6.4, trend: "up", rank: 2 },
  },
  "Profit Margins": {
    "Aarti Drugs Limited": { value: 6.98, trend: "up", rank: 3 },
    "Sun Pharmaceutical Industries": { value: 19.58, trend: "up", rank: 1 },
    "Cipla Limited": { value: 13.75, trend: "up", rank: 2 },
  },
  ROE: {
    "Aarti Drugs Limited": { value: 15.2, trend: "up", rank: 2 },
    "Sun Pharmaceutical Industries": { value: 18.4, trend: "up", rank: 1 },
    "Cipla Limited": { value: 14.8, trend: "stable", rank: 3 },
  },
  "Debt-to-Equity": {
    "Aarti Drugs Limited": { value: 0.46, trend: "down", rank: 2 },
    "Sun Pharmaceutical Industries": { value: 0.12, trend: "down", rank: 1 },
    "Cipla Limited": { value: 0.08, trend: "down", rank: 3 },
  },
}

export function PeerComparisonReport({
  primaryCompany,
  peerCompanies,
  selectedMetrics,
  timePeriod,
  onRestart,
}: PeerComparisonReportProps) {
  const allCompanies = [primaryCompany, ...peerCompanies]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-600" />
      default:
        return <Minus className="h-3 w-3 text-gray-400" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-green-600 bg-green-50"
      case 2:
        return "text-blue-600 bg-blue-50"
      case 3:
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#001742]">Peer Comparison Analysis</h2>
          <p className="text-sm text-[#8098c4]">
            {primaryCompany.name} vs {peerCompanies.length} peers • {timePeriod.period} analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Viewer
          </Button>
          <Button variant="outline" size="sm" onClick={onRestart}>
            <RotateCcw className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#001742]">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-[#4e5971]">
              <strong>{primaryCompany.name}</strong> shows mixed performance compared to its pharmaceutical peers. The
              company ranks in the middle tier across most financial metrics, with opportunities for improvement in
              revenue growth and profit margins.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">Strengths</div>
                <div className="text-sm text-green-600">
                  • Stable debt management
                  <br />• Consistent ROE performance
                  <br />• Strong operational efficiency
                </div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-sm font-medium text-orange-800">Areas for Improvement</div>
                <div className="text-sm text-orange-600">
                  • Revenue growth acceleration
                  <br />• Profit margin optimization
                  <br />• Market share expansion
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#001742]">Metrics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {selectedMetrics.map((metric) => {
              const metricData = sampleMetricsData[metric as keyof typeof sampleMetricsData]
              if (!metricData) return null

              return (
                <div key={metric} className="space-y-3">
                  <h4 className="font-medium text-[#001742]">{metric}</h4>
                  <div className="space-y-2">
                    {allCompanies.map((company) => {
                      const data = metricData[company.name as keyof typeof metricData]
                      if (!data) return null

                      const isPrimary = company.id === primaryCompany.id

                      return (
                        <div
                          key={company.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            isPrimary ? "bg-[#f4f9ff] border border-[#004ce6]" : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`px-2 py-1 rounded text-xs font-medium ${getRankColor(data.rank)}`}>
                              #{data.rank}
                            </div>
                            <div>
                              <div className={`font-medium ${isPrimary ? "text-[#004ce6]" : "text-[#001742]"}`}>
                                {company.name}
                              </div>
                              {isPrimary && <div className="text-xs text-[#004ce6]">Primary Company</div>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#001742]">{data.value}%</span>
                            {getTrendIcon(data.trend)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#001742]">Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
              <div className="font-medium text-blue-800 mb-1">Market Position</div>
              <div className="text-sm text-blue-700">
                {primaryCompany.name} maintains a stable position in the pharmaceutical sector but lags behind industry
                leaders in growth metrics. Focus on R&D investments and market expansion could improve competitive
                standing.
              </div>
            </div>

            <div className="p-4 bg-green-50 border-l-4 border-green-400">
              <div className="font-medium text-green-800 mb-1">Financial Health</div>
              <div className="text-sm text-green-700">
                Strong debt management and consistent profitability indicate solid financial fundamentals. The company
                is well-positioned to invest in growth initiatives.
              </div>
            </div>

            <div className="p-4 bg-orange-50 border-l-4 border-orange-400">
              <div className="font-medium text-orange-800 mb-1">Growth Opportunities</div>
              <div className="text-sm text-orange-700">
                Consider strategic acquisitions, international expansion, and product portfolio diversification to
                accelerate revenue growth and improve market position.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
