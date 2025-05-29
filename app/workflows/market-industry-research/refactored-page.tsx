"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { IndustrySelector } from "@/components/workflow/customization/industry-selector"
import { DataSourceSelector } from "@/components/workflow/customization/data-source-selector"
import { MetricsSelector } from "@/components/workflow/customization/metrics-selector"
import { ChartSelector } from "@/components/workflow/customization/chart-selector"
import { MarketReport } from "@/components/workflow/report/market-report"
import { WorkflowEngine } from "@/lib/workflow/workflow-engine"
import { industries, marketTrendData } from "@/lib/workflow/market-research-data"
import type { MessageProps } from "@/components/workflow/chat-message"

// Define the workflow configuration
const workflowConfig = {
  id: "market-industry-research",
  title: "Market & Industry Research Workflow",
  description: "Research and analyze industry trends and market conditions",
  steps: [
    {
      id: 1,
      title: "Select Industry",
      description: "Choose an industry to research",
    },
    {
      id: 2,
      title: "Define Region",
      description: "Specify the geographic focus",
    },
    {
      id: 3,
      title: "Select Data Sources",
      description: "Choose data sources for analysis",
    },
    {
      id: 4,
      title: "Select Metrics",
      description: "Choose performance metrics to analyze",
    },
    {
      id: 5,
      title: "Select Visualizations",
      description: "Choose chart types for data visualization",
    },
    {
      id: 6,
      title: "Review Insights",
      description: "Review the final analysis and insights",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">What industry or market are you exploring today?</p>
    </div>
  ),
}

export default function MarketIndustryResearchPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [selectedIndustry, setSelectedIndustry] = useState<(typeof industries)[0] | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const [selectedMetrics, setSelectedMetrics] = useState([
    "Revenue CAGR",
    "Gross Margin",
    "Customer Retention",
    "Unit Economics",
  ])

  const [selectedCharts, setSelectedCharts] = useState({
    marketGrowth: true,
    marketShare: true,
    retentionRate: true,
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

  // Handle industry selection
  const handleIndustrySelect = (industry: (typeof industries)[0]) => {
    setSelectedIndustry(industry)
    setCurrentStep(3) // Skip to step 3 (data sources)

    // Add user message
    workflowEngine.addMessage("user", `I want to research the ${industry.name} industry`)

    // Go directly to data sources step
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">Select data sources for your analysis:</p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Handle data source selection
  const handleDataSourceSelection = () => {
    // Add user message with specific data sources
    workflowEngine.addMessage(
      "user",
      "I'll use DPIIT, MCA, NITI Aayog, Tracxn, Pitchbook, Statista, McKinsey, BCG, Redseer, and NSE/BSE Filings as data sources",
    )

    // Show loading message
    workflowEngine.addLoadingMessage("Analyzing selected data sources...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing
    setTimeout(() => {
      workflowEngine.removeLoadingMessage()
      showKPISelection()
      setMessages(workflowEngine.getMessages())
    }, 1500)
  }

  // Show KPI selection
  const showKPISelection = () => {
    setCurrentStep(4)
    workflowEngine.setCurrentStep(4)

    const newId = workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">What performance metrics would you like to focus on?</p>
      </div>,
      true,
    )

    setActiveCustomizationId(newId)
    setMessages(workflowEngine.getMessages())
  }

  // Handle metrics selection and generate visuals
  const generateVisuals = () => {
    setCurrentStep(5)
    workflowEngine.setCurrentStep(5)

    // Add user message with specific metrics
    workflowEngine.addMessage("user", `Let's continue with these metrics: ${selectedMetrics.join(", ")}`)

    // Show loading message
    workflowEngine.addLoadingMessage("Analyzing data for visualization options...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing
    setTimeout(() => {
      workflowEngine.removeLoadingMessage()

      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">What types of charts would you like to include in your analysis?</p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 2000)
  }

  // Generate final insights
  const generateFinalInsights = () => {
    setCurrentStep(6)
    workflowEngine.setCurrentStep(6)

    // Create a list of selected chart names
    const selectedChartNames = []
    if (selectedCharts.marketGrowth) selectedChartNames.push("Market Size Growth")
    if (selectedCharts.marketShare) selectedChartNames.push("Market Share")
    if (selectedCharts.retentionRate) selectedChartNames.push("Retention Rate")

    // Add user message with selected charts
    workflowEngine.addMessage("user", `I want to include these charts: ${selectedChartNames.join(", ")}`)

    // Show loading message
    workflowEngine.addLoadingMessage("Compiling final insights and recommendations...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing
    setTimeout(() => {
      workflowEngine.removeLoadingMessage()
      setIsAnalysisComplete(true)

      // Get market data for Quick Commerce
      const marketData = marketTrendData["quick-commerce"]

      workflowEngine.addMessage(
        "system",
        <MarketReport
          marketData={marketData}
          selectedCharts={selectedCharts}
          onRestart={() => {
            // Reset the workflow
            const initialMessages = workflowEngine.initialize()
            setMessages(initialMessages)
            setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
            setCurrentStep(1)
            setIsAnalysisComplete(false)
          }}
        />,
      )

      setMessages(workflowEngine.getMessages())
    }, 2000)
  }

  // Handle editing a message
  const handleEditMessage = (messageId: string) => {
    workflowEngine.handleEditMessage(messageId)
    setMessages(workflowEngine.getMessages())
    setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
    setCurrentStep(workflowEngine.getCurrentStep())
  }

  // Handle chart selection
  const handleChartSelection = (chartType: string, selected: boolean) => {
    setSelectedCharts({
      ...selectedCharts,
      [chartType]: selected,
    })
  }

  // Handle metric selection/deselection
  const handleSelectMetric = (metric: string) => {
    if (!selectedMetrics.includes(metric)) {
      setSelectedMetrics([...selectedMetrics, metric])
    }
  }

  const handleDeselectMetric = (metric: string) => {
    setSelectedMetrics(selectedMetrics.filter((m) => m !== metric))
  }

  // Render customization content based on current step
  const renderCustomizationContent = () => {
    switch (currentStep) {
      case 1:
        return <IndustrySelector industries={industries} onSelect={handleIndustrySelect} />
      case 3:
        return <DataSourceSelector onContinue={handleDataSourceSelection} />
      case 4:
        return (
          <MetricsSelector
            selectedMetrics={selectedMetrics}
            onSelectMetric={handleSelectMetric}
            onDeselectMetric={handleDeselectMetric}
            onContinue={generateVisuals}
          />
        )
      case 5:
        return (
          <ChartSelector
            selectedCharts={selectedCharts}
            onSelectChart={handleChartSelection}
            onContinue={generateFinalInsights}
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
      <WorkflowHeader title="Market & Industry Research Workflow" breadcrumbs={[{ label: "Workflows", href: "/" }]} />

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
                // Handle follow-up questions here
                workflowEngine.addMessage("user", message)
                setMessages(workflowEngine.getMessages())

                // Simulate response
                setTimeout(() => {
                  workflowEngine.addMessage(
                    "system",
                    <div>
                      <p className="text-[#4e5971]">
                        I'll help you with that. What specific aspect of the analysis would you like to explore further?
                      </p>
                    </div>,
                  )
                  setMessages(workflowEngine.getMessages())
                }, 1000)
              }}
              placeholder="Tell us more about how you want to customize this output"
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}
