"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ClickableCheckbox } from "./clickable-checkbox"

interface SectionSelectorProps {
  onSubmit: (sections: string[], detailLevel: "high" | "detailed") => void
}

export function SectionSelector({ onSubmit }: SectionSelectorProps) {
  const [sections, setSections] = useState<string[]>([
    "executiveSummary",
    "offeringDetails",
    "financialHighlights",
    "useOfProceeds",
    "peerComparison",
    "valuationSummary",
    "riskFactors",
    "ipoTimeline",
    "analystRecommendation",
  ])

  const [detailLevel, setDetailLevel] = useState<"high" | "detailed">("high")
  const [error, setError] = useState("")

  const availableSections = [
    { id: "executiveSummary", label: "Executive Summary" },
    { id: "offeringDetails", label: "Offering Details" },
    { id: "financialHighlights", label: "Financial Highlights" },
    { id: "useOfProceeds", label: "Use of Proceeds" },
    { id: "peerComparison", label: "Peer Comparison" },
    { id: "valuationSummary", label: "Valuation Summary" },
    { id: "riskFactors", label: "Risk Factors" },
    { id: "ipoTimeline", label: "IPO Timeline" },
    { id: "analystRecommendation", label: "Analyst Recommendation" },
  ]

  const handleSectionToggle = (sectionId: string, checked: boolean) => {
    if (checked) {
      setSections([...sections, sectionId])
    } else {
      setSections(sections.filter((id) => id !== sectionId))
    }
    setError("")
  }

  const handleSubmit = () => {
    if (sections.length === 0) {
      setError("Please select at least one section")
      return
    }

    onSubmit(sections, detailLevel)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#001742]">Select report sections:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableSections.map((section) => (
            <ClickableCheckbox
              key={section.id}
              id={`section-${section.id}`}
              label={section.label}
              checked={sections.includes(section.id)}
              onChange={(checked) => handleSectionToggle(section.id, checked)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#001742]">Detail level:</h3>
        <RadioGroup value={detailLevel} onValueChange={(value: "high" | "detailed") => setDetailLevel(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="detail-high" className="border-[#dee6f5] text-[#004ce6]" />
            <Label htmlFor="detail-high" className="text-sm text-[#001742]">
              High-Level (Executive summary with key metrics)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="detailed" id="detail-detailed" className="border-[#dee6f5] text-[#004ce6]" />
            <Label htmlFor="detail-detailed" className="text-sm text-[#001742]">
              Line-by-Line (Detailed analysis with comprehensive metrics)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        onClick={handleSubmit}
        className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
      >
        Continue
      </Button>
    </div>
  )
}
