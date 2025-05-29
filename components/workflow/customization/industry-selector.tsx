"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Industry } from "@/lib/workflow/types"

interface IndustrySelectorProps {
  industries: Industry[]
  onSelect: (industry: Industry) => void
}

export function IndustrySelector({ industries, onSelect }: IndustrySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter industries based on search term
  const filteredIndustries = searchTerm
    ? industries.filter(
        (industry) =>
          industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          industry.macroSector.toLowerCase().includes(searchTerm.toLowerCase()) ||
          industry.subSector.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : industries

  // Get featured industries (for quick selection)
  const featuredIndustries = industries.filter((i) =>
    ["quick-commerce", "tech", "healthcare", "finance"].includes(i.id),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-[#8098c4]" />
        </div>
        <Input
          type="text"
          placeholder="Search industries or enter company name..."
          className="pl-10 border-[#dee6f5] focus-visible:ring-[#004ce6]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {featuredIndustries.map((industry) => (
          <Badge
            key={industry.id}
            className="bg-[#eaf0fc] text-[#004ce6] hover:bg-[#d9e4f7] border-[#d9e4f7] cursor-pointer font-medium px-3 py-1.5"
            onClick={() => onSelect(industry)}
          >
            {industry.name}
          </Badge>
        ))}
      </div>
      <Button
        onClick={() => onSelect(industries.find((i) => i.id === "quick-commerce")!)}
        className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
      >
        Continue
      </Button>
    </div>
  )
}
