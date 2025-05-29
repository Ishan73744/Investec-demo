"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import Image from "next/image"

interface DocumentPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  document: {
    id: string
    title: string
    imageUrl: string
  } | null
}

export function DocumentPreviewModal({ isOpen, onClose, document }: DocumentPreviewModalProps) {
  const [isSelected, setIsSelected] = useState(false)

  if (!isOpen || !document) return null

  // Sample tags for the document
  const tags = [
    "Blinkit expansion",
    "Quick commerce",
    "Annual report",
    "Quick commerce",
    "Blinkit expansion",
    "Quick commerce",
    "Annual report",
    "Blinkit expansion",
  ]

  // Sample document sections
  const documentSections = [
    {
      title: "Corporate Performance Summary",
      subsections: ["Report Introduction Highlights", "Business Segment Performance", "Food Delivery Analysis"],
    },
    {
      title: "ESG Performance Overview",
      subsections: [
        "ESG Initiatives",
        "Consolidated Profit & Loss Statement",
        "Company Overview",
        "Adjusted Financial Metrics",
        "Board Governance Report",
        "Consolidated Profit & Loss Statement",
        "Company Overview",
        "Adjusted Financial Metrics",
      ],
    },
    {
      title: "Governance and Board Reports",
      subsections: [
        "Company Overview Governance",
        "Consolidated Profit & Loss Statement",
        "Adjusted Financial Metrics",
      ],
    },
    {
      title: "Sustainability Reporting Disclosures",
      subsections: [
        "Report Introduction Highlights",
        "Business Segment Performance",
        "Consolidated Profit & Loss Statement",
        "ESG Initiatives",
        "Company Overview",
        "Adjusted Financial Metrics",
        "Board Governance Report",
      ],
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center mr-3 cursor-pointer ${
                isSelected ? "bg-[#004ce6]" : "border border-gray-300"
              }`}
              onClick={() => setIsSelected(!isSelected)}
            >
              {isSelected && <Check className="h-4 w-4 text-white" />}
            </div>
            <h2 className="text-xl font-medium">{document.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Document preview */}
          <div className="w-1/2 border-r overflow-y-auto p-4">
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Sample document preview */}
              <div className="mb-4">
                <Image
                  src="/document-covers/zomato-annual-report.png"
                  alt={document.title}
                  width={600}
                  height={800}
                  className="w-full object-contain"
                />
              </div>
              <div className="p-6 border-t">
                <div className="mb-8">
                  <h3 className="text-lg font-bold uppercase text-red-600 mb-4">OUR MISSION STATEMENT</h3>
                  <p className="text-gray-700">
                    To create a world where everyone has access to good food, delivered quickly and reliably.
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">Executive Summary</h3>
                  <p className="text-gray-700 mb-4">
                    Zomato has continued to expand its operations across India, with significant growth in both food
                    delivery and quick commerce segments. The acquisition and integration of Blinkit has been a key
                    strategic focus this year.
                  </p>
                  <p className="text-gray-700">
                    Our financial performance shows strong revenue growth, with improving unit economics across all
                    business segments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Document metadata */}
          <div className="w-1/2 overflow-y-auto p-6">
            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Document sections */}
            <div>
              {documentSections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-medium text-[#001742] mb-2">{section.title}</h3>
                  <ul className="space-y-2 pl-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <li key={subIndex} className="text-gray-600">
                        {subsection}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
