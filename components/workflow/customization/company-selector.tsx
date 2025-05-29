"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"

interface CompanySelectorProps {
  onSelect: (companies: string[]) => void
}

const suggestedCompanies = [
  "Lodha",
  "Prestige",
  "DLF",
  "Godrej Properties",
  "Oberoi Realty",
  "Brigade Enterprises",
  "Sobha Limited",
  "Puravankara",
  "Mahindra Lifespace",
  "Tata Motors",
  "Maruti Suzuki",
  "Bajaj Auto",
  "Hero MotoCorp",
  "TVS Motor",
  "Reliance Industries",
  "TCS",
  "HDFC Bank",
  "Infosys",
  "ICICI Bank",
]

export function CompanySelector({ onSelect }: CompanySelectorProps) {
  const [inputValue, setInputValue] = useState("")
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(suggestedCompanies.slice(0, 5))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim() === "") {
      setFilteredSuggestions(suggestedCompanies.slice(0, 5))
    } else {
      const filtered = suggestedCompanies
        .filter((company) => company.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5)
      setFilteredSuggestions(filtered)
    }
  }

  const addCompany = (company: string) => {
    if (!selectedCompanies.includes(company) && company.trim() !== "") {
      const newSelectedCompanies = [...selectedCompanies, company]
      setSelectedCompanies(newSelectedCompanies)
      setInputValue("")
    }
  }

  const removeCompany = (company: string) => {
    setSelectedCompanies(selectedCompanies.filter((c) => c !== company))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addCompany(inputValue.trim())
    }
  }

  const handleContinue = () => {
    if (selectedCompanies.length > 0) {
      onSelect(selectedCompanies)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 p-2 border border-[#dee6f5] rounded-md bg-white min-h-[42px]">
          {selectedCompanies.map((company) => (
            <div key={company} className="flex items-center gap-1 px-2 py-1 bg-[#f0f4fa] rounded-md text-sm">
              <span>{company}</span>
              <button onClick={() => removeCompany(company)} className="text-[#6e7b96] hover:text-[#4e5971]">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={selectedCompanies.length === 0 ? "Type company name or ticker..." : ""}
            className="flex-1 min-w-[120px] outline-none text-sm py-1"
          />
        </div>

        {filteredSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filteredSuggestions.map((company) => (
              <button
                key={company}
                onClick={() => addCompany(company)}
                className="px-2 py-1 text-sm bg-[#f0f4fa] text-[#4e5971] rounded-md hover:bg-[#e6edf9] transition-colors"
              >
                {company}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleContinue}
        disabled={selectedCompanies.length === 0}
        className="continue-button px-4 py-2 bg-[#004ce6] text-white rounded-md hover:bg-[#003bb2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  )
}
