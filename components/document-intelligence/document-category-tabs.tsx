"use client"

import type React from "react"

import { cn } from "@/lib/utils"

export type CategoryTab = {
  id: string
  label: string
  count?: number
  icon?: React.ReactNode
}

interface DocumentCategoryTabsProps {
  tabs: CategoryTab[]
  activeTab: string
  isSearching: boolean
  onTabChange: (tabId: string) => void
  className?: string
}

export function DocumentCategoryTabs({
  tabs,
  activeTab,
  isSearching,
  onTabChange,
  className,
}: DocumentCategoryTabsProps) {
  return (
    <div className={cn("flex space-x-2 overflow-x-auto scrollbar-hide", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const showCount = isSearching && tab.count !== undefined && tab.id !== "recommendation"

        // Hide recommendation tab during search
        if (isSearching && tab.id === "recommendation") {
          return null
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center px-4 py-2 rounded-[6px] border transition-colors",
              isActive
                ? "bg-white border-[#EAF0FC] text-black border-t border-l border-r border-b-0 relative" // Selected state
                : "bg-transparent border-[#EAF0FC] text-[#9BABC7]", // Inactive state
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span className="whitespace-nowrap">{tab.label}</span>

            {/* Count indicator for search results */}
            {showCount && (
              <span className={cn("ml-2 text-xs px-2 py-0.5 rounded-full bg-[#e82618] text-white font-medium")}>
                {tab.count}
              </span>
            )}

            {/* Bottom border extension for active tab */}
            {isActive && <div className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-white"></div>}
          </button>
        )
      })}
    </div>
  )
}
