"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ChartCustomizationProps {
  options: {
    includeDataTable: boolean
    applyColorScheme: string
    addTrendlines: boolean
  }
  onSubmit: (options: {
    includeDataTable: boolean
    applyColorScheme: string
    addTrendlines: boolean
  }) => void
}

export function ChartCustomization({ options, onSubmit }: ChartCustomizationProps) {
  const [customOptions, setCustomOptions] = useState(options)

  const handleOptionChange = (option: string, value: any) => {
    setCustomOptions({
      ...customOptions,
      [option]: value,
    })
  }

  const handleSubmit = () => {
    onSubmit(customOptions)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="include-data-table"
            checked={customOptions.includeDataTable}
            onCheckedChange={(checked) => handleOptionChange("includeDataTable", checked)}
            className="border-[#dee6f5] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
          />
          <Label htmlFor="include-data-table" className="text-sm text-[#001742]">
            Include data table with the chart
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="add-trendlines"
            checked={customOptions.addTrendlines}
            onCheckedChange={(checked) => handleOptionChange("addTrendlines", checked)}
            className="border-[#dee6f5] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
          />
          <Label htmlFor="add-trendlines" className="text-sm text-[#001742]">
            Add trendlines to data series
          </Label>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-[#001742]">Color scheme:</Label>
          <RadioGroup
            value={customOptions.applyColorScheme}
            onValueChange={(value) => handleOptionChange("applyColorScheme", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="color-default" className="border-[#dee6f5] text-[#004ce6]" />
              <Label htmlFor="color-default" className="text-sm text-[#001742]">
                Default (match screenshot)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="office" id="color-office" className="border-[#dee6f5] text-[#004ce6]" />
              <Label htmlFor="color-office" className="text-sm text-[#001742]">
                Office Theme
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monochrome" id="color-monochrome" className="border-[#dee6f5] text-[#004ce6]" />
              <Label htmlFor="color-monochrome" className="text-sm text-[#001742]">
                Monochrome
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="colorful" id="color-colorful" className="border-[#dee6f5] text-[#004ce6]" />
              <Label htmlFor="color-colorful" className="text-sm text-[#001742]">
                Colorful
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
      >
        Generate Excel Chart
      </Button>
    </div>
  )
}
