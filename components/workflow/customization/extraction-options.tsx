"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, FilesIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ExtractionOptionsProps {
  onSelect: (option: "single" | "separate", statementTypes: string[]) => void
}

export function ExtractionOptions({ onSelect }: ExtractionOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<"single" | "separate" | null>(null)
  const [statementTypes, setStatementTypes] = useState<string[]>(["consolidated"])

  const handleOptionSelect = (option: "single" | "separate") => {
    setSelectedOption(option)
  }

  const handleStatementTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setStatementTypes([...statementTypes, type])
    } else {
      // Only allow unchecking if there will still be at least one option selected
      if (statementTypes.length > 1) {
        setStatementTypes(statementTypes.filter((t) => t !== type))
      }
    }
  }

  const handleContinue = () => {
    if (selectedOption) {
      onSelect(selectedOption, statementTypes)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[#001742]">Statement Type:</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="consolidated"
              checked={statementTypes.includes("consolidated")}
              onCheckedChange={(checked) => handleStatementTypeChange("consolidated", checked === true)}
              className="border-[#dee6f5] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
            />
            <Label htmlFor="consolidated" className="text-sm text-[#001742]">
              Consolidated
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="standalone"
              checked={statementTypes.includes("standalone")}
              onCheckedChange={(checked) => handleStatementTypeChange("standalone", checked === true)}
              className="border-[#dee6f5] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
            />
            <Label htmlFor="standalone" className="text-sm text-[#001742]">
              Standalone
            </Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`flex flex-col items-center justify-center rounded-lg border p-4 cursor-pointer transition-colors ${
            selectedOption === "single" ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#dee6f5] hover:bg-[#f9fafc]"
          }`}
          onClick={() => handleOptionSelect("single")}
        >
          <FileSpreadsheet
            className={`h-10 w-10 mb-2 ${selectedOption === "single" ? "text-[#004ce6]" : "text-[#8098c4]"}`}
          />
          <h3 className="text-sm font-medium text-[#001742]">Single Excel File</h3>
          <p className="text-xs text-center text-[#6e7b96] mt-1">All statements in one file with multiple sheets</p>
        </div>

        <div
          className={`flex flex-col items-center justify-center rounded-lg border p-4 cursor-pointer transition-colors ${
            selectedOption === "separate" ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#dee6f5] hover:bg-[#f9fafc]"
          }`}
          onClick={() => handleOptionSelect("separate")}
        >
          <FilesIcon
            className={`h-10 w-10 mb-2 ${selectedOption === "separate" ? "text-[#004ce6]" : "text-[#8098c4]"}`}
          />
          <h3 className="text-sm font-medium text-[#001742]">Separate Excel Files</h3>
          <p className="text-xs text-center text-[#6e7b96] mt-1">Each statement as a separate Excel file</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Statement Type:</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={true}
              onChange={() => {}}
              className="h-4 w-4 rounded border-gray-300 text-[#004ce6] focus:ring-[#004ce6]"
            />
            <span>Consolidated</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={false}
              onChange={() => {}}
              className="h-4 w-4 rounded border-gray-300 text-[#004ce6] focus:ring-[#004ce6]"
            />
            <span>Standalone</span>
          </label>
        </div>
      </div>

      <div className="mt-4">
        <Button
          onClick={handleContinue}
          disabled={!selectedOption}
          className={`mt-4 px-4 py-1.5 h-auto text-sm ${
            selectedOption
              ? "bg-[#004ce6] hover:bg-[#0047cb] text-white"
              : "bg-[#f4f7ff] text-[#8098c4] cursor-not-allowed"
          }`}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
