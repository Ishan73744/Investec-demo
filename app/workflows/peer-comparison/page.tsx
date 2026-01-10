"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { WorkflowEngine } from "@/lib/workflow/workflow-engine"
import type { MessageProps } from "@/components/workflow/chat-message"
import { CompanySearchInput } from "@/components/workflow/customization/company-search-input"
import { PeerSelector } from "@/components/workflow/customization/peer-selector"
import { PeerComparisonReport } from "@/components/workflow/report/peer-comparison-report"
import { AnalysisOptionsSelector } from "@/components/workflow/customization/analysis-options-selector"

// Define the workflow configuration
const workflowConfig = {
  id: "peer-comparison",
  title: "Peer Comparison Analysis",
  description: "Compare companies against their industry peers across key financial and operational metrics",
  steps: [
    {
      id: 1,
      title: "Select Primary Company",
      description: "Choose the main company you want to analyze",
    },
    {
      id: 2,
      title: "Build Comparison Table",
      description: "Add peer companies and select metrics for comparison",
    },
    {
      id: 3,
      title: "Analysis Options",
      description: "Choose detail level and time period for analysis",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Welcome to Peer Comparison Analysis. Let's start by selecting the primary company you'd like to analyze against
        its peers.
      </p>
    </div>
  ),
}

// Sample company data for suggestions
const companies = [
  { id: "reliance", name: "Reliance Industries Limited", sector: "Oil & Gas", marketCap: "₹18,50,000 Cr" },
  { id: "tcs", name: "Tata Consultancy Services", sector: "IT Services", marketCap: "₹14,20,000 Cr" },
  { id: "hdfc-bank", name: "HDFC Bank Limited", sector: "Banking", marketCap: "₹12,80,000 Cr" },
  { id: "infosys", name: "Infosys Limited", sector: "IT Services", marketCap: "₹7,45,000 Cr" },
  { id: "icici-bank", name: "ICICI Bank Limited", sector: "Banking", marketCap: "₹7,20,000 Cr" },
  { id: "bharti-airtel", name: "Bharti Airtel Limited", sector: "Telecom", marketCap: "₹6,80,000 Cr" },
  { id: "wipro", name: "Wipro Limited", sector: "IT Services", marketCap: "₹3,20,000 Cr" },
  { id: "axis-bank", name: "Axis Bank Limited", sector: "Banking", marketCap: "₹3,10,000 Cr" },
  { id: "aarti-drugs", name: "Aarti Drugs Limited", sector: "Pharmaceuticals", marketCap: "₹4,650 Cr" },
  { id: "sun-pharma", name: "Sun Pharmaceutical Industries", sector: "Pharmaceuticals", marketCap: "₹2,85,000 Cr" },
]

export default function PeerComparisonPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Analysis state
  const [primaryCompany, setPrimaryCompany] = useState<(typeof companies)[0] | null>(null)
  const [selectedPeers, setSelectedPeers] = useState<typeof companies>([])
  const [selectedMetrics, setSelectedMetrics] = useState(["Revenue Growth", "Profit Margins", "ROE", "Debt-to-Equity"])
  const [timePeriod, setTimePeriod] = useState({
    period: "3-years",
    quarters: 12,
  })

  const [analysisOptions, setAnalysisOptions] = useState({
    includeInfographics: true,
    includeCharts: true,
    includeDetailedAnalysis: true,
    dateRange: {
      period: "3-years",
      quarters: 12,
    },
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

  // Handle primary company selection
  const handlePrimaryCompanySelect = (companyName: string) => {
    const company =
      companies.find(
        (c) =>
          c.name.toLowerCase().includes(companyName.toLowerCase()) ||
          companyName.toLowerCase().includes(c.name.toLowerCase().split(" ")[0]),
      ) || companies[0] // Default fallback

    setPrimaryCompany(company)
    setCurrentStep(2)

    // Add user message
    workflowEngine.addMessage("user", `I want to analyze ${company.name}`)

    // Move to peer selection
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            Great! Now let's select peer companies to compare {company.name} against. I'll suggest companies from the
            same sector and similar market cap.
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Handle peer selection
  const handlePeerSelection = (peers: typeof companies) => {
    setSelectedPeers(peers)
    setCurrentStep(3)

    // Add user message
    const peerNames = peers.map((p) => p.name).join(", ")
    workflowEngine.addMessage("user", `Comparison table configured with ${peers.length} peers`)

    // Move to analysis options
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            Perfect! Now let's configure the analysis options. Choose the level of detail and time period for your peer
            comparison.
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Handle metrics selection
  const handleMetricsSelection = (metrics: string[]) => {
    setSelectedMetrics(metrics)
    setCurrentStep(4)

    // Add user message
    workflowEngine.addMessage("user", `Let's analyze these metrics: ${metrics.join(", ")}`)

    // Move to time period selection
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">Excellent! Finally, let's set the time period for our analysis.</p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Handle time period selection and generate analysis
  const handleTimePeriodSelection = (period: { period: string; quarters: number }) => {
    setTimePeriod(period)
    setCurrentStep(5)

    // Add user message
    workflowEngine.addMessage("user", `Analyze over the last ${period.period}`)

    // Show loading message
    workflowEngine.addLoadingMessage("Gathering financial data for all companies...")
    setMessages(workflowEngine.getMessages())

    // Simulate analysis process
    const analysisSteps = [
      "Collecting financial statements...",
      "Calculating key metrics...",
      "Performing peer benchmarking...",
      "Generating comparative analysis...",
      "Creating visualizations...",
    ]

    let stepIndex = 1
    const interval = setInterval(() => {
      if (stepIndex < analysisSteps.length) {
        workflowEngine.updateLoadingMessage(analysisSteps[stepIndex])
        setMessages(workflowEngine.getMessages())
        stepIndex++
      } else {
        clearInterval(interval)
        workflowEngine.removeLoadingMessage()
        showComparisonResults()
      }
    }, 1500)
  }

  // Add new function to handle analysis options
  const handleAnalysisOptions = (options: typeof analysisOptions) => {
    setAnalysisOptions(options)

    // Add user message
    workflowEngine.addMessage(
      "user",
      `Analysis configured: ${options.dateRange.period}, ${options.includeInfographics ? "with" : "without"} infographics`,
    )

    // Show loading message
    workflowEngine.addLoadingMessage("Gathering financial data for all companies...")
    setMessages(workflowEngine.getMessages())

    // Simulate analysis process
    const analysisSteps = [
      "Collecting financial statements...",
      "Calculating key metrics...",
      "Performing peer benchmarking...",
      "Generating comparative analysis...",
      "Creating visualizations...",
    ]

    let stepIndex = 1
    const interval = setInterval(() => {
      if (stepIndex < analysisSteps.length) {
        workflowEngine.updateLoadingMessage(analysisSteps[stepIndex])
        setMessages(workflowEngine.getMessages())
        stepIndex++
      } else {
        clearInterval(interval)
        workflowEngine.removeLoadingMessage()
        showComparisonResults()
      }
    }, 1500)
  }

  // Show comparison results
  const showComparisonResults = () => {
    setIsAnalysisComplete(true)

    // Clear active customization before showing results
    workflowEngine.clearActiveCustomization()
    setActiveCustomizationId(null)

    // Add the final report
    workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">
          Your peer comparison analysis is ready! Here's how {primaryCompany?.name} stacks up against its peers.
        </p>
        <PeerComparisonReport
          primaryCompany={primaryCompany!}
          peerCompanies={selectedPeers}
          selectedMetrics={selectedMetrics}
          timePeriod={timePeriod}
          onRestart={() => {
            // Reset the workflow
            const initialMessages = workflowEngine.initialize()
            setMessages(initialMessages)
            setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
            setCurrentStep(1)
            setIsAnalysisComplete(false)
            setPrimaryCompany(null)
            setSelectedPeers([])
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
        return (
          <CompanySearchInput
            companies={companies}
            onSelect={handlePrimaryCompanySelect}
            placeholder="Search for a company to analyze..."
          />
        )
      case 2:
        return (
          <PeerSelector
            primaryCompany={primaryCompany!}
            availableCompanies={companies}
            selectedPeers={selectedPeers}
            onPeerSelection={handlePeerSelection}
          />
        )
      case 3:
        return <AnalysisOptionsSelector selectedOptions={analysisOptions} onOptionsChange={handleAnalysisOptions} />
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
      <WorkflowHeader title="Peer Comparison Analysis" breadcrumbs={[{ label: "Workflows", href: "/" }]} />

      {isMounted && (
        <>
          <ChatInterface
            messages={messagesWithCustomization}
            activeCustomizationId={activeCustomizationId}
            onEditMessage={handleEditMessage}
            contentContainerRef={contentContainerRef}
          />

          {isAnalysisComplete && (
            <ChatInput
              onSend={(message) => {
                // Handle follow-up questions
                workflowEngine.addMessage("user", message)
                setMessages(workflowEngine.getMessages())

                // Simulate response
                setTimeout(() => {
                  workflowEngine.addMessage(
                    "system",
                    <div>
                      <p className="text-[#4e5971]">
                        I'll help you dive deeper into the comparison. What specific aspect would you like to explore
                        further?
                      </p>
                    </div>,
                  )
                  setMessages(workflowEngine.getMessages())
                }, 1000)
              }}
              placeholder="Ask follow-up questions about the peer comparison..."
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}
