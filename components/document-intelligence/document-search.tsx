"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Check, X, Eye } from "lucide-react"
import { DocumentCategoryTabs, type CategoryTab } from "./document-category-tabs"
import { DocumentPreviewModal } from "./document-preview-modal"

interface DocumentSearchProps {
  initialQuery?: string
}

// Define document interface for better type safety
interface Document {
  id: string
  title: string
  description: string
  date: string
  imageQuery: string
}

// Define section interface
interface DocumentSection {
  title: string
  documents: Document[]
}

export function DocumentSearch({ initialQuery = "" }: DocumentSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState("recommendation")
  const [isSearching, setIsSearching] = useState(false)
  const [hasSelectedDocuments, setHasSelectedDocuments] = useState(false)
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null)

  // Simulate search behavior
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      // Set a default active tab when searching if the current tab is recommendation
      if (activeTab === "recommendation") {
        setActiveTab("company")
      }
    } else {
      setIsSearching(false)
    }
  }

  // Category tabs with count
  const categoryTabs: CategoryTab[] = [
    {
      id: "recommendation",
      label: "Recommendation",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={activeTab === "recommendation" ? "#004ce6" : "none"}
            stroke={activeTab === "recommendation" ? "#004ce6" : "#9BABC7"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    { id: "uploaded", label: "Uploaded reports", count: 4 },
    { id: "company", label: "Company reports", count: 32 },
    { id: "brokerage", label: "Brokerage reports", count: 4 },
    { id: "industry", label: "Industry reports", count: 4 },
  ]

  // Selected documents
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  // Update hasSelectedDocuments when selectedDocuments changes
  useEffect(() => {
    setHasSelectedDocuments(selectedDocuments.length > 0)
  }, [selectedDocuments])

  // Company data for search results
  const companies = [
    {
      id: "zomato1",
      name: "Zomato Private Limited",
      category: "Quick commerce",
      logo: "/document-covers/zomato-logo.png",
      reports: [
        { id: "zom-ar-2024", name: "ZOM AR 2024" },
        { id: "zom-q2-2024", name: "ZOM Q2 2024" },
        { id: "zom-q2-2022", name: "ZOM Q2 2022" },
        { id: "zom-q3-2023", name: "ZOM Q3 2023" },
      ],
      hasMore: true,
    },
    {
      id: "zomato2",
      name: "Zomato Private Limited",
      category: "Quick commerce",
      logo: "/document-covers/zomato-logo.png",
      reports: [
        { id: "zom-ar-2024-2", name: "ZOM AR 2024" },
        { id: "zom-q2-2024-2", name: "ZOM Q2 2024" },
        { id: "zom-q2-2022-2", name: "ZOM Q2 2022" },
        { id: "zom-q3-2023-2", name: "ZOM Q3 2023" },
      ],
      hasMore: true,
    },
  ]

  // Document sections for browsing with varied headings and document names
  const documentSections: DocumentSection[] = [
    {
      title: "Quick Commerce Reports",
      documents: [
        {
          id: "zomato-annual-reports-fy23",
          title: "Zomato Annual Reports FY23",
          description: "Annual financial report with key metrics and insights",
          date: "12 Feb",
          imageQuery: "zomato annual report cover with red logo and financial charts",
        },
        {
          id: "swiggy-drhp-fy23-1",
          title: "Swiggy DRHP FY23",
          description: "Draft Red Herring Prospectus for Swiggy's IPO",
          date: "12 Feb",
          imageQuery: "swiggy DRHP document cover with orange logo and financial data",
        },
        {
          id: "blinkit-market-analysis",
          title: "Blinkit Market Analysis 2024",
          description: "Comprehensive analysis of Blinkit's market position and growth",
          date: "15 Mar",
          imageQuery: "blinkit market analysis report with green logo and market share charts",
        },
        {
          id: "zepto-investor-presentation",
          title: "Zepto Investor Presentation Q1",
          description: "Quarterly presentation for investors highlighting growth metrics",
          date: "5 Apr",
          imageQuery: "zepto investor presentation with purple branding and growth metrics",
        },
        {
          id: "quick-commerce-industry-outlook",
          title: "Quick Commerce Industry Outlook",
          description: "Future trends and projections for the quick commerce sector",
          date: "20 Feb",
          imageQuery: "quick commerce industry outlook report with delivery icons and trend graphs",
        },
        {
          id: "bigbasket-now-performance",
          title: "BigBasket Now Performance Review",
          description: "Operational and financial performance analysis of BigBasket Now",
          date: "8 Mar",
          imageQuery: "bigbasket now performance review with basket logo and performance metrics",
        },
        {
          id: "dunzo-quarterly-results",
          title: "Dunzo Quarterly Results Q4 2023",
          description: "Financial results and business highlights for Dunzo",
          date: "2 Feb",
          imageQuery: "dunzo quarterly results report with blue logo and financial statements",
        },
        {
          id: "instamart-expansion-strategy",
          title: "Instamart Expansion Strategy",
          description: "Strategic plan for Swiggy Instamart's market expansion",
          date: "18 Mar",
          imageQuery: "instamart expansion strategy document with orange branding and map graphics",
        },
        {
          id: "quick-commerce-funding-landscape",
          title: "Quick Commerce Funding Landscape",
          description: "Analysis of investment trends in the quick commerce sector",
          date: "25 Feb",
          imageQuery: "quick commerce funding landscape report with investment charts and VC logos",
        },
        {
          id: "dark-store-economics-study",
          title: "Dark Store Economics Study",
          description: "Detailed study on operational economics of dark store models",
          date: "10 Apr",
          imageQuery: "dark store economics study with warehouse illustrations and cost breakdown charts",
        },
      ],
    },
    {
      title: "Pharmaceutical Industry Reports",
      documents: [
        {
          id: "sun-pharma-annual-report",
          title: "Sun Pharma Annual Report 2023",
          description: "Comprehensive annual report of Sun Pharmaceutical Industries",
          date: "5 Feb",
          imageQuery: "sun pharma annual report with company logo and pharmaceutical imagery",
        },
        {
          id: "indian-pharma-market-analysis",
          title: "Indian Pharmaceutical Market Analysis",
          description: "In-depth analysis of the Indian pharmaceutical industry",
          date: "12 Mar",
          imageQuery: "indian pharmaceutical market analysis with medical symbols and market data",
        },
        {
          id: "cipla-investor-presentation",
          title: "Cipla Investor Presentation Q1 2024",
          description: "Quarterly presentation highlighting Cipla's performance and outlook",
          date: "8 Apr",
          imageQuery: "cipla investor presentation with company branding and financial highlights",
        },
        {
          id: "api-manufacturing-trends",
          title: "API Manufacturing Trends 2024",
          description: "Current trends and future outlook for API manufacturing",
          date: "20 Feb",
          imageQuery: "API manufacturing trends report with chemical structures and production charts",
        },
        {
          id: "dr-reddys-quarterly-results",
          title: "Dr. Reddy's Quarterly Results Q4",
          description: "Financial performance and business highlights for Dr. Reddy's Labs",
          date: "15 Mar",
          imageQuery: "dr reddys quarterly results with company logo and financial statements",
        },
        {
          id: "pharma-regulatory-landscape",
          title: "Pharmaceutical Regulatory Landscape",
          description: "Overview of regulatory changes affecting the pharmaceutical industry",
          date: "2 Feb",
          imageQuery: "pharmaceutical regulatory landscape report with legal icons and compliance graphics",
        },
        {
          id: "biocon-biologics-analysis",
          title: "Biocon Biologics Market Analysis",
          description: "Market positioning and growth prospects for Biocon Biologics",
          date: "25 Mar",
          imageQuery: "biocon biologics market analysis with biotech imagery and market share diagrams",
        },
        {
          id: "vaccine-market-opportunities",
          title: "Vaccine Market Opportunities 2024",
          description: "Emerging opportunities and challenges in the vaccine market",
          date: "10 Feb",
          imageQuery: "vaccine market opportunities report with medical vials and growth projection charts",
        },
        {
          id: "pharmaceutical-supply-chain",
          title: "Pharmaceutical Supply Chain Resilience",
          description: "Analysis of supply chain strategies in the pharmaceutical sector",
          date: "18 Mar",
          imageQuery: "pharmaceutical supply chain resilience report with logistics flow diagrams",
        },
        {
          id: "generic-drugs-competitive-landscape",
          title: "Generic Drugs Competitive Landscape",
          description: "Competitive analysis of the generic drugs market in India",
          date: "5 Apr",
          imageQuery: "generic drugs competitive landscape with pill imagery and competitor comparison charts",
        },
      ],
    },
    {
      title: "Financial Market Research Reports",
      documents: [
        {
          id: "hdfc-bank-equity-research",
          title: "HDFC Bank Equity Research",
          description: "Detailed equity research report on HDFC Bank with buy/sell recommendation",
          date: "8 Feb",
          imageQuery: "hdfc bank equity research report with bank logo and stock charts",
        },
        {
          id: "reliance-industries-analysis",
          title: "Reliance Industries Analysis",
          description: "Comprehensive analysis of Reliance Industries' business segments",
          date: "15 Mar",
          imageQuery: "reliance industries analysis report with company logo and business segment charts",
        },
        {
          id: "nifty50-quarterly-outlook",
          title: "Nifty 50 Quarterly Outlook Q2 2024",
          description: "Market outlook and projections for Nifty 50 index",
          date: "2 Apr",
          imageQuery: "nifty 50 quarterly outlook with stock market charts and trend analysis",
        },
        {
          id: "banking-sector-performance",
          title: "Banking Sector Performance Review",
          description: "Performance analysis of the Indian banking sector",
          date: "20 Feb",
          imageQuery: "banking sector performance review with financial institution logos and performance metrics",
        },
        {
          id: "it-sector-earnings-preview",
          title: "IT Sector Earnings Preview Q1",
          description: "Preview of expected earnings for major IT companies",
          date: "5 Mar",
          imageQuery: "it sector earnings preview with technology icons and earnings forecast charts",
        },
        {
          id: "consumer-durables-sector-report",
          title: "Consumer Durables Sector Report",
          description: "Industry analysis and outlook for the consumer durables sector",
          date: "12 Feb",
          imageQuery: "consumer durables sector report with appliance imagery and market trend graphs",
        },
        {
          id: "green-energy-investment-opportunities",
          title: "Green Energy Investment Opportunities",
          description: "Analysis of investment prospects in the renewable energy sector",
          date: "25 Mar",
          imageQuery: "green energy investment opportunities report with renewable energy icons and growth charts",
        },
        {
          id: "small-cap-stocks-analysis",
          title: "Small Cap Stocks Analysis 2024",
          description: "Research on high-potential small cap stocks in the Indian market",
          date: "10 Feb",
          imageQuery: "small cap stocks analysis with stock ticker symbols and performance comparison charts",
        },
        {
          id: "mutual-funds-quarterly-review",
          title: "Mutual Funds Quarterly Review",
          description: "Performance review of top-performing mutual funds",
          date: "18 Mar",
          imageQuery: "mutual funds quarterly review with fund house logos and performance metrics",
        },
        {
          id: "commodity-market-outlook",
          title: "Commodity Market Outlook 2024",
          description: "Price trends and forecasts for key commodities",
          date: "5 Apr",
          imageQuery: "commodity market outlook with gold, oil, and agricultural commodity price charts",
        },
      ],
    },
  ]

  const toggleDocumentSelection = (documentId: string) => {
    if (selectedDocuments.includes(documentId)) {
      setSelectedDocuments(selectedDocuments.filter((id) => id !== documentId))
    } else {
      setSelectedDocuments([...selectedDocuments, documentId])
    }
  }

  const removeSelectedDocument = (documentId: string) => {
    setSelectedDocuments(selectedDocuments.filter((id) => id !== documentId))
  }

  return (
    <div className={`space-y-6 ${hasSelectedDocuments ? "flex gap-6" : ""}`}>
      {/* Main content area with dynamic padding */}
      <div className={`${hasSelectedDocuments ? "w-3/4 pr-6" : "w-full"} transition-all duration-300`}>
        {/* Search input */}
        <form onSubmit={handleSearch} className="mb-8">
          {" "}
          {/* Changed mb-6 to mb-8 (32px) */}
          <input
            type="text"
            placeholder="Describe you reports"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#EAF0FC] focus:outline-none focus:ring-2 focus:ring-[#004ce6]"
            /* Changed p-4 to p-3 to reduce height by 8px */
          />
        </form>

        {/* Category tabs using the reusable component */}
        <div className="mb-3">
          {" "}
          {/* Changed mb-6 to mb-3 (12px) */}
          <DocumentCategoryTabs
            tabs={categoryTabs}
            activeTab={activeTab}
            isSearching={isSearching}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Tab content container with white background and border */}
        <div className="bg-white border border-[#EAF0FC] rounded-lg overflow-hidden">
          {isSearching ? (
            // Search results view
            <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-hide">
              <h2 className="text-xl font-medium mb-4">Quick commerce reports</h2>
              <div className="space-y-4">
                {companies.map((company) => (
                  <div key={company.id} className="border border-[#EAF0FC] rounded-lg overflow-hidden bg-white">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-red-100 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src="/document-covers/zomato-logo.png"
                            alt={company.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-[#001742]">{company.name}</h3>
                          <p className="text-sm text-gray-500">{company.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t px-4 py-3 flex flex-wrap gap-2">
                      {company.reports.map((report) => (
                        <div key={report.id} className="flex items-center bg-gray-50 rounded-md px-3 py-1.5">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center mr-2 ${
                              selectedDocuments.includes(report.name) ? "bg-[#004ce6]" : "border border-gray-300"
                            }`}
                            onClick={() => toggleDocumentSelection(report.name)}
                          >
                            {selectedDocuments.includes(report.name) && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm">{report.name}</span>
                        </div>
                      ))}
                      {company.hasMore && (
                        <div className="flex items-center bg-gray-50 rounded-md px-3 py-1.5">
                          <span className="text-sm text-gray-500">28+</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Regular document browsing view with horizontal scrolling sections
            <div className="p-4 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-hide">
              {documentSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <h2 className="text-xl font-medium mb-4">{section.title}</h2>

                  {/* Horizontal scrolling container with hidden scrollbar */}
                  <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="grid grid-rows-2 grid-flow-col gap-4 min-w-max">
                      {section.documents.map((document) => {
                        const isSelected = selectedDocuments.includes(document.title)
                        return (
                          <div
                            key={document.id}
                            className={`flex items-start p-1 rounded-lg border border-[#EAF0FC] w-[350px] group ${
                              isSelected ? "bg-blue-50" : "bg-white"
                            }`}
                          >
                            <div className="relative w-16 h-[22.6px] flex-shrink-0 mr-3">
                              {/* Checkbox with hover effect - perfectly centered */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-md z-10">
                                <button
                                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    isSelected ? "bg-[#004ce6]" : "bg-white border border-gray-300"
                                  }`}
                                  onClick={() => toggleDocumentSelection(document.title)}
                                  aria-label={`Select ${document.title}`}
                                >
                                  {isSelected && <Check className="h-4 w-4 text-white" />}
                                </button>
                              </div>
                              {/* Generated image based on document content with A4 proportions */}
                              <div className="w-16 h-[22.6px] overflow-hidden rounded-md">
                                <Image
                                  src={`/abstract-geometric-shapes.png?height=226&width=160&query=${document.imageQuery}`}
                                  alt={document.title}
                                  width={160}
                                  height={226}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 relative">
                              <h3 className="font-medium text-[#001742] text-sm line-clamp-2">{document.title}</h3>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{document.description}</p>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-gray-400">{document.date}</p>
                                {/* Preview button - visible on hover */}
                                <button
                                  className="absolute bottom-0 right-0 bg-white border border-gray-200 rounded-md px-2 py-0.5 text-xs flex items-center gap-1 text-gray-600 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setPreviewDocument(document)
                                  }}
                                >
                                  <Eye className="h-3 w-3" />
                                  Preview
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected documents panel - only visible when documents are selected */}
      {hasSelectedDocuments && (
        <div className="w-1/4">
          <div className="bg-white border border-[#EAF0FC] rounded-lg h-auto min-h-[400px] p-4 flex flex-col">
            <h2 className="text-lg font-medium mb-4">Selected documents</h2>
            <div className="space-y-2 flex-1 overflow-y-auto scrollbar-hide">
              {selectedDocuments.map((doc) => (
                <div key={doc} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm truncate max-w-[160px]">{doc}</span>
                  </div>
                  <button onClick={() => removeSelectedDocument(doc)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="relative w-full">
                <select className="w-full appearance-none bg-white border border-[#EAF0FC] rounded-md py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-[#004ce6] focus:border-[#004ce6]">
                  <option>Select project</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={previewDocument !== null}
        onClose={() => setPreviewDocument(null)}
        document={
          previewDocument
            ? {
                id: previewDocument.id,
                title: previewDocument.title,
                imageUrl: `/abstract-geometric-shapes.png?height=226&width=160&query=${previewDocument.imageQuery}`,
              }
            : null
        }
      />
    </div>
  )
}
