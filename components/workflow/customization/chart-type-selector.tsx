"use client"

import { useState } from "react"
import { BarChart, LineChart, PieChart, AreaChart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChartTypeSelectorProps {
  onSelect: (chartType: string) => void
  detectedType: string
}

export function ChartTypeSelector({ onSelect, detectedType }: ChartTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<string>(detectedType)

  const chartTypes = [
    { id: "bar", name: "Bar Chart", icon: BarChart },
    { id: "line", name: "Line Chart", icon: LineChart },
    { id: "pie", name: "Pie Chart", icon: PieChart },
    { id: "area", name: "Area Chart", icon: AreaChart },
  ]

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
  }

  const handleContinue = () => {
    onSelect(selectedType)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#4e5971]">
        I've detected a <span className="font-medium">{detectedType} chart</span> in your screenshot. Please confirm or
        select a different chart type:
      </p>

      <div className="grid grid-cols-2 gap-3">
        {chartTypes.map((type) => {
          const Icon = type.icon
          return (
            <div
              key={type.id}
              className={`flex flex-col items-center justify-center rounded-lg border p-4 cursor-pointer transition-colors ${
                selectedType === type.id ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#dee6f5] hover:bg-[#f9fafc]"
              }`}
              onClick={() => handleTypeSelect(type.id)}
            >
              <Icon className={`h-8 w-8 mb-2 ${selectedType === type.id ? "text-[#004ce6]" : "text-[#8098c4]"}`} />
              <span className="text-sm font-medium text-[#001742]">{type.name}</span>
            </div>
          )
        })}
      </div>

      <Button
        onClick={handleContinue}
        className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
      >
        Continue
      </Button>
    </div>
  )
}
