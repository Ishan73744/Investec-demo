"use client"

import { useState } from "react"
import { Calendar, BarChart3, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnalysisOptions {
  includeInfographics: boolean
  includeCharts: boolean
  includeDetailedAnalysis: boolean
  dateRange: {
    period: string
    quarters: number
  }
}

interface AnalysisOptionsSelectorProps {
  selectedOptions: AnalysisOptions
  onOptionsChange: (options: AnalysisOptions) => void
}

const dateRangeOptions = [
  { id: "1-year", label: "1 Year", quarters: 4, description: "Last 4 quarters" },
  { id: "2-years", label: "2 Years", quarters: 8, description: "Last 8 quarters" },
  { id: "3-years", label: "3 Years", quarters: 12, description: "Last 12 quarters" },
  { id: "5-years", label: "5 Years", quarters: 20, description: "Last 20 quarters" },
]

export function AnalysisOptionsSelector({ selectedOptions, onOptionsChange }: AnalysisOptionsSelectorProps) {
  const [localOptions, setLocalOptions] = useState<AnalysisOptions>(selectedOptions)

  const updateOption = (key: keyof AnalysisOptions, value: any) => {
    setLocalOptions((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleDateRangeSelect = (option: (typeof dateRangeOptions)[0]) => {
    updateOption("dateRange", {
      period: option.label.toLowerCase(),
      quarters: option.quarters,
    })
  }

  const handleContinue = () => {
    onOptionsChange(localOptions)
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-[#8098c4]">
        Customize your peer comparison analysis by selecting the level of detail and time period.
      </div>

      {/* Analysis Detail Level */}
      <div className="space-y-4">
        <h3 className="font-medium text-[#001742] flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Analysis Detail Level
        </h3>

        <div className="space-y-3">
          <div
            onClick={() => updateOption("includeInfographics", !localOptions.includeInfographics)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              localOptions.includeInfographics
                ? "border-[#004ce6] bg-[#f4f9ff]"
                : "border-[#e1e8f6] hover:border-[#8098c4]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3
                  className={`h-5 w-5 ${localOptions.includeInfographics ? "text-[#004ce6]" : "text-[#8098c4]"}`}
                />
                <div>
                  <div
                    className={`font-medium ${localOptions.includeInfographics ? "text-[#004ce6]" : "text-[#001742]"}`}
                  >
                    Include Infographics & Visual Charts
                  </div>
                  <div className="text-sm text-[#8098c4]">
                    Add visual charts, graphs, and infographic elements to the analysis
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded border-2 ${
                  localOptions.includeInfographics ? "bg-[#004ce6] border-[#004ce6]" : "border-[#8098c4]"
                }`}
              >
                {localOptions.includeInfographics && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            onClick={() => updateOption("includeCharts", !localOptions.includeCharts)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              localOptions.includeCharts ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#e1e8f6] hover:border-[#8098c4]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className={`h-5 w-5 ${localOptions.includeCharts ? "text-[#004ce6]" : "text-[#8098c4]"}`} />
                <div>
                  <div className={`font-medium ${localOptions.includeCharts ? "text-[#004ce6]" : "text-[#001742]"}`}>
                    Include Detailed Charts & Trends
                  </div>
                  <div className="text-sm text-[#8098c4]">
                    Add detailed trend analysis, historical charts, and metric comparisons
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded border-2 ${
                  localOptions.includeCharts ? "bg-[#004ce6] border-[#004ce6]" : "border-[#8098c4]"
                }`}
              >
                {localOptions.includeCharts && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            onClick={() => updateOption("includeDetailedAnalysis", !localOptions.includeDetailedAnalysis)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              localOptions.includeDetailedAnalysis
                ? "border-[#004ce6] bg-[#f4f9ff]"
                : "border-[#e1e8f6] hover:border-[#8098c4]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText
                  className={`h-5 w-5 ${localOptions.includeDetailedAnalysis ? "text-[#004ce6]" : "text-[#8098c4]"}`}
                />
                <div>
                  <div
                    className={`font-medium ${localOptions.includeDetailedAnalysis ? "text-[#004ce6]" : "text-[#001742]"}`}
                  >
                    Include Detailed Written Analysis
                  </div>
                  <div className="text-sm text-[#8098c4]">
                    Add comprehensive written insights, recommendations, and strategic analysis
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded border-2 ${
                  localOptions.includeDetailedAnalysis ? "bg-[#004ce6] border-[#004ce6]" : "border-[#8098c4]"
                }`}
              >
                {localOptions.includeDetailedAnalysis && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Selection */}
      <div className="space-y-4">
        <h3 className="font-medium text-[#001742] flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Analysis Time Period
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {dateRangeOptions.map((option) => {
            const isSelected = localOptions.dateRange.quarters === option.quarters
            return (
              <div
                key={option.id}
                onClick={() => handleDateRangeSelect(option)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#e1e8f6] hover:border-[#8098c4]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className={`h-4 w-4 ${isSelected ? "text-[#004ce6]" : "text-[#8098c4]"}`} />
                  <div>
                    <div className={`font-medium ${isSelected ? "text-[#004ce6]" : "text-[#001742]"}`}>
                      {option.label}
                    </div>
                    <div className="text-sm text-[#8098c4]">{option.description}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 bg-[#f8fafc] border border-[#e1e8f6] rounded-lg">
        <div className="text-sm text-[#001742] font-medium mb-2">Analysis Summary</div>
        <div className="text-sm text-[#8098c4] space-y-1">
          <div>
            • Time Period: {localOptions.dateRange.period} ({localOptions.dateRange.quarters} quarters)
          </div>
          <div>• Visual Elements: {localOptions.includeInfographics ? "Included" : "Not included"}</div>
          <div>• Detailed Charts: {localOptions.includeCharts ? "Included" : "Not included"}</div>
          <div>• Written Analysis: {localOptions.includeDetailedAnalysis ? "Included" : "Not included"}</div>
        </div>
      </div>

      <Button onClick={handleContinue} className="w-full bg-[#004ce6] hover:bg-[#0041cc] text-white">
        Generate Peer Comparison Analysis
      </Button>
    </div>
  )
}
