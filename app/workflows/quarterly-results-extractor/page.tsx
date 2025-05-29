"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { CompanySelector } from "@/components/workflow/customization/company-selector"
import { FileSourceSelector } from "@/components/workflow/customization/file-source-selector"
import { MetricsSelector } from "@/components/workflow/customization/metrics-selector"
import { QuarterlyResultsReport } from "@/components/workflow/report/quarterly-results-report"
import { WorkflowEngine } from "@/lib/workflow/workflow-engine"
import type { MessageProps } from "@/components/workflow/chat-message"

// Define the workflow configuration
const workflowConfig = {
  id: "quarterly-results-extractor",
  title: "Quarterly Results Extractor",
  description: "Extract key financial metrics and commentary from quarterly filings",
  steps: [
    {
      id: 1,
      title: "Select Companies",
      description: "Choose the companies to extract quarterly results for",
    },
    {
      id: 2,
      title: "Choose Source",
      description: "Auto-fetch filings or upload your own PDFs",
    },
    {
      id: 3,
      title: "Select Metrics",
      description: "Choose which metrics and commentary to extract",
    },
    {
      id: 4,
      title: "Review & Generate",
      description: "Confirm your selections and generate the report",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Welcome to the Quarterly Results Extractor. Please select the companies you'd like to analyze.
      </p>
    </div>
  ),
}

export default function QuarterlyResultsExtractorPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isReportComplete, setIsReportComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedSource, setSelectedSource] = useState<string>("auto-fetch")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "Units Sold",
    "Collections (₹ Cr)",
    "Net Debt / EBITDA",
    "Management Commentary",
  ])

  // References
  const contentContainerRef = useRef<HTMLDivElement>(null)

  // Initialize the workflow
  useEffect(() => {
    setIsMounted(true)
    const initialMessages = workflowEngine.initialize()
    setMessages(initialMessages)
    setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
  }, [])

  // Handle company selection
  const handleCompanySelection = (companies: string[]) => {
    setSelectedCompanies(companies)
    setCurrentStep(2) // Move to source selection step

    // Add user message
    workflowEngine.addMessage("user", `I want to extract quarterly results for: ${companies.join(", ")}`)

    // Show source selection
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            Would you like me to auto-fetch the latest quarterly results or upload your own PDFs?
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Handle source selection
  const handleSourceSelection = (source: "auto-fetch" | "upload", files?: File[]) => {
    setSelectedSource(source)
    setCurrentStep(3) // Move to metrics selection step

    // Add user message
    const sourceText =
      source === "auto-fetch"
        ? "Please auto-fetch the latest quarterly results"
        : `I'll upload ${files?.length} PDF file(s)`

    workflowEngine.addMessage("user", sourceText)

    // Show metrics selection
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">Select the metrics and commentary you'd like to extract:</p>
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
    setCurrentStep(4) // Move to confirmation step

    // Add user message
    workflowEngine.addMessage("user", `I want to extract these metrics: ${metrics.join(", ")}`)

    // Show confirmation
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">Here's your setup:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Companies:</span> {selectedCompanies.join(", ")}
            </li>
            <li>
              <span className="font-medium">Source:</span>{" "}
              {selectedSource === "auto-fetch" ? "Auto-fetched Q1 FY26 PDFs" : "Uploaded PDFs"}
            </li>
            <li>
              <span className="font-medium">Metrics:</span> {metrics.join(", ")}
            </li>
          </ul>
          <p className="mt-4">Ready to generate your report?</p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Generate final report
  const generateReport = () => {
    // Add user message
    workflowEngine.addMessage("user", "Confirm and generate the report")

    // Show loading message
    workflowEngine.addLoadingMessage("Extracting data and building your workbook...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing
    setTimeout(() => {
      workflowEngine.removeLoadingMessage()

      // Clear active customization before showing the final report
      workflowEngine.clearActiveCustomization()
      setActiveCustomizationId(null)

      setIsReportComplete(true)

      // Add the final report message
      workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">Your quarterly results report is ready!</p>
          <QuarterlyResultsReport
            companies={selectedCompanies}
            metrics={selectedMetrics}
            onRestart={() => {
              // Reset the workflow
              const initialMessages = workflowEngine.initialize()
              setMessages(initialMessages)
              setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
              setCurrentStep(1)
              setIsReportComplete(false)
              setSelectedCompanies([])
              setSelectedSource("auto-fetch")
            }}
          />
        </div>,
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

  // Render customization content based on current step
  const renderCustomizationContent = () => {
    switch (currentStep) {
      case 1:
        return <CompanySelector onSelect={handleCompanySelection} />
      case 2:
        return <FileSourceSelector onSelect={handleSourceSelection} />
      case 3:
        return <MetricsSelector defaultMetrics={selectedMetrics} onSelect={handleMetricsSelection} />
      case 4:
        return (
          <div className="flex gap-3 mt-2">
            <button
              onClick={generateReport}
              className="px-4 py-2 bg-[#004ce6] text-white rounded-md hover:bg-[#003bb2] transition-colors"
            >
              Generate Report
            </button>
            <button
              onClick={() => {
                // Reset the workflow
                const initialMessages = workflowEngine.initialize()
                setMessages(initialMessages)
                setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
                setCurrentStep(1)
                setIsReportComplete(false)
                setSelectedCompanies([])
                setSelectedSource("auto-fetch")
              }}
              className="px-4 py-2 border border-[#dee6f5] rounded-md hover:bg-[#f4f9ff] transition-colors"
            >
              Start Over
            </button>
          </div>
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
      <WorkflowHeader title="Quarterly Results Extractor" breadcrumbs={[{ label: "Workflows", href: "/" }]} />

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
                        I'll help you with that. What specific aspect of the quarterly results would you like to explore
                        further?
                      </p>
                    </div>,
                  )
                  setMessages(workflowEngine.getMessages())
                }, 1000)
              }}
              placeholder="Ask a follow-up question about the quarterly results..."
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}
