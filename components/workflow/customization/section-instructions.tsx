"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Info } from "lucide-react"

interface SectionInstructionsProps {
  sections: Array<{ id: string; title: string; description?: string }>
  instructions: Record<string, string>
  onUpdateInstructions: (instructions: Record<string, string>) => void
  onSubmit: (instructions: Record<string, string>) => void
}

export function SectionInstructions({
  sections,
  instructions,
  onUpdateInstructions,
  onSubmit,
}: SectionInstructionsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([sections[0]?.id || ""])

  // Handle instruction update
  const updateInstruction = (id: string, value: string) => {
    onUpdateInstructions({
      ...instructions,
      [id]: value,
    })
  }

  // Generate example instruction based on section title
  const getExampleInstruction = (title: string) => {
    const examples: Record<string, string> = {
      "Executive Summary": "Summarize key outcomes and strategic goals.",
      "Market Overview": "Focus on market growth trends and regional opportunities.",
      "Financial Analysis": "Highlight profitability metrics and market share data.",
      "Risk Factors": "Highlight major risks for investors.",
      "Growth Opportunities": "Emphasize emerging markets and potential expansion areas.",
      "Key Performance Indicators (KPIs)": "Include only financial KPIs with YoY comparisons.",
      Conclusion: "Summarize the main findings and provide forward-looking statements.",
    }

    return examples[title] || "Provide specific focus areas or highlight key information from this section."
  }

  // Handle accordion state
  const toggleAccordion = (id: string) => {
    setExpandedSections((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#001742]">Section Instructions</h3>
        <p className="text-sm text-[#4e5971]">
          Provide specific instructions for each section to customize your summary. Focus on key takeaways, trends, or
          highlight specific insights.
        </p>

        <div className="bg-[#f4f9ff] border border-[#dee6f5] rounded-md p-3 flex items-start gap-3 text-sm">
          <Info className="h-5 w-5 text-[#004ce6] flex-shrink-0 mt-0.5" />
          <div className="text-[#4e5971]">
            <p className="font-medium text-[#001742] mb-1">Instruction Tips</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Be specific about what information you want to highlight</li>
              <li>Mention any metrics or data points that are particularly important</li>
              <li>Indicate if you want comparative analysis (e.g., year-over-year changes)</li>
            </ul>
          </div>
        </div>

        <Accordion
          type="multiple"
          value={expandedSections}
          className="border rounded-md border-[#e1e8f6] divide-y divide-[#e1e8f6]"
        >
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id} className="border-none">
              <AccordionTrigger
                onClick={() => toggleAccordion(section.id)}
                className="px-4 py-3 hover:bg-[#f4f9ff] hover:no-underline"
              >
                <span className="text-[#001742] font-medium">{section.title}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <Textarea
                  placeholder={getExampleInstruction(section.title)}
                  value={instructions[section.id] || ""}
                  onChange={(e) => updateInstruction(section.id, e.target.value)}
                  className="min-h-[100px] border-[#e1e8f6] text-[#4e5971]"
                />
                <div className="mt-2 text-xs text-[#6e7b96] italic">
                  Example: {getExampleInstruction(section.title)}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => onSubmit(instructions)} className="bg-[#004ce6] hover:bg-[#0047cb] text-white px-6">
          Continue
        </Button>
      </div>
    </div>
  )
}
