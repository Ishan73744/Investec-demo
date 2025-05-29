"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { DocumentUploader } from "@/components/workflow/customization/document-uploader"
import { SectionSelector } from "@/components/workflow/customization/section-selector"
import { OutputOptions } from "@/components/workflow/customization/output-options"
import { IPOReport } from "@/components/workflow/report/ipo-report"
import { WorkflowEngine } from "@/lib/workflow/workflow-engine"
import type { MessageProps } from "@/components/workflow/chat-message"

// Define the workflow configuration
const workflowConfig = {
  id: "ipo-screening",
  title: "DRHP/IPO Document Screening",
  description: "Generate customized IPO screening reports from DRHP documents",
  steps: [
    {
      id: 1,
      title: "Upload Document",
      description: "Upload a DRHP/IPO document for analysis",
    },
    {
      id: 2,
      title: "Select Report Sections",
      description: "Choose which sections to include in the report",
    },
    {
      id: 3,
      title: "Configure Output Options",
      description: "Customize additional report options",
    },
    {
      id: 4,
      title: "Processing",
      description: "Analyzing document and generating report",
    },
    {
      id: 5,
      title: "Review Results",
      description: "Review and download the generated report",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Welcome to the IPO Document Screening tool. Please upload the DRHP/IPO prospectus to begin the analysis process.
      </p>
    </div>
  ),
}

// Sample company data for demonstration
const sampleCompanyData = {
  name: "Zomato Limited",
  ticker: "ZOMATO",
  exchange: "BSE: 543400 | NSE: ZOMATO",
  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8f6KXsMwBvieynHAAVUPagk1wFotvA.png",
  business: "#1 Indian platform for restaurant discovery & food delivery (founded 2008)",
  marketPosition: "~50% market share; operations in 500+ cities",
  ipoHighlight: "Raised ₹9,375 Cr at ₹76–78 per share; first‐ever profitable quarter reported in Q3 FY21",
  offeringDetails: {
    freshIssue: "₹1,481 Cr",
    offerForSale: "₹7,894 Cr",
    totalIssueSize: "₹9,375 Cr",
    priceBand: "₹76 – ₹78 per share",
    lotSize: "192 shares",
    listingDate: "23 March 2021",
  },
  financialHighlights: [
    { metric: "Revenue", amount: "1,021.8", yoyChange: "+38%" },
    { metric: "Net Loss", amount: "-1,166.2", yoyChange: "-5% (↓)" },
    { metric: "Adj. EBITDA", amount: "-74.3", yoyChange: "+12% margin" },
    { metric: "Cash Burn", amount: "840.5", yoyChange: "-15%" },
  ],
  useOfProceeds: [
    { percentage: "30%", purpose: "Organic Growth Initiatives" },
    { percentage: "40%", purpose: "Inorganic Growth / Acquisitions" },
    { percentage: "30%", purpose: "General Corporate Purposes" },
  ],
  peerComparison: [
    {
      company: "Zomato",
      ticker: "BSE:543400",
      ev: "60,600",
      revenue: "1,021.8",
      evRev: "5.9x",
      ps: "4.0x",
      highlight: true,
    },
    {
      company: "DoorDash",
      ticker: "NASDAQ: DASH",
      ev: "1,80,000",
      revenue: "4,883",
      evRev: "36.8x",
      ps: "29.4x",
      highlight: false,
    },
    {
      company: "Grubhub",
      ticker: "NYSE: GRUB",
      ev: "26,200",
      revenue: "1,646",
      evRev: "15.9x",
      ps: "12.6x",
      highlight: false,
    },
    {
      company: "Swiggy (est.)",
      ticker: "Private",
      ev: "40,000 *",
      revenue: "1,800 *",
      evRev: "22.2x *",
      ps: "19.8x *",
      highlight: false,
    },
  ],
  valuationSummary: [
    { metric: "Implied Market Cap", value: "₹60,600 Cr (at ₹78)" },
    { metric: "EV/Revenue Multiple", value: "5.9x vs. global peer avg. ~24x" },
    { metric: "P/S Multiple", value: "4.0x vs. global peer avg. ~20x" },
  ],
  riskFactors: [
    { title: "High Cash Burn", description: "Continued negative free cash flow until scale economies materialize." },
    { title: "Intense Competition", description: "Swiggy, Amazon, and local delivery aggregators." },
    { title: "Regulatory Changes", description: "Food safety norms, delivery partner labor laws." },
    { title: "Reliance on 3PL", description: "Quality & timing depend on third-party delivery fleets." },
  ],
  ipoTimeline: [
    { event: "DRHP Filing", date: "14 Apr 2021" },
    { event: "Price Band Announced", date: "28 Feb 2021" },
    { event: "Offer Open", date: "14 Mar 2021" },
    { event: "Offer Close", date: "16 Mar 2021" },
    { event: "Listing", date: "23 Mar 2021" },
  ],
  analystRecommendation: {
    rating: "SUBSCRIBE",
    ratingScore: 3,
    comment:
      "Despite current losses, Zomato's dominant market position, strong growth trajectory, and potential for profitability make it an attractive long-term investment. The company's valuation appears reasonable compared to global peers, offering potential upside as the Indian food delivery market expands.",
    targetPrice: "₹95-105 (12-month horizon)",
  },
}

export default function IPOScreeningPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isReportComplete, setIsReportComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Document and company info
  const [uploadedDocument, setUploadedDocument] = useState<string | null>(null)
  const [companyInfo, setCompanyInfo] = useState({ name: "Zomato Limited", ticker: "ZOMATO" })

  // Report configuration
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "executiveSummary",
    "offeringDetails",
    "financialHighlights",
    "useOfProceeds",
    "peerComparison",
    "valuationSummary",
    "riskFactors",
    "ipoTimeline",
    "analystRecommendation",
  ])

  const [detailLevel, setDetailLevel] = useState<"high" | "detailed">("high")
  const [outputOptions, setOutputOptions] = useState({
    includePeerComparisons: true,
    includeIndustryBenchmarks: false,
    includeRecentDeals: false,
    additionalNotes: "",
  })

  // References
  const contentContainerRef = useRef<HTMLDivElement>(null)

  // Initialize the workflow
  useEffect(() => {
    setIsMounted(true)
    const initialMessages = workflowEngine.initialize()
    setMessages(initialMessages)
    setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
  }, [])

  // Handle document upload
  const handleDocumentUpload = (documentName: string) => {
    // Always use "Zomato DRHP" as the document name
    const fixedDocumentName = "Zomato DRHP"
    setUploadedDocument(fixedDocumentName)
    setCurrentStep(2) // Skip company details step, go directly to section selection

    // Add user message
    workflowEngine.addMessage("user", `I've uploaded ${fixedDocumentName}`)

    // Show section selection with detected company info
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            The document has been analyzed and identified as the Draft Red Herring Prospectus for{" "}
            <strong>Zomato Limited (ZOMATO)</strong>. Please select the sections you would like to include in your
            report and specify the desired level of analysis:
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Handle section selection
  const handleSectionSelection = (sections: string[], level: "high" | "detailed") => {
    setSelectedSections(sections)
    setDetailLevel(level)
    setCurrentStep(3) // Move to output options step

    // Add user message
    const sectionCount = sections.length
    const sectionText = sectionCount === 1 ? "section" : "sections"
    workflowEngine.addMessage(
      "user",
      `I'd like to include ${sectionCount} ${sectionText} with ${level === "high" ? "high-level" : "detailed"} analysis`,
    )

    // Show output options
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            Please select any additional data points or comparative analyses you would like to incorporate into the
            final report:
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Handle output options selection
  const handleOutputOptionsSubmit = (options: typeof outputOptions) => {
    setOutputOptions(options)
    setCurrentStep(4) // Move to processing step

    // Add user message
    const selectedOptions = []
    if (options.includePeerComparisons) selectedOptions.push("peer comparisons")
    if (options.includeIndustryBenchmarks) selectedOptions.push("industry benchmarks")
    if (options.includeRecentDeals) selectedOptions.push("recent deals")

    const optionsText =
      selectedOptions.length > 0
        ? `I'd like to include ${selectedOptions.join(", ")}`
        : "I don't need any additional analyses"

    workflowEngine.addMessage("user", optionsText)

    // Show processing message
    workflowEngine.addLoadingMessage("Analyzing DRHP document...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing steps
    setTimeout(() => {
      workflowEngine.updateLoadingMessage("Extracting key financial data...")
      setMessages(workflowEngine.getMessages())

      setTimeout(() => {
        workflowEngine.updateLoadingMessage("Generating peer comparisons...")
        setMessages(workflowEngine.getMessages())

        setTimeout(() => {
          workflowEngine.updateLoadingMessage("Compiling IPO screening report...")
          setMessages(workflowEngine.getMessages())

          setTimeout(() => {
            workflowEngine.removeLoadingMessage()
            showReportResults()
            setMessages(workflowEngine.getMessages())
          }, 1500)
        }, 1500)
      }, 1500)
    }, 1500)
  }

  // Show report results
  const showReportResults = () => {
    setCurrentStep(5) // Move to results step
    setIsReportComplete(true)

    // Clear active customization before showing the final result
    workflowEngine.clearActiveCustomization()
    setActiveCustomizationId(null)

    workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">
          Your IPO screening report has been generated based on the selected parameters. The analysis provides a
          comprehensive overview of Zomato's offering:
        </p>

        <IPOReport
          companyData={sampleCompanyData}
          selectedSections={selectedSections}
          detailLevel={detailLevel}
          outputOptions={outputOptions}
          onRestart={() => {
            // Reset the workflow
            const initialMessages = workflowEngine.initialize()
            setMessages(initialMessages)
            setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
            setCurrentStep(1)
            setIsReportComplete(false)
            setUploadedDocument(null)
            setCompanyInfo({ name: "Zomato Limited", ticker: "ZOMATO" })
            setSelectedSections([
              "executiveSummary",
              "offeringDetails",
              "financialHighlights",
              "useOfProceeds",
              "peerComparison",
              "valuationSummary",
              "riskFactors",
              "ipoTimeline",
              "analystRecommendation",
            ])
            setDetailLevel("high")
            setOutputOptions({
              includePeerComparisons: true,
              includeIndustryBenchmarks: false,
              includeRecentDeals: false,
              additionalNotes: "",
            })
          }}
        />
      </div>,
    )

    setMessages(workflowEngine.getMessages())
  }

  // Handle editing a message
  const handleEditMessage = (messageId: string) => {
    workflowEngine.handleEditMessage(messageId)
    setMessages(workflowEngine.getMessages())
    setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
    setCurrentStep(workflowEngine.getCurrentStep())
  }

  // Render customization content based on current step
  const renderCustomizationContent = () => {
    switch (currentStep) {
      case 1:
        return <DocumentUploader onUpload={handleDocumentUpload} />
      case 2:
        return <SectionSelector onSubmit={handleSectionSelection} />
      case 3:
        return <OutputOptions onSubmit={handleOutputOptionsSubmit} />
      default:
        return null
    }
  }

  // Add customization content to messages
  const messagesWithCustomization = messages.map((message) => {
    if (message.id === activeCustomizationId && message.showCustomization) {
      return {
        ...message,
        customization: <CustomizationBox>{renderCustomizationContent()}</CustomizationBox>,
      }
    }
    return message
  })

  return (
    <WorkflowLayout>
      <WorkflowHeader title="DRHP/IPO Document Screening" breadcrumbs={[{ label: "Workflows", href: "/" }]} />

      {isMounted && (
        <>
          <ChatInterface
            messages={messagesWithCustomization}
            activeCustomizationId={activeCustomizationId}
            onEditMessage={handleEditMessage}
            contentContainerRef={contentContainerRef}
          />

          {isReportComplete && (
            <ChatInput
              onSend={(message) => {
                // Handle follow-up questions here
                workflowEngine.addMessage("user", message)
                setMessages(workflowEngine.getMessages())

                // Simulate response
                setTimeout(() => {
                  workflowEngine.addMessage(
                    "system",
                    <div>
                      <p className="text-[#4e5971]">
                        I'd be happy to provide additional insights on that aspect of the IPO analysis. What specific
                        information would you like me to elaborate on?
                      </p>
                    </div>,
                  )
                  setMessages(workflowEngine.getMessages())
                }, 1000)
              }}
              placeholder="Ask a follow-up question about the IPO screening report..."
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}
