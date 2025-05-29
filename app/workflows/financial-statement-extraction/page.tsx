"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { DocumentUploader } from "@/components/workflow/customization/document-uploader"
import { ExtractionOptions } from "@/components/workflow/customization/extraction-options"
import { ExtractionResult } from "@/components/workflow/report/extraction-result"
import { WorkflowEngine } from "@/lib/workflow/workflow-engine"
import type { MessageProps } from "@/components/workflow/chat-message"

// Define the workflow configuration
const workflowConfig = {
  id: "financial-statement-extraction",
  title: "Financial Statement Extraction from PDF to Excel",
  description: "Extract financial statements from PDF documents and convert them to Excel format",
  steps: [
    {
      id: 1,
      title: "Upload Document",
      description: "Upload a PDF document containing financial statements",
    },
    {
      id: 2,
      title: "Select Extraction Options",
      description: "Choose how you want the financial statements to be extracted",
    },
    {
      id: 3,
      title: "Processing",
      description: "Extracting and processing financial statements",
    },
    {
      id: 4,
      title: "Review Results",
      description: "Review and download the extracted financial statements",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Welcome to the Financial Statement Extraction workflow. Please upload a PDF document containing financial
        statements that you'd like to convert to Excel format.
      </p>
    </div>
  ),
}

// Sample financial statements that would be "extracted"
const sampleFinancialStatements = {
  incomeStatement: {
    title: "Income Statement",
    data: [
      { item: "Revenue", "2022": 5250000, "2021": 4800000, "2020": 4200000 },
      { item: "Cost of Revenue", "2022": 2100000, "2021": 1920000, "2020": 1680000 },
      { item: "Gross Profit", "2022": 3150000, "2021": 2880000, "2020": 2520000 },
      { item: "Operating Expenses", "2022": 1575000, "2021": 1440000, "2020": 1260000 },
      { item: "Operating Income", "2022": 1575000, "2021": 1440000, "2020": 1260000 },
      { item: "Interest Expense", "2022": 210000, "2021": 192000, "2020": 168000 },
      { item: "Income Before Tax", "2022": 1365000, "2021": 1248000, "2020": 1092000 },
      { item: "Income Tax", "2022": 341250, "2021": 312000, "2020": 273000 },
      { item: "Net Income", "2022": 1023750, "2021": 936000, "2020": 819000 },
    ],
  },
  balanceSheet: {
    title: "Balance Sheet",
    data: [
      { item: "Cash and Cash Equivalents", "2022": 1500000, "2021": 1200000, "2020": 900000 },
      { item: "Accounts Receivable", "2022": 750000, "2021": 600000, "2020": 450000 },
      { item: "Inventory", "2022": 1000000, "2021": 800000, "2020": 600000 },
      { item: "Total Current Assets", "2022": 3250000, "2021": 2600000, "2020": 1950000 },
      { item: "Property, Plant and Equipment", "2022": 4500000, "2021": 4000000, "2020": 3500000 },
      { item: "Total Assets", "2022": 7750000, "2021": 6600000, "2020": 5450000 },
      { item: "Accounts Payable", "2022": 500000, "2021": 400000, "2020": 300000 },
      { item: "Short-term Debt", "2022": 750000, "2021": 600000, "2020": 450000 },
      { item: "Total Current Liabilities", "2022": 1250000, "2021": 1000000, "2020": 750000 },
      { item: "Long-term Debt", "2022": 2000000, "2021": 1800000, "2020": 1600000 },
      { item: "Total Liabilities", "2022": 3250000, "2021": 2800000, "2020": 2350000 },
      { item: "Shareholders' Equity", "2022": 4500000, "2021": 3800000, "2020": 3100000 },
      { item: "Total Liabilities and Equity", "2022": 7750000, "2021": 6600000, "2020": 5450000 },
    ],
  },
  cashFlow: {
    title: "Cash Flow Statement",
    data: [
      { item: "Net Income", "2022": 1023750, "2021": 936000, "2020": 819000 },
      { item: "Depreciation and Amortization", "2022": 450000, "2021": 400000, "2020": 350000 },
      { item: "Changes in Working Capital", "2022": -250000, "2021": -200000, "2020": -150000 },
      { item: "Cash from Operating Activities", "2022": 1223750, "2021": 1136000, "2020": 1019000 },
      { item: "Capital Expenditures", "2022": -950000, "2021": -900000, "2020": -850000 },
      { item: "Cash from Investing Activities", "2022": -950000, "2021": -900000, "2020": -850000 },
      { item: "Debt Issuance (Repayment)", "2022": 350000, "2021": 300000, "2020": 250000 },
      { item: "Dividends Paid", "2022": -323750, "2021": -236000, "2020": -119000 },
      { item: "Cash from Financing Activities", "2022": 26250, "2021": 64000, "2020": 131000 },
      { item: "Net Change in Cash", "2022": 300000, "2021": 300000, "2020": 300000 },
      { item: "Beginning Cash Balance", "2022": 1200000, "2021": 900000, "2020": 600000 },
      { item: "Ending Cash Balance", "2022": 1500000, "2021": 1200000, "2020": 900000 },
    ],
  },
}

export default function FinancialStatementExtractionPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isExtractionComplete, setIsExtractionComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [uploadedDocument, setUploadedDocument] = useState<string | null>(null)
  const [extractionOption, setExtractionOption] = useState<"single" | "separate">("single")

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
    setUploadedDocument(documentName)
    setCurrentStep(2) // Move to extraction options step

    // Add user message
    workflowEngine.addMessage("user", `I've uploaded ${documentName} for financial statement extraction`)

    // Show extraction options
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            Great! I've received your document. How would you like the financial statements to be extracted?
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Handle extraction option selection
  const handleExtractionOptionSelect = (option: "single" | "separate", statementTypes: string[]) => {
    setExtractionOption(option)
    setCurrentStep(3) // Move to processing step

    // Add user message
    workflowEngine.addMessage(
      "user",
      `I want the ${statementTypes.join(" and ")} financial statements in ${option === "single" ? "a single Excel file" : "separate Excel files"}`,
    )

    // Show processing message
    workflowEngine.addLoadingMessage("Analyzing document structure...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing steps
    setTimeout(() => {
      workflowEngine.updateLoadingMessage("Identifying financial tables...")
      setMessages(workflowEngine.getMessages())

      setTimeout(() => {
        workflowEngine.updateLoadingMessage("Extracting Income Statement...")
        setMessages(workflowEngine.getMessages())

        setTimeout(() => {
          workflowEngine.updateLoadingMessage("Extracting Balance Sheet...")
          setMessages(workflowEngine.getMessages())

          setTimeout(() => {
            workflowEngine.updateLoadingMessage("Extracting Cash Flow Statement...")
            setMessages(workflowEngine.getMessages())

            setTimeout(() => {
              workflowEngine.updateLoadingMessage("Formatting data and applying formulas...")
              setMessages(workflowEngine.getMessages())

              setTimeout(() => {
                workflowEngine.removeLoadingMessage()
                showExtractionResults()
                setMessages(workflowEngine.getMessages())
              }, 1500)
            }, 1500)
          }, 1500)
        }, 1500)
      }, 1500)
    }, 1500)
  }

  // Show extraction results
  const showExtractionResults = () => {
    setCurrentStep(4) // Move to results step
    setIsExtractionComplete(true)

    // Clear active customization before showing the final result
    workflowEngine.clearActiveCustomization()
    setActiveCustomizationId(null)

    workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">
          I've successfully extracted the financial statements from your document. Here's what I found:
        </p>

        <ExtractionResult
          financialStatements={sampleFinancialStatements}
          extractionOption={extractionOption}
          documentName={uploadedDocument || "financial_document.pdf"}
          onRestart={() => {
            // Reset the workflow
            const initialMessages = workflowEngine.initialize()
            setMessages(initialMessages)
            setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
            setCurrentStep(1)
            setIsExtractionComplete(false)
            setUploadedDocument(null)
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
        return <ExtractionOptions onSelect={handleExtractionOptionSelect} />
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
      <WorkflowHeader
        title="Financial Statement Extraction from PDF to Excel"
        breadcrumbs={[{ label: "Workflows", href: "/" }]}
      />

      {isMounted && (
        <>
          <ChatInterface
            messages={messagesWithCustomization}
            activeCustomizationId={activeCustomizationId}
            onEditMessage={handleEditMessage}
            contentContainerRef={contentContainerRef}
          />

          {isExtractionComplete && (
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
                        I'll help you with that. What specific aspect of the extraction would you like to explore
                        further?
                      </p>
                    </div>,
                  )
                  setMessages(workflowEngine.getMessages())
                }, 1000)
              }}
              placeholder="Ask a follow-up question about the extracted financial statements..."
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}
