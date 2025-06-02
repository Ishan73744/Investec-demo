"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface CompanyNameInputProps {
  onSubmit: (companyName: string, websiteUrl: string) => void
}

export function CompanyNameInput({ onSubmit }: CompanyNameInputProps) {
  const [selectedValue, setSelectedValue] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [error, setError] = useState("")

  const companies = [
    { value: "aarti-drugs", label: "Aarti Drugs Limited", website: "https://www.aartidrugs.co.in" },
    { value: "sun-pharma", label: "Sun Pharmaceutical Industries Ltd.", website: "https://www.sunpharma.com" },
    { value: "cipla", label: "Cipla Limited", website: "https://www.cipla.com" },
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

    // Use the entered website URL or the default one from the company data
    const finalWebsiteUrl = websiteUrl || selectedCompany?.website || ""

    onSubmit(selectedCompany?.label || selectedValue, finalWebsiteUrl)
  }

  // Update website URL when company selection changes
  const handleCompanyChange = (value: string) => {
    setSelectedValue(value)
    setError("")

    const selectedCompany = companies.find((company) => company.value === value)
    if (selectedCompany && !websiteUrl) {
      setWebsiteUrl(selectedCompany.website)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company-name" className="block text-sm font-medium text-[#4e5971] mb-1">
            Enter the name of the company
          </label>
          <Select value={selectedValue} onValueChange={handleCompanyChange}>
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

        <div>
          <label htmlFor="website-url" className="block text-sm font-medium text-[#4e5971] mb-1">
            Company Website URL
          </label>
          <Input
            id="website-url"
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full border-[#dee6f5] bg-white"
          />
        </div>

        <Button type="submit" className="bg-[#004ce6] hover:bg-[#0040c9] text-white h-9 px-4 py-2">
          Continue
        </Button>
      </form>
    </div>
  )
}
