"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TimePeriod {
  period: string
  quarters: number
}

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod
  onPeriodChange: (period: TimePeriod) => void
}

const timePeriodOptions = [
  { id: "1-year", label: "1 Year", quarters: 4, description: "Last 4 quarters" },
  { id: "2-years", label: "2 Years", quarters: 8, description: "Last 8 quarters" },
  { id: "3-years", label: "3 Years", quarters: 12, description: "Last 12 quarters" },
  { id: "5-years", label: "5 Years", quarters: 20, description: "Last 20 quarters" },
]

export function TimePeriodSelector({ selectedPeriod, onPeriodChange }: TimePeriodSelectorProps) {
  const [localSelectedPeriod, setLocalSelectedPeriod] = useState<TimePeriod>(selectedPeriod)

  const handlePeriodSelect = (option: (typeof timePeriodOptions)[0]) => {
    setLocalSelectedPeriod({
      period: option.label.toLowerCase(),
      quarters: option.quarters,
    })
  }

  const handleContinue = () => {
    onPeriodChange(localSelectedPeriod)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[#001742]">
        <Calendar className="h-4 w-4" />
        <span className="font-medium">Select Analysis Time Period</span>
      </div>

      <div className="text-sm text-[#8098c4]">
        Choose the time period for the peer comparison analysis. Longer periods provide more comprehensive trends.
      </div>

      <div className="grid grid-cols-2 gap-3">
        {timePeriodOptions.map((option) => {
          const isSelected = localSelectedPeriod.quarters === option.quarters
          return (
            <div
              key={option.id}
              onClick={() => handlePeriodSelect(option)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                isSelected ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#e1e8f6] hover:border-[#8098c4]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className={`h-4 w-4 ${isSelected ? "text-[#004ce6]" : "text-[#8098c4]"}`} />
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

      <div className="p-4 bg-[#f8fafc] border border-[#e1e8f6] rounded-lg">
        <div className="text-sm text-[#001742] font-medium mb-1">Selected Period</div>
        <div className="text-sm text-[#8098c4]">
          Analysis will cover the last {localSelectedPeriod.quarters} quarters ({localSelectedPeriod.period})
        </div>
      </div>

      <Button onClick={handleContinue} className="w-full bg-[#004ce6] hover:bg-[#0041cc] text-white">
        Generate Peer Comparison Analysis
      </Button>
    </div>
  )
}
