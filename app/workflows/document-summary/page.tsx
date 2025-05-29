"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { DocumentUploader } from "@/components/workflow/customization/document-uploader"
import { SummaryResult } from "@/components/workflow/report/summary-result"
import { WorkflowEngine } from "@/components/workflow/workflow-engine"
import { DocumentIndexWithTags } from "@/components/workflow/customization/document-index-with-tags"
import { TableChartSelector } from "@/components/workflow/customization/table-chart-selector"
import { SummaryDepthSelector } from "@/components/workflow/customization/summary-depth-selector"
import type { MessageProps } from "@/components/workflow/chat-message"

// Define the workflow configuration
const workflowConfig = {
  id: "document-summary",
  title: "Personalized Summary Generator",
  description: "Generate customized summaries from multiple documents with flexible editing options",
  steps: [
    {
      id: 1,
      title: "Select Documents",
      description: "Upload or select documents to summarize",
    },
    {
      id: 2,
      title: "Document Index & Instructions",
      description: "Customize the document index and provide focus areas",
    },
    {
      id: 3,
      title: "Select Tables & Charts",
      description: "Choose which visual elements to include",
    },
    {
      id: 4,
      title: "Summary Depth",
      description: "Select the level of detail for your summary",
    },
    {
      id: 5,
      title: "Processing",
      description: "Analyzing documents and generating summary",
    },
    {
      id: 6,
      title: "Review Results",
      description: "Review and download the generated summary",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Ready to create your personalized summary? Please upload or select the documents you want to summarize. You can
        select multiple documents, and we'll combine them into one index.
      </p>
    </div>
  ),
}

// Updated document sections based on the provided outline
const sampleDocumentSections = [
  {
    id: "executive",
    title: "1. Executive Summary",
    selected: true,
    tags: ["Purpose & Scope", "Key Findings"],
    description: "Purpose & Scope, Key Findings",
  },
  {
    id: "market",
    title: "2. Market Overview",
    selected: true,
    tags: [
      "Industry Definition & Classification",
      "Historical Market Size & Growth",
      "Demand Drivers",
      "Macroeconomic & Policy Context",
    ],
    description:
      "Industry Definition & Classification, Historical Market Size & Growth, Demand Drivers, Macroeconomic & Policy Context",
  },
  {
    id: "segmentation",
    title: "3. Market Segmentation",
    selected: true,
    tags: ["By Product / Therapy", "By Geography", "By End-User"],
    description: "By Product / Therapy, By Geography, By End-User",
  },
  {
    id: "regulatory",
    title: "4. Regulatory & Compliance Landscape",
    selected: true,
    tags: ["Key Global Regulatory Bodies", "Current Regulatory Landscape in India", "Upcoming Policy Changes"],
    description: "Key Global Regulatory Bodies, Current Regulatory Landscape in India, Upcoming Policy Changes",
  },
  {
    id: "competitive",
    title: "5. Competitive Landscape",
    selected: true,
    tags: ["Market Share of Top Players", "Porter's Five Forces Analysis", "SWOT of Leading Firms"],
    description: "Market Share of Top Players, Porter's Five Forces Analysis, SWOT of Leading Firms",
  },
  {
    id: "supply",
    title: "6. Supply Chain & Manufacturing",
    selected: true,
    tags: ["Upstream Sourcing & Production", "Distribution & Logistics", "Manufacturing Trends"],
    description: "Upstream Sourcing & Production, Distribution & Logistics, Manufacturing Trends",
  },
  {
    id: "research",
    title: "7. Research, Development & Innovation",
    selected: true,
    tags: ["R&D Expenditure & Productivity", "Key Technological Enablers", "Clinical Trials & Pipeline Insights"],
    description: "R&D Expenditure & Productivity, Key Technological Enablers, Clinical Trials & Pipeline Insights",
  },
  {
    id: "financial",
    title: "8. Financial Performance & Capital Markets",
    selected: true,
    tags: ["Revenue & Profitability Benchmarks", "Investment & Funding Flows", "Market Valuations & Multiples"],
    description: "Revenue & Profitability Benchmarks, Investment & Funding Flows, Market Valuations & Multiples",
  },
  {
    id: "mergers",
    title: "9. Mergers, Acquisitions & Partnerships",
    selected: true,
    tags: ["M&A Activity Overview", "Licensing & Co-development Deals", "Integration & Synergy Realization"],
    description: "M&A Activity Overview, Licensing & Co-development Deals, Integration & Synergy Realization",
  },
  {
    id: "trends",
    title: "10. Emerging Trends & Opportunities",
    selected: true,
    tags: ["Digital Transformation", "Personalised & Precision Medicine", "Sustainability & Green Chemistry"],
    description: "Digital Transformation, Personalised & Precision Medicine, Sustainability & Green Chemistry",
  },
  {
    id: "risks",
    title: "11. Risks & Challenges",
    selected: true,
    tags: ["Patent Expiries & Generic Erosion", "Regulatory & Pricing Pressures", "Supply Chain Disruptions"],
    description: "Patent Expiries & Generic Erosion, Regulatory & Pricing Pressures, Supply Chain Disruptions",
  },
  {
    id: "outlook",
    title: "12. Future Outlook & Strategic Recommendations",
    selected: true,
    tags: ["Market Forecasts & Scenarios", "Strategic Levers for Stakeholders", "Long-term Industry Trends"],
    description: "Market Forecasts & Scenarios, Strategic Levers for Stakeholders, Long-term Industry Trends",
  },
  {
    id: "appendices",
    title: "13. Appendices & Methodology",
    selected: true,
    tags: ["Data Sources & Assumptions", "Glossary of Terms & Abbreviations", "List of Figures & Tables"],
    description: "Data Sources & Assumptions, Glossary of Terms & Abbreviations, List of Figures & Tables",
  },
]

// Enhanced sample tables and charts with descriptions and categories
const sampleTablesAndCharts = [
  {
    id: "table1",
    type: "table",
    title: "Revenue by Region (2020-2023)",
    selected: true,
    description: "Quarterly breakdown of revenue across all geographic regions",
    category: "Financial",
  },
  {
    id: "table2",
    type: "table",
    title: "Cost Breakdown by Department",
    selected: false,
    description: "Detailed analysis of operational costs by department",
    category: "Financial",
  },
  {
    id: "chart1",
    type: "chart",
    title: "Market Share Comparison",
    selected: true,
    description: "Competitive analysis of market share across key players",
    category: "Market",
  },
  {
    id: "chart2",
    type: "chart",
    title: "Revenue Growth Trend (2019-2023)",
    selected: false,
    description: "Year-over-year revenue growth with quarterly breakdown",
    category: "Financial",
  },
  {
    id: "table3",
    type: "table",
    title: "Quarterly Financial Results",
    selected: false,
    description: "Comprehensive P&L statement with year-over-year comparison",
    category: "Financial",
  },
  {
    id: "chart3",
    type: "chart",
    title: "Product Category Performance",
    selected: true,
    description: "Sales performance across product categories with growth indicators",
    category: "Products",
  },
  {
    id: "table4",
    type: "table",
    title: "Employee Headcount by Department",
    selected: false,
    description: "Staffing levels across departments with YoY changes",
    category: "Operations",
  },
  {
    id: "chart4",
    type: "chart",
    title: "Customer Acquisition Cost Trend",
    selected: false,
    description: "Monthly CAC with channel attribution analysis",
    category: "Marketing",
  },
  {
    id: "chart5",
    type: "chart",
    title: "Regional Market Penetration",
    selected: false,
    description: "Heat map showing market penetration across regions",
    category: "Market",
  },
  {
    id: "table5",
    type: "table",
    title: "Key Risk Factors Assessment",
    selected: false,
    description: "Evaluation of major risk factors with impact ratings",
    category: "Risk",
  },
  {
    id: "chart6",
    type: "chart",
    title: "Customer Satisfaction Scores",
    selected: false,
    description: "NPS and CSAT scores tracked over the last 8 quarters",
    category: "Customer",
  },
  {
    id: "table6",
    type: "table",
    title: "Competitive Feature Comparison",
    selected: false,
    description: "Side-by-side comparison of features against competitors",
    category: "Market",
  },
  {
    id: "pie1",
    type: "chart",
    title: "Revenue Distribution by Product Line",
    selected: false,
    description: "Pie chart showing the percentage breakdown of revenue by product line",
    category: "Financial",
  },
  {
    id: "line1",
    type: "chart",
    title: "Monthly Active Users Trend",
    selected: false,
    description: "Line chart tracking the growth of monthly active users over time",
    category: "User Metrics",
  },
  {
    id: "table7",
    type: "table",
    title: "Regulatory Compliance Status",
    selected: false,
    description: "Status of compliance with key regulatory requirements by region",
    category: "Regulatory",
  },
]

export default function DocumentSummaryPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isSummaryComplete, setIsSummaryComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Document states
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([])
  const [documentSections, setDocumentSections] = useState(sampleDocumentSections)
  const [customSections, setCustomSections] = useState<
    Array<{
      id: string
      title: string
      selected: boolean
      tags: string[]
      description: string
    }>
  >([])
  const [tablesAndCharts, setTablesAndCharts] = useState(sampleTablesAndCharts)

  // Summary options
  const [summaryDepth, setSummaryDepth] = useState<"light" | "medium" | "deep">("medium")
  const [summaryOptions, setSummaryOptions] = useState({
    includeKeyQuotes: true,
    includeVisualElements: true,
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

  // Handle document upload/selection
  const handleDocumentUpload = (documentNames: string[]) => {
    setUploadedDocuments(documentNames)
    setCurrentStep(2) // Move to document indexing & instructions step

    // Add user message
    const documentsText = documentNames.join(", ")
    workflowEngine.addMessage("user", `I've selected these documents for summarization: ${documentsText}`)

    // Show loading message for document analysis
    workflowEngine.addLoadingMessage("Analyzing and indexing documents...")
    setMessages(workflowEngine.getMessages())

    // Simulate document analysis
    setTimeout(() => {
      workflowEngine.removeLoadingMessage()

      // Show document index with tags
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            📝 Your documents have been indexed and combined into a single document index. Below is the list of sections
            that have been automatically extracted. For each section, I've identified key topics as tags that you can
            customize to focus your summary.
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 2000)
  }

  // Handle document index with tags
  const handleIndexWithTags = (sections: typeof documentSections, custom: typeof customSections) => {
    setDocumentSections(sections)
    setCustomSections(custom)
    setCurrentStep(3) // Move to tables and charts selection step

    // Add user message
    const selectedSections = [...sections.filter((s) => s.selected).map((s) => s.title)]
    if (custom.length > 0) {
      selectedSections.push(...custom.map((s) => s.title))
    }

    workflowEngine.addMessage(
      "user",
      `I've customized the document index with these sections: ${selectedSections.join(", ")} and provided focus areas for each section.`,
    )

    // Show tables and charts selection UI
    const newId = workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">
          📊 I've found multiple tables and charts in your documents. Select the visual elements you want to include in
          your summary to help illustrate key data points and insights.
        </p>
      </div>,
      true,
    )

    setActiveCustomizationId(newId)
    setMessages(workflowEngine.getMessages())
  }

  // Handle tables and charts selection
  const handleTablesChartsSelection = (selectedItems: typeof tablesAndCharts) => {
    setTablesAndCharts(selectedItems)
    setCurrentStep(4) // Move to summary depth selection step

    // Add user message
    const selectedCount = selectedItems.filter((item) => item.selected).length
    workflowEngine.addMessage("user", `I've selected ${selectedCount} tables and charts to include in the summary.`)

    // Show summary depth selection UI
    const newId = workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">📄 How detailed should the summary be?</p>
      </div>,
      true,
    )

    setActiveCustomizationId(newId)
    setMessages(workflowEngine.getMessages())
  }

  // Handle summary depth selection
  const handleSummaryDepthSelection = (depth: "light" | "medium" | "deep") => {
    setSummaryDepth(depth)
    setCurrentStep(5) // Move to processing step

    // Add user message
    const depthText =
      depth === "light"
        ? "Light (key takeaways)"
        : depth === "medium"
          ? "Medium (key insights with elaboration)"
          : "Deep (detailed analysis)"

    workflowEngine.addMessage("user", `I want a ${depthText} summary.`)

    // Show processing message
    workflowEngine.addLoadingMessage("Generating your personalized summary now...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing steps
    setTimeout(() => {
      workflowEngine.updateLoadingMessage("Analyzing document content...")
      setMessages(workflowEngine.getMessages())

      setTimeout(() => {
        workflowEngine.updateLoadingMessage("Extracting key information from selected sections...")
        setMessages(workflowEngine.getMessages())

        setTimeout(() => {
          workflowEngine.updateLoadingMessage("Applying your custom focus areas to each section...")
          setMessages(workflowEngine.getMessages())

          setTimeout(() => {
            workflowEngine.updateLoadingMessage("Formatting summary and preparing output...")
            setMessages(workflowEngine.getMessages())

            setTimeout(() => {
              workflowEngine.removeLoadingMessage()
              showSummaryResults()
              setMessages(workflowEngine.getMessages())
            }, 1500)
          }, 1500)
        }, 1500)
      }, 1500)
    }, 1500)
  }

  // Show summary results
  const showSummaryResults = () => {
    setCurrentStep(6) // Move to results step
    setIsSummaryComplete(true)

    // Clear active customization before showing the final result
    workflowEngine.clearActiveCustomization()
    setActiveCustomizationId(null)

    workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">
          ✅ Your personalized summary is ready! You can download it as a PDF document or view the summary right here in
          the chat.
        </p>

        <SummaryResult
          documentNames={uploadedDocuments}
          sections={[...documentSections.filter((s) => s.selected), ...customSections.filter((s) => s.selected)]}
          tablesAndCharts={tablesAndCharts.filter((item) => item.selected)}
          summaryDepth={summaryDepth}
          summaryOptions={summaryOptions}
          onRestart={() => {
            // Reset the workflow
            const initialMessages = workflowEngine.initialize()
            setMessages(initialMessages)
            setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
            setCurrentStep(1)
            setIsSummaryComplete(false)
            setUploadedDocuments([])
            setDocumentSections(sampleDocumentSections)
            setCustomSections([])
            setTablesAndCharts(sampleTablesAndCharts)
            setSummaryDepth("medium")
            setSummaryOptions({
              includeKeyQuotes: true,
              includeVisualElements: true,
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
        return <DocumentUploader onUpload={handleDocumentUpload} allowMultiple={true} />
      case 2:
        return (
          <DocumentIndexWithTags
            documentSections={documentSections}
            customSections={customSections}
            onUpdateSections={setDocumentSections}
            onUpdateCustomSections={setCustomSections}
            onSubmit={handleIndexWithTags}
          />
        )
      case 3:
        return (
          <TableChartSelector
            tablesAndCharts={tablesAndCharts}
            onUpdateSelection={setTablesAndCharts}
            onSubmit={handleTablesChartsSelection}
          />
        )
      case 4:
        return (
          <SummaryDepthSelector
            depth={summaryDepth}
            onUpdateDepth={setSummaryDepth}
            options={summaryOptions}
            onUpdateOptions={setSummaryOptions}
            onSubmit={handleSummaryDepthSelection}
          />
        )
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
      <WorkflowHeader title="Personalized Summary Generator" breadcrumbs={[{ label: "Workflows", href: "/" }]} />

      {isMounted && (
        <>
          <ChatInterface
            messages={messagesWithCustomization}
            activeCustomizationId={activeCustomizationId}
            onEditMessage={handleEditMessage}
            contentContainerRef={contentContainerRef}
          />

          {isSummaryComplete && (
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
                        I'll help you with that. What specific aspect of the summary would you like to explore further?
                      </p>
                    </div>,
                  )
                  setMessages(workflowEngine.getMessages())
                }, 1000)
              }}
              placeholder="Ask a follow-up question about the generated summary..."
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}
