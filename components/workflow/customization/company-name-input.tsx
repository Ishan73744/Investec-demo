"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CompanyNameInputProps {
  onSubmit: (companyName: string) => void
}

export function CompanyNameInput({ onSubmit }: CompanyNameInputProps) {
  const [selectedValue, setSelectedValue] = useState("")
  const [error, setError] = useState("")

  const companies = [
    { value: "aarti-drugs", label: "Aarti Drugs Limited" },
    { value: "sun-pharma", label: "Sun Pharmaceutical Industries Ltd." },
    { value: "cipla", label: "Cipla Limited" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedValue) {
      setError("Please select a company")
      return
    }

    setError("")
    // Find the company label based on the selected value
    const selectedCompany = companies.find((company) => company.value === selectedValue)
    onSubmit(selectedCompany?.label || selectedValue)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company-name" className="block text-sm font-medium text-[#4e5971] mb-1">
            Enter the name of the company
          </label>
          <Select
            value={selectedValue}
            onValueChange={(value) => {
              setSelectedValue(value)
              setError("")
            }}
          >
            <SelectTrigger
              className="w-full border-[#dee6f5] bg-white text-left font-normal"
              aria-label="Select a company"
            >
              <SelectValue placeholder="Select a company..." />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.value} value={company.value}>
                  {company.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
        <Button type="submit" className="bg-[#004ce6] hover:bg-[#0040c9] text-white h-9 px-4 py-2">
          Continue
        </Button>
      </form>
    </div>
  )
}
