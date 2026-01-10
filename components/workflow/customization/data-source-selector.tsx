"use client"

import type React from "react"

import { useState } from "react"
import { Check, Database, FileSpreadsheet, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export interface DataSourceOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export interface DataSourceSelectorProps {
  onSelect?: (source: string) => void
  className?: string
  defaultValue?: string
}

const defaultDataSources: DataSourceOption[] = [
  {
    id: "api",
    name: "API Integration",
    description: "Connect to financial data APIs",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    id: "database",
    name: "Database",
    description: "Query from existing database",
    icon: <Database className="h-5 w-5" />,
  },
  {
    id: "spreadsheet",
    name: "Spreadsheet",
    description: "Import from Excel or CSV files",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
]

export function DataSourceSelector({ onSelect, className, defaultValue = "api" }: DataSourceSelectorProps) {
  const [selectedSource, setSelectedSource] = useState<string>(defaultValue)

  const handleSelect = (value: string) => {
    setSelectedSource(value)
    if (onSelect) {
      onSelect(value)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-medium">Data Source</h3>
      <RadioGroup value={selectedSource} onValueChange={handleSelect} className="grid gap-2 md:grid-cols-3">
        {defaultDataSources.map((source) => (
          <Label key={source.id} htmlFor={source.id} className="cursor-pointer">
            <Card
              className={cn(
                "border-2 transition-all",
                selectedSource === source.id ? "border-primary" : "border-border hover:border-primary/50",
              )}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <RadioGroupItem value={source.id} id={source.id} className="sr-only" />
                <div className="mb-3 mt-2 rounded-full bg-muted p-2">{source.icon}</div>
                <div className="font-medium mb-1">{source.name}</div>
                <p className="text-xs text-muted-foreground">{source.description}</p>
                {selectedSource === source.id && (
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
