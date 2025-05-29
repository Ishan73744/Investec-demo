"use client"

import { DocumentSearch } from "./document-search"
import { DocumentCategory } from "./document-category"
import { DocumentPreviewModal } from "./document-preview-modal"
import { useState } from "react"

// Sample document data
const commerceReports = [
  {
    id: "1",
    title: "Zomato Annual Reports FY23",
    description: "Annual financial report with key metrics and insights",
    date: "12 Feb",
    imageUrl: "/document-covers/zomato-annual-report.png",
  },
  {
    id: "2",
    title: "Swiggy DRHP FY23",
    description: "Draft Red Herring Prospectus for Swiggy's IPO",
    date: "12 Feb",
    imageUrl: "/document-covers/swiggy-drhp.png",
  },
  {
    id: "3",
    title: "Blinkit Market Analysis 2024",
    description: "Comprehensive analysis of Blinkit's market position and growth",
    date: "15 Mar",
    imageUrl: "/document-covers/mckinsey-food-delivery.png",
  },
  {
    id: "4",
    title: "Zepto Investor Presentation Q1",
    description: "Quarterly presentation for investors highlighting growth metrics",
    date: "5 Apr",
    imageUrl: "/banking-presentation-cover.png",
  },
  {
    id: "5",
    title: "Quick Commerce Industry Outlook",
    description: "Future trends and projections for the quick commerce sector",
    date: "20 Feb",
    imageUrl: "/global-commerce.png",
  },
  {
    id: "6",
    title: "BigBasket Now Performance Review",
    description: "Operational and financial performance analysis of BigBasket Now",
    date: "8 Mar",
    imageUrl: "/automotive-credit-report.png",
  },
  {
    id: "7",
    title: "Dunzo Business Model",
    description: "Financial and operational analysis of Dunzo",
    date: "2 Feb",
    imageUrl: "/package-delivery.png",
  },
  {
    id: "8",
    title: "Instamart Strategy",
    description: "Strategic expansion plans for Instamart",
    date: "18 Mar",
    imageUrl: "/colorful-grocery-aisle.png",
  },
]

const pharmaReports = [
  {
    id: "9",
    title: "Sun Pharma Annual Report 2023",
    description: "Comprehensive annual report of Sun Pharmaceutical Industries",
    date: "5 Feb",
    imageUrl: "/pharma-research-lab.png",
  },
  {
    id: "10",
    title: "Cipla Investor Presentation Q1 2024",
    description: "Quarterly presentation highlighting Cipla's performance and outlook",
    date: "8 Apr",
    imageUrl: "/healthcare-abstract.png",
  },
  {
    id: "11",
    title: "Dr. Reddy's Quarterly Results Q4",
    description: "Financial performance and business highlights for Dr. Reddy's Labs",
    date: "15 Mar",
    imageUrl: "/energy-sustainability-report.png",
  },
  {
    id: "12",
    title: "Indian Pharmaceutical Market Analysis",
    description: "In-depth analysis of the Indian pharmaceutical industry",
    date: "12 Mar",
    imageUrl: "/digital-payments-research.png",
  },
  {
    id: "13",
    title: "API Manufacturing Trends 2024",
    description: "Current trends and future outlook for API manufacturing",
    date: "20 Feb",
    imageUrl: "/pharmaceutical-industry-report.png",
  },
  {
    id: "14",
    title: "Pharmaceutical Regulatory Landscape",
    description: "Overview of regulatory changes affecting the pharmaceutical industry",
    date: "2 Feb",
    imageUrl: "/central-bank-news.png",
  },
  {
    id: "15",
    title: "Biocon Market Analysis",
    description: "Market positioning and growth outlook for Biocon",
    date: "25 Mar",
    imageUrl: "/biotech-research.png",
  },
  {
    id: "16",
    title: "Vaccine Development Trends",
    description: "Emerging technologies and innovations in vaccine development",
    date: "10 Feb",
    imageUrl: "/vaccine-vial.png",
  },
]

export function ExploreDocuments() {
  const [previewDocument, setPreviewDocument] = useState<{
    id: string
    title: string
    imageUrl: string
  } | null>(null)

  return (
    <div className="h-full">
      <DocumentSearch />
      <div className="mt-6 pb-8">
        <DocumentCategory title="Quick Commerce Reports" documents={commerceReports} />

        <DocumentCategory title="Pharmaceutical Industry Reports" documents={pharmaReports} />
      </div>
      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={previewDocument !== null}
        onClose={() => setPreviewDocument(null)}
        document={previewDocument}
      />
    </div>
  )
}
