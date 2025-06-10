"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { AlertCard } from "@/components/alerts/alert-card"
import { AlertCategoryTabs } from "@/components/alerts/alert-category-tabs"
import { alertCategoriesData } from "@/lib/alerts-data"

export default function AlertsPage() {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>(alertCategoriesData[0]?.name || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Monitoring for:", inputValue)
    setInputValue("")
  }

  const currentAlerts = alertCategoriesData.find((cat) => cat.name === selectedCategory)?.alerts || []

  return (
    <div className="min-h-screen bg-[#F9FAFF]" style={{ paddingTop: "84px" }}>
      <div className="px-[60px]">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium text-[#001742] mb-6">What do you want to monitor?</h1>
          <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
            <div className="relative h-[100px] rounded-lg border border-[#dee6f5] bg-white overflow-hidden shadow-sm">
              <textarea
                ref={inputRef}
                placeholder="e.g., Monitor price shocks for NIFTY50 stocks greater than 5%..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="absolute inset-0 w-full h-full px-4 py-4 text-base border-0 resize-none focus:outline-none focus:ring-0 text-[#001742] placeholder:text-[#9babc7]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <button
                type="submit"
                className={`absolute right-3 bottom-3 rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-150 ${
                  inputValue.trim() ? "bg-[#004ce6] hover:bg-[#003ba3]" : "bg-[#f2f6fe]"
                }`}
                disabled={!inputValue.trim()}
                aria-label="Submit monitoring request"
              >
                <ArrowRight className={`h-4 w-4 ${inputValue.trim() ? "text-white" : "text-[#9babc7]"}`} />
              </button>
            </div>
          </form>
        </div>

        {/* Tabs Section */}
        <AlertCategoryTabs
          categories={alertCategoriesData.map((cat) => cat.name)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#001742]">{selectedCategory}</h2>
        </div>

        {/* Cards Grid */}
        {currentAlerts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
            {currentAlerts.map((alert) => (
              <AlertCard
                key={alert.title}
                title={alert.title}
                description={alert.description}
                requiredInputs={alert.requiredInputs}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-[#9babc7]">No alerts found for this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
