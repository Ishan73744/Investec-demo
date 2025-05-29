"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, FileSearch, FileDigit } from "lucide-react"

interface SummaryDepthSelectorProps {
  depth: "light" | "medium" | "deep"
  onUpdateDepth: (depth: "light" | "medium" | "deep") => void
  options: {
    includeKeyQuotes?: boolean
    includeVisualElements?: boolean
  }
  onUpdateOptions: (options: {
    includeKeyQuotes?: boolean
    includeVisualElements?: boolean
  }) => void
  onSubmit: (depth: "light" | "medium" | "deep") => void
}

export function SummaryDepthSelector({
  depth,
  onUpdateDepth,
  options,
  onUpdateOptions,
  onSubmit,
}: SummaryDepthSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#001742]">Summary Depth</h3>
        <p className="text-sm text-[#4e5971]">
          Choose how detailed you want your summary to be. This will determine the level of information included in each
          section.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Light Option */}
          <Card
            className={`border cursor-pointer ${
              depth === "light" ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#e1e8f6]"
            }`}
            onClick={() => onUpdateDepth("light")}
          >
            <div className="p-4 flex flex-col items-center text-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center mb-3 ${
                  depth === "light" ? "bg-[#004ce6]" : "bg-[#f4f9ff]"
                }`}
              >
                <FileText className={`h-5 w-5 ${depth === "light" ? "text-white" : "text-[#004ce6]"}`} />
              </div>
              <h4 className={`font-medium mb-2 ${depth === "light" ? "text-[#001742]" : "text-[#4e5971]"}`}>Light</h4>
              <p className="text-xs text-[#6e7b96]">Key takeaways and high-level insights</p>
            </div>
          </Card>

          {/* Medium Option */}
          <Card
            className={`border cursor-pointer ${
              depth === "medium" ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#e1e8f6]"
            }`}
            onClick={() => onUpdateDepth("medium")}
          >
            <div className="p-4 flex flex-col items-center text-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center mb-3 ${
                  depth === "medium" ? "bg-[#004ce6]" : "bg-[#f4f9ff]"
                }`}
              >
                <FileSearch className={`h-5 w-5 ${depth === "medium" ? "text-white" : "text-[#004ce6]"}`} />
              </div>
              <h4 className={`font-medium mb-2 ${depth === "medium" ? "text-[#001742]" : "text-[#4e5971]"}`}>Medium</h4>
              <p className="text-xs text-[#6e7b96]">Key insights with further elaboration on core concepts</p>
            </div>
          </Card>

          {/* Deep Option */}
          <Card
            className={`border cursor-pointer ${
              depth === "deep" ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#e1e8f6]"
            }`}
            onClick={() => onUpdateDepth("deep")}
          >
            <div className="p-4 flex flex-col items-center text-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center mb-3 ${
                  depth === "deep" ? "bg-[#004ce6]" : "bg-[#f4f9ff]"
                }`}
              >
                <FileDigit className={`h-5 w-5 ${depth === "deep" ? "text-white" : "text-[#004ce6]"}`} />
              </div>
              <h4 className={`font-medium mb-2 ${depth === "deep" ? "text-[#001742]" : "text-[#4e5971]"}`}>Deep</h4>
              <p className="text-xs text-[#6e7b96]">Detailed summary with in-depth analysis of all sections</p>
            </div>
          </Card>
        </div>

        <div className="pt-4 space-y-3">
          <h4 className="text-sm font-medium text-[#001742]">Additional Options</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="key-quotes"
                checked={options.includeKeyQuotes}
                onCheckedChange={(checked) => onUpdateOptions({ ...options, includeKeyQuotes: checked as boolean })}
              />
              <label
                htmlFor="key-quotes"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#4e5971]"
              >
                Include key quotes from the documents
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => onSubmit(depth)} className="bg-[#004ce6] hover:bg-[#0047cb] text-white px-6">
          Generate Summary
        </Button>
      </div>
    </div>
  )
}
