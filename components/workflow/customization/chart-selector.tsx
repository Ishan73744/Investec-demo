"use client"

import type React from "react"

import { useState } from "react"
import { Check, BarChart, LineChart, PieChart, ScatterChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export interface ChartOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export interface ChartSelectorProps {
  onSelect?: (chartType: string) => void
  className?: string
  defaultValue?: string
}

const defaultChartOptions: ChartOption[] = [
  {
    id: "bar",
    name: "Bar Chart",
    description: "Compare values across categories",
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    id: "line",
    name: "Line Chart",
    description: "Show trends over time",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    id: "pie",
    name: "Pie Chart",
    description: "Show proportion of a whole",
    icon: <PieChart className="h-5 w-5" />,
  },
  {
    id: "scatter",
    name: "Scatter Plot",
    description: "Show correlation between variables",
    icon: <ScatterChart className="h-5 w-5" />,
  },
]

export function ChartSelector({ onSelect, className, defaultValue = "bar" }: ChartSelectorProps) {
  const [selectedChart, setSelectedChart] = useState<string>(defaultValue)

  const handleSelect = (value: string) => {
    setSelectedChart(value)
    if (onSelect) {
      onSelect(value)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-medium">Chart Type</h3>
      <RadioGroup value={selectedChart} onValueChange={handleSelect} className="grid gap-2 grid-cols-2 md:grid-cols-4">
        {defaultChartOptions.map((chart) => (
          <Label key={chart.id} htmlFor={chart.id} className="cursor-pointer">
            <Card
              className={cn(
                "border-2 transition-all",
                selectedChart === chart.id ? "border-primary" : "border-border hover:border-primary/50",
              )}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <RadioGroupItem value={chart.id} id={chart.id} className="sr-only" />
                <div className="mb-3 mt-2 rounded-full bg-muted p-2">{chart.icon}</div>
                <div className="font-medium mb-1">{chart.name}</div>
                <p className="text-xs text-muted-foreground">{chart.description}</p>
                {selectedChart === chart.id && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                )}
              </CardContent>
            </Card>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}
