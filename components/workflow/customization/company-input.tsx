"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CompanyInputProps {
  onSubmit: (name: string, ticker: string) => void
}

export function CompanyInput({ onSubmit }: CompanyInputProps) {
  const [companyName, setCompanyName] = useState("")
  const [ticker, setTicker] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!companyName.trim()) {
      setError("Please enter a company name")
      return
    }

    if (!ticker.trim()) {
      setError("Please enter a ticker symbol")
      return
    }

    setError("")
    onSubmit(companyName, ticker)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company-name" className="text-sm font-medium text-[#4e5971]">
            Company Name
          </Label>
          <Input
            id="company-name"
            placeholder="e.g. Zomato Limited"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value)
              setError("")
            }}
            className="border-[#dee6f5] focus-visible:ring-[#004ce6]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ticker" className="text-sm font-medium text-[#4e5971]">
            Ticker Symbol
          </Label>
          <Input
            id="ticker"
            placeholder="e.g. ZOMATO"
            value={ticker}
            onChange={(e) => {
              setTicker(e.target.value)
              setError("")
            }}
            className="border-[#dee6f5] focus-visible:ring-[#004ce6]"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm">
          Continue
        </Button>
      </form>
    </div>
  )
}
