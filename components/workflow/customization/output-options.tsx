"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ClickableCheckbox } from "./clickable-checkbox"

interface OutputOptionsProps {
  onSubmit: (options: {
    includePeerComparisons: boolean
    includeIndustryBenchmarks: boolean
    includeRecentDeals: boolean
    additionalNotes: string
  }) => void
}

export function OutputOptions({ onSubmit }: OutputOptionsProps) {
  const [options, setOptions] = useState({
    includePeerComparisons: true,
    includeIndustryBenchmarks: false,
    includeRecentDeals: false,
    additionalNotes: "",
  })

  const handleOptionChange = (option: string, checked: boolean) => {
    setOptions({
      ...options,
      [option]: checked,
    })
  }

  const handleSubmit = () => {
    onSubmit(options)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#001742]">Additional options:</h3>
        <div className="space-y-3">
          <ClickableCheckbox
            id="peer-comparisons"
            label="Include peer IPO comparables"
            checked={options.includePeerComparisons}
            onChange={(checked) => handleOptionChange("includePeerComparisons", checked)}
          />
          <ClickableCheckbox
            id="industry-benchmarks"
            label="Include industry benchmarks"
            checked={options.includeIndustryBenchmarks}
            onChange={(checked) => handleOptionChange("includeIndustryBenchmarks", checked)}
          />
          <ClickableCheckbox
            id="recent-deals"
            label="Include recent similar deals"
            checked={options.includeRecentDeals}
            onChange={(checked) => handleOptionChange("includeRecentDeals", checked)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional-notes" className="text-sm font-medium text-[#001742]">
          Additional notes or specific areas of interest:
        </Label>
        <Textarea
          id="additional-notes"
          placeholder="E.g., Focus on growth strategy, competitive landscape, etc."
          value={options.additionalNotes}
          onChange={(e) => setOptions({ ...options, additionalNotes: e.target.value })}
          className="border-[#dee6f5] focus-visible:ring-[#004ce6] min-h-[80px]"
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
      >
        Generate Report
      </Button>
    </div>
  )
}
