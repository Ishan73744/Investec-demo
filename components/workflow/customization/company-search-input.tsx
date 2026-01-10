"use client"

import { useState } from "react"
import { Search, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Company {
  id: string
  name: string
  sector: string
  marketCap: string
}

interface CompanySearchInputProps {
  companies: Company[]
  onSelect: (companyName: string) => void
  placeholder?: string
}

export function CompanySearchInput({
  companies,
  onSelect,
  placeholder = "Search for a company...",
}: CompanySearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Filter companies based on search term
  const filteredCompanies = companies
    .filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.sector.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 5) // Show max 5 suggestions

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      onSelect(searchTerm.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (company: Company) => {
    setSearchTerm(company.name)
    setShowSuggestions(false)
    onSelect(company.name)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8098c4] h-4 w-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-[#e1e8f6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004ce6] focus:border-transparent"
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && searchTerm && filteredCompanies.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e1e8f6] rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                onClick={() => handleSuggestionClick(company)}
                className="p-3 hover:bg-[#f4f9ff] cursor-pointer border-b border-[#f0f4f8] last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-[#8098c4]" />
                  <div className="flex-1">
                    <div className="font-medium text-[#001742]">{company.name}</div>
                    <div className="text-sm text-[#8098c4]">
                      {company.sector} • {company.marketCap}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!searchTerm.trim()}
        className="w-full bg-[#004ce6] hover:bg-[#0041cc] text-white"
      >
        Select Company
      </Button>
    </div>
  )
}
