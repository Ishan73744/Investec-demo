"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface CompanyNameInputProps {
  onSubmit: (companyName: string) => void
}

export function CompanyNameInput({ onSubmit }: CompanyNameInputProps) {
  const [searchValue, setSearchValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const companies = [
    { value: "aarti-drugs", label: "Aarti Drugs Limited" },
    { value: "sun-pharma", label: "Sun Pharmaceutical Industries Ltd." },
    { value: "cipla", label: "Cipla Limited" },
  ]

  // Filter companies based on search input
  const filteredCompanies = companies.filter((company) =>
    company.label.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchValue.trim()) {
      setError("Please enter a company name")
      return
    }

    setError("")
    onSubmit(searchValue)
  }

  const handleSuggestionClick = (companyLabel: string) => {
    setSearchValue(companyLabel)
    setShowSuggestions(false)
    setError("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    setShowSuggestions(value.length > 0)
    setError("")
  }

  const handleInputFocus = () => {
    if (searchValue.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false)
      }
    }, 150)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="company-name" className="block text-sm font-medium text-[#4e5971] mb-1">
            Enter the name of the company
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] h-4 w-4" />
            <Input
              ref={inputRef}
              id="company-name"
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Search for a company..."
              className="pl-10 border-[#dee6f5] bg-white"
              autoComplete="off"
            />
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && filteredCompanies.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white border border-[#dee6f5] rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {filteredCompanies.map((company) => (
                <button
                  key={company.value}
                  type="button"
                  onClick={() => handleSuggestionClick(company.label)}
                  className="w-full px-3 py-2 text-left hover:bg-[#f4f9ff] focus:bg-[#f4f9ff] focus:outline-none border-b border-[#f1f5f9] last:border-b-0"
                >
                  <div className="text-sm text-[#001742]">{company.label}</div>
                </button>
              ))}
            </div>
          )}

          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
        <Button type="submit" className="bg-[#004ce6] hover:bg-[#0040c9] text-white h-9 px-4 py-2">
          Continue
        </Button>
      </form>
    </div>
  )
}
