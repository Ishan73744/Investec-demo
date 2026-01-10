"use client"

import { useState } from "react"
import { Check, TrendingUp, DollarSign, BarChart3, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComparisonMetricsSelectorProps {
  selectedMetrics: string[]
  onMetricsChange: (metrics: string[]) => void
}

const metricCategories = [
  {
    category: "Financial Performance",
    icon: DollarSign,
    metrics: [
      { id: "revenue-growth", name: "Revenue Growth", description: "Year-over-year revenue growth rate" },
      { id: "profit-margins", name: "Profit Margins", description: "Net profit margin and EBITDA margin" },
      { id: "roe", name: "Return on Equity (ROE)", description: "Efficiency in generating profits from equity" },
      { id: "roa", name: "Return on Assets (ROA)", description: "Efficiency in using assets to generate profit" },
    ],
  },
  {
    category: "Financial Health",
    icon: BarChart3,
    metrics: [
      { id: "debt-equity", name: "Debt-to-Equity", description: "Financial leverage and debt management" },
      { id: "current-ratio", name: "Current Ratio", description: "Short-term liquidity position" },
      { id: "interest-coverage", name: "Interest Coverage", description: "Ability to pay interest on debt" },
      { id: "cash-flow", name: "Free Cash Flow", description: "Cash generation after capital expenditures" },
    ],
  },
  {
    category: "Market Valuation",
    icon: TrendingUp,
    metrics: [
      { id: "pe-ratio", name: "P/E Ratio", description: "Price-to-earnings valuation multiple" },
      { id: "pb-ratio", name: "P/B Ratio", description: "Price-to-book value ratio" },
      { id: "market-cap", name: "Market Capitalization", description: "Total market value of shares" },
      { id: "ev-ebitda", name: "EV/EBITDA", description: "Enterprise value to EBITDA multiple" },
    ],
  },
  {
    category: "Operational Efficiency",
    icon: PieChart,
    metrics: [
      { id: "asset-turnover", name: "Asset Turnover", description: "Efficiency in using assets to generate sales" },
      { id: "inventory-turnover", name: "Inventory Turnover", description: "How quickly inventory is sold" },
      {
        id: "working-capital",
        name: "Working Capital Management",
        description: "Efficiency in managing working capital",
      },
      { id: "employee-productivity", name: "Revenue per Employee", description: "Employee productivity measure" },
    ],
  },
]

export function ComparisonMetricsSelector({ selectedMetrics, onMetricsChange }: ComparisonMetricsSelectorProps) {
  const [localSelectedMetrics, setLocalSelectedMetrics] = useState<string[]>(selectedMetrics)

  const toggleMetric = (metricName: string) => {
    const isSelected = localSelectedMetrics.includes(metricName)
    if (isSelected) {
      setLocalSelectedMetrics(localSelectedMetrics.filter((m) => m !== metricName))
    } else {
      setLocalSelectedMetrics([...localSelectedMetrics, metricName])
    }
  }

  const handleContinue = () => {
    onMetricsChange(localSelectedMetrics)
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-[#8098c4]">
        Select the metrics you'd like to compare across all companies. Choose at least 3 metrics for a comprehensive
        analysis.
      </div>

      {metricCategories.map((category) => {
        const CategoryIcon = category.icon
        return (
          <div key={category.category} className="space-y-3">
            <div className="flex items-center gap-2">
              <CategoryIcon className="h-4 w-4 text-[#004ce6]" />
              <h3 className="font-medium text-[#001742]">{category.category}</h3>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {category.metrics.map((metric) => {
                const isSelected = localSelectedMetrics.includes(metric.name)
                return (
                  <div
                    key={metric.id}
                    onClick={() => toggleMetric(metric.name)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      isSelected ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#e1e8f6] hover:border-[#8098c4]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-[#001742]">{metric.name}</div>
                        <div className="text-sm text-[#8098c4]">{metric.description}</div>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-[#004ce6] ml-2" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className="flex items-center justify-between pt-4 border-t border-[#e1e8f6]">
        <div className="text-sm text-[#8098c4]">
          {localSelectedMetrics.length} metric{localSelectedMetrics.length !== 1 ? "s" : ""} selected
        </div>
        <Button
          onClick={handleContinue}
          disabled={localSelectedMetrics.length < 3}
          className="bg-[#004ce6] hover:bg-[#0041cc] text-white"
        >
          Continue with Selected Metrics
        </Button>
      </div>
    </div>
  )
}
