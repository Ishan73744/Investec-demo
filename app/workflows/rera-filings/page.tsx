"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { WorkflowEngine } from "@/components/workflow/workflow-engine"
import { RERAFilingsReport } from "@/components/workflow/report/rera-filings-report"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MessageProps } from "@/components/workflow/chat-message"

// Define the workflow configuration
const workflowConfig = {
  id: "rera-filings",
  title: "RERA Filings & Press Mentions",
  description: "Monitor regulatory disclosures and real-estate project filings",
  steps: [
    {
      id: 1,
      title: "Select Trigger Type & Entities",
      description: "Choose which types of filings to monitor and select entities",
    },
    {
      id: 2,
      title: "Set Time Frame",
      description: "Define the monitoring period",
    },
    {
      id: 3,
      title: "Processing",
      description: "Gathering and analyzing filings",
    },
    {
      id: 4,
      title: "Review Results",
      description: "Review the consolidated report",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Welcome to the RERA Filings & Press Mentions monitor. This workflow helps you track real-estate project filings
        (RERA) along with press mentions for your selected entities.
      </p>
      <p className="text-[#001742]">Let's start by selecting the trigger types and entities you want to monitor.</p>
    </div>
  ),
}

// Sample data for demonstration
const sampleRERAData = {
  generatedDate: "2025-04-30 09:15 IST",
  triggerTypes: ["RERA Filing", "Press Mention"],
  entities: ["Lodha", "Prestige", "Kotak", "H-CARE SPV I"],
  filings: [
    {
      date: "2025-04-28",
      entity: "Lodha",
      type: "Press Mention",
      detail: "Board Meeting Outcome: Approved Q1 results",
      compliance: "on-time",
      sourceLink: "https://example.com/press/…",
    },
    {
      date: "2025-04-29",
      entity: "Prestige",
      type: "RERA Filing",
      detail: 'Delay Notice: Project "Sunrise" delayed 2 months',
      compliance: "delayed",
      sourceLink: "https://rera.maha.gov.in/…",
    },
    {
      date: "2025-04-30",
      entity: "Kotak",
      type: "Press Mention",
      detail: "Change in Scope: Raised FPI limit to 75%",
      compliance: "on-time",
      sourceLink: "https://example.com/press/…",
    },
    {
      date: "2025-04-29",
      entity: "H-CARE SPV I",
      type: "RERA Filing",
      detail: "Plan Revision: Added 50 apartments to Phase II",
      compliance: "on-time",
      sourceLink: "https://rera.ka.gov.in/…",
    },
  ],
  detailedEntries: [
    {
      id: "lodha-1",
      entity: "Lodha",
      type: "Press Mention",
      date: "2025-04-28",
      title: "Board Meeting Outcome",
      details: {
        filingDate: "28 Apr 2025",
        receivedDate: "28 Apr 2025",
        dueDate: "30 Apr 2025",
        section: "Board Meeting Outcome",
        compliance: "on-time",
      },
      summary:
        "Board approved Q1 FY 25-26 financial results; revenue up 12% YoY, net profit ₹250 Cr. No dividend proposed.",
      fullTextExcerpt:
        "In the Board meeting held on 27 April 2025, the Board considered and approved the audited financial statements for the quarter ended 31 March 2025. The company recorded revenue of ₹1,500 Cr and net profit of ₹250 Cr…",
      sourcePDF: "https://example.com/press/…",
    },
    {
      id: "prestige-1",
      entity: "Prestige",
      type: "RERA Filing",
      date: "2025-04-29",
      title: "Delay Notice",
      details: {
        project: "Sunrise Towers",
        originalHandoverDate: "01 Jun 2025",
        revisedHandoverDate: "01 Aug 2025",
        noticeIssued: "29 Apr 2025",
        reason: "Supply-chain delays for imported fixtures",
        compliance: "delayed",
      },
      summary: "",
      fullTextExcerpt:
        "Pursuant to Rule 16 of the RERA Regulations, the promoter hereby informs that the project handover is delayed by 60 days due to unforeseen supply-chain constraints…",
      sourcePDF: "https://rera.maha.gov.in/…",
    },
    {
      id: "kotak-1",
      entity: "Kotak",
      type: "Press Mention",
      date: "2025-04-30",
      title: "Change in Scope",
      details: {
        filingDate: "30 Apr 2025",
        receivedDate: "30 Apr 2025",
        dueDate: "02 May 2025",
        section: "Change in Scope",
        compliance: "on-time",
      },
      summary:
        "Board approved increase in Foreign Portfolio Investment (FPI) limit from 49% to 75% of paid-up capital, subject to regulatory approvals.",
      fullTextExcerpt:
        "The Board of Directors has approved the increase in aggregate limit of investment by Foreign Portfolio Investors (FPIs) from 49% to 75% of the paid-up equity share capital, subject to necessary approvals from regulatory authorities...",
      sourcePDF: "https://example.com/press/…",
    },
    {
      id: "hcare-1",
      entity: "H-CARE SPV I",
      type: "RERA Filing",
      date: "2025-04-29",
      title: "Plan Revision",
      details: {
        project: "Urban Heights Phase II",
        filingType: "Plan Revision",
        filingDate: "29 Apr 2025",
        revisionType: "Project Expansion",
        compliance: "on-time",
      },
      summary:
        "Added 50 apartments (2BHK and 3BHK configurations) to Phase II of Urban Heights project. Total project size now 250 units. No change to completion timeline.",
      fullTextExcerpt:
        "The promoter hereby submits a revised plan for Urban Heights Phase II, adding 50 residential units (30 x 2BHK and 20 x 3BHK) to the previously approved plan. The additional units will be constructed within the existing project timeline with no delay to the completion date...",
      sourcePDF: "https://rera.ka.gov.in/…",
    },
  ],
}

// Entity selection component
function TriggerTypeAndEntitySelector({ onSubmit }: { onSubmit: (types: string[], entities: string[]) => void }) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["RERA Filings"])
  const [selectedEntities, setSelectedEntities] = useState<string[]>([])
  const [entityInput, setEntityInput] = useState("")

  const suggestedEntities = [
    "Lodha",
    "Prestige",
    "Kotak",
    "H-CARE SPV I",
    "Brigade",
    "Godrej Properties",
    "DLF",
    "Sobha",
  ]

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handleAddEntity = () => {
    if (entityInput && !selectedEntities.includes(entityInput)) {
      setSelectedEntities([...selectedEntities, entityInput])
      setEntityInput("")
    }
  }

  const handleRemoveEntity = (entity: string) => {
    setSelectedEntities(selectedEntities.filter((e) => e !== entity))
  }

  const handleSelectSuggestedEntity = (entity: string) => {
    if (!selectedEntities.includes(entity)) {
      setSelectedEntities([...selectedEntities, entity])
    }
  }

  const handleSubmit = () => {
    if (selectedTypes.length > 0 && selectedEntities.length > 0) {
      onSubmit(selectedTypes, selectedEntities)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#001742]">Filing Types</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rera-filings"
              checked={selectedTypes.includes("RERA Filings")}
              onCheckedChange={() => handleTypeToggle("RERA Filings")}
              className="border-[#dee6f5] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
            />
            <Label htmlFor="rera-filings" className="text-sm text-[#001742]">
              RERA Filings
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="press-mentions"
              checked={selectedTypes.includes("Press Mentions")}
              onCheckedChange={() => handleTypeToggle("Press Mentions")}
              className="border-[#dee6f5] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
            />
            <Label htmlFor="press-mentions" className="text-sm text-[#001742]">
              Press Mentions
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#001742]">Entities</h3>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Enter entity name..."
            value={entityInput}
            onChange={(e) => setEntityInput(e.target.value)}
            className="border-[#dee6f5] focus-visible:ring-[#004ce6]"
          />
          <Button
            onClick={handleAddEntity}
            disabled={!entityInput}
            className="bg-[#004ce6] hover:bg-[#0047cb] text-white"
          >
            Add
          </Button>
        </div>

        {/* Suggested entities */}
        <div className="flex flex-wrap gap-2">
          {suggestedEntities.map((entity) => (
            <Button
              key={entity}
              variant="outline"
              size="sm"
              onClick={() => handleSelectSuggestedEntity(entity)}
              className={`text-xs ${
                selectedEntities.includes(entity)
                  ? "bg-[#eaf0fc] text-[#004ce6] border-[#d9e4f7]"
                  : "text-[#6e7b96] border-[#dee6f5]"
              }`}
            >
              {entity}
            </Button>
          ))}
        </div>

        {/* Selected entities */}
        {selectedEntities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedEntities.map((entity) => (
              <div key={entity} className="flex items-center bg-[#eaf0fc] text-[#004ce6] px-2 py-1 rounded-md text-xs">
                {entity}
                <button onClick={() => handleRemoveEntity(entity)} className="ml-1 text-[#004ce6] hover:text-[#0047cb]">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={selectedTypes.length === 0 || selectedEntities.length === 0}
        className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
      >
        Continue
      </Button>
    </div>
  )
}

// Time frame selector component
function TimeFrameSelector({ onSubmit }: { onSubmit: (timeFrame: string) => void }) {
  const [timeFrame, setTimeFrame] = useState("7 days")

  const handleSubmit = () => {
    onSubmit(timeFrame)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#001742]">Date Range</h3>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-full border-[#dee6f5]">
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24 hours">Last 24 hours</SelectItem>
            <SelectItem value="7 days">Last 7 days</SelectItem>
            <SelectItem value="30 days">Last 30 days</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
      >
        Start Monitoring
      </Button>
    </div>
  )
}

export default function RERAFilingsPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isReportComplete, setIsReportComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Selected options
  const [selectedTriggerTypes, setSelectedTriggerTypes] = useState<string[]>([])
  const [selectedEntities, setSelectedEntities] = useState<string[]>([])
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("")

  // References
  const contentContainerRef = useRef<HTMLDivElement>(null)

  // Initialize the workflow
  useEffect(() => {
    setIsMounted(true)
    const initialMessages = workflowEngine.initialize()
    setMessages(initialMessages)
    setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
  }, [])

  // Handle trigger type and entity selection
  const handleTriggerAndEntitySelection = (types: string[], entities: string[]) => {
    setSelectedTriggerTypes(types)
    setSelectedEntities(entities)
    setCurrentStep(2) // Move to time frame selection step

    // Add user message
    workflowEngine.addMessage(
      "user",
      `I'd like to monitor ${types.join(" and ")} for the following entities: ${entities.join(", ")}`,
    )

    // Show time frame selection
    setTimeout(() => {
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            Great! Now, let's set the time frame for monitoring these filings and mentions.
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 500)
  }

  // Handle time frame selection
  const handleTimeFrameSelection = (timeFrame: string) => {
    setSelectedTimeFrame(timeFrame)
    setCurrentStep(3) // Move to processing step

    // Add user message
    workflowEngine.addMessage("user", `I want to monitor for the last ${timeFrame}`)

    // Show processing message
    workflowEngine.addLoadingMessage("Searching for RERA filings...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing steps
    setTimeout(() => {
      workflowEngine.updateLoadingMessage("Analyzing compliance status...")
      setMessages(workflowEngine.getMessages())

      setTimeout(() => {
        workflowEngine.updateLoadingMessage("Compiling monitoring report...")
        setMessages(workflowEngine.getMessages())

        setTimeout(() => {
          workflowEngine.removeLoadingMessage()
          showReportResults()
          setMessages(workflowEngine.getMessages())
        }, 1500)
      }, 1500)
    }, 1500)
  }

  // Show report results
  const showReportResults = () => {
    setCurrentStep(4) // Move to results step
    setIsReportComplete(true)

    // Clear active customization before showing the final result
    if (typeof workflowEngine.clearActiveCustomization === "function") {
      workflowEngine.clearActiveCustomization()
    } else {
      // Fallback: directly set the activeCustomizationId to null
      workflowEngine.activeCustomizationId = null
      console.log("Cleared active customization ID using fallback")
    }
    setActiveCustomizationId(null)

    workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">
          Your RERA filings monitoring report has been generated. Here's a summary of the findings:
        </p>

        <RERAFilingsReport
          data={sampleRERAData}
          onRestart={() => {
            // Reset the workflow
            const initialMessages = workflowEngine.initialize()
            setMessages(initialMessages)
            setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
            setCurrentStep(1)
            setIsReportComplete(false)
            setSelectedTriggerTypes([])
            setSelectedEntities([])
            setSelectedTimeFrame("")
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
        return <TriggerTypeAndEntitySelector onSubmit={handleTriggerAndEntitySelection} />
      case 2:
        return <TimeFrameSelector onSubmit={handleTimeFrameSelection} />
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
      <WorkflowHeader title="RERA Filings & Press Mentions" breadcrumbs={[{ label: "Workflows", href: "/" }]} />

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
                        I'd be happy to provide additional insights on the RERA filings. What specific information would
                        you like me to elaborate on?
                      </p>
                    </div>,
                  )
                  setMessages(workflowEngine.getMessages())
                }, 1000)
              }}
              placeholder="Ask a follow-up question about the RERA filings report..."
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}
