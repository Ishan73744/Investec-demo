"use client"

import type React from "react"
import { useState } from "react"
import { Check } from "lucide-react"

interface MetricsSelectorProps {
  defaultMetrics?: string[]
  onSelect: (metrics: string[]) => void
}

export function MetricsSelector({ defaultMetrics = [], onSelect }: MetricsSelectorProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(defaultMetrics)
  const [customMetric, setCustomMetric] = useState("")

  const availableMetrics = [
    "Units Sold",
    "Collections (₹ Cr)",
    "Net Debt / EBITDA",
    "Management Commentary",
    "Revenue",
    "EBITDA",
    "PAT",
    "EPS",
    "Debt",
    "Cash & Equivalents",
  ]

  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric))
    } else {
      setSelectedMetrics([...selectedMetrics, metric])
    }
  }

  const addCustomMetric = () => {
    if (customMetric.trim() !== "" && !selectedMetrics.includes(customMetric.trim())) {
      setSelectedMetrics([...selectedMetrics, customMetric.trim()])
      setCustomMetric("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addCustomMetric()
    }
  }

  const handleContinue = () => {
    if (selectedMetrics.length > 0) {
      onSelect(selectedMetrics)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {availableMetrics.map((metric) => (
          <div
            key={metric}
            onClick={() => toggleMetric(metric)}
            className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer ${
              selectedMetrics.includes(metric) ? "border-[#004ce6] bg-[#f0f4fa]" : "border-[#dee6f5] bg-white"
            } transition-colors`}
          >
            <div
              className={`flex items-center justify-center h-5 w-5 rounded-md ${
                selectedMetrics.includes(metric) ? "bg-[#004ce6]" : "border border-[#dee6f5]"
              }`}
            >
              {selectedMetrics.includes(metric) && <Check className="h-3 w-3 text-white" />}
            </div>
            <span className="text-sm">{metric}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={customMetric}
          onChange={(e) => setCustomMetric(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add custom metric..."
          className="flex-1 px-3 py-2 border border-[#dee6f5] rounded-md text-sm outline-none focus:border-[#004ce6]"
        />
        <button
          onClick={addCustomMetric}
          disabled={customMetric.trim() === ""}
          className="px-4 py-2 bg-[#f0f4fa] text-[#4e5971] rounded-md hover:bg-[#e6edf9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>

      <button
        onClick={handleContinue}
        disabled={selectedMetrics.length === 0}
        className="continue-button px-4 py-2 bg-[#004ce6] text-white rounded-md hover:bg-[#003bb2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  )
}
