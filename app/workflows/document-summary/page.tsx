"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { DocumentUploader } from "@/components/workflow/customization/document-uploader"
import { SummaryCustomization } from "@/components/workflow/customization/summary-customization"
import { SummaryResult } from "@/components/workflow/report/summary-result"
import { WorkflowEngine } from "@/components/workflow/workflow-engine"
import type { MessageProps } from "@/components/workflow/chat-message"

// Define the workflow configuration
const workflowConfig = {
  id: "document-summary",
  title: "Personalized Document Summary Generator",
  description: "Generate customized summaries from uploaded documents",
  steps: [
    {
      id: 1,
      title: "Upload Document",
      description: "Upload a document you want to summarize",
    },
    {
      id: 2,
      title: "Customize Summary",
      description: "Select sections and customize summary options",
    },
    {
      id: 3,
      title: "Processing",
      description: "Analyzing document and generating summary",
    },
    {
      id: 4,
      title: "Review Results",
      description: "Review and download the generated summary",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Welcome to the Personalized Document Summary Generator. Please upload a document (PDF, Word, PowerPoint, etc.)
        that you'd like to summarize.
      </p>
    </div>
  ),
}

// Sample document sections that would be "detected" from the uploaded document
const sampleDocumentSections = [
  { id: "executive", title: "Executive Summary", selected: true },
  { id: "introduction", title: "Introduction", selected: true },
  { id: "methodology", title: "Methodology", selected: true },
  { id: "findings", title: "Key Findings", selected: true },
  { id: "market_analysis", title: "Market Analysis", selected: true },
  { id: "financial_projections", title: "Financial Projections", selected: true },
  { id: "recommendations", title: "Recommendations", selected: true },
  { id: "conclusion", title: "Conclusion", selected: true },
  { id: "appendix", title: "Appendix", selected: false },
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
  const [uploadedDocument, setUploadedDocument] = useState<string | null>(null)
  const [documentSections, setDocumentSections] = useState(sampleDocumentSections)
  const [customSections, setCustomSections] = useState<Array<{ id: string; title: string; description: string }>>([])
  const [summaryOptions, setSummaryOptions] = useState({
    length: "medium", // short, medium, detailed
    tone: "professional", // professional, casual, academic
    includeKeyQuotes: true,
    includeVisualElements: false,
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
    setUploadedDocument(documentName)
    setCurrentStep(2) // Move to summary customization step

    // Add user message
    workflowEngine.addMessage("user", `I've uploaded ${documentName} for summarization`)

    // Show loading message for document analysis
    workflowEngine.addLoadingMessage("Analyzing document structure and content...")
    setMessages(workflowEngine.getMessages())

    // Simulate document analysis
    setTimeout(() => {
      workflowEngine.removeLoadingMessage()

      // Show summary customization options
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            I've analyzed your document and identified several sections. Please customize which sections you'd like to
            include in the summary and adjust other options:
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 2000)
  }

  // Handle summary customization
  const handleSummaryCustomization = (
    sections: typeof documentSections,
    custom: typeof customSections,
    options: typeof summaryOptions,
  ) => {
    setDocumentSections(sections)
    setCustomSections(custom)
    setSummaryOptions(options)
    setCurrentStep(3) // Move to processing step

    // Add user message with customization details
    const selectedSections = [...sections.filter((s) => s.selected).map((s) => s.title)]
    if (custom.length > 0) {
      selectedSections.push(...custom.map((s) => s.title))
    }

    workflowEngine.addMessage(
      "user",
      `I want a ${options.length} ${options.tone} summary including these sections: ${selectedSections.join(
        ", ",
      )}. ${options.includeKeyQuotes ? "Include key quotes. " : ""}${
        options.includeVisualElements ? "Include visual elements." : ""
      }`,
    )

    // Show processing message
    workflowEngine.addLoadingMessage("Analyzing document content...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing steps
    setTimeout(() => {
      workflowEngine.updateLoadingMessage("Extracting key information from selected sections...")
      setMessages(workflowEngine.getMessages())

      setTimeout(() => {
        workflowEngine.updateLoadingMessage("Generating summary with specified parameters...")
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
  }

  // Show summary results
  const showSummaryResults = () => {
    setCurrentStep(4) // Move to results step
    setIsSummaryComplete(true)

    // Clear active customization before showing the final result
    workflowEngine.clearActiveCustomization()
    setActiveCustomizationId(null)

    workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">
          I've generated a personalized summary of your document based on your preferences. Here's the result:
        </p>

        <SummaryResult
          documentName={uploadedDocument || "document.pdf"}
          sections={documentSections.filter((s) => s.selected)}
          customSections={customSections}
          summaryOptions={summaryOptions}
          onRestart={() => {
            // Reset the workflow
            const initialMessages = workflowEngine.initialize()
            setMessages(initialMessages)
            setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
            setCurrentStep(1)
            setIsSummaryComplete(false)
            setUploadedDocument(null)
            setDocumentSections(sampleDocumentSections)
            setCustomSections([])
            setSummaryOptions({
              length: "medium",
              tone: "professional",
              includeKeyQuotes: true,
              includeVisualElements: false,
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
        return (
          <SummaryCustomization
            documentSections={documentSections}
            customSections={customSections}
            summaryOptions={summaryOptions}
            onUpdateSections={setDocumentSections}
            onUpdateCustomSections={setCustomSections}
            onUpdateOptions={setSummaryOptions}
            onSubmit={handleSummaryCustomization}
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
      <WorkflowHeader
        title="Personalized Document Summary Generator"
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
