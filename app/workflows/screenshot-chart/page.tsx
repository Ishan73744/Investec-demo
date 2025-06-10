"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { ScreenshotUploader } from "@/components/workflow/customization/screenshot-uploader"
import { ChartTypeSelector } from "@/components/workflow/customization/chart-type-selector"
import { ChartCustomization } from "@/components/workflow/customization/chart-customization"
import { ChartConversionResult } from "@/components/workflow/report/chart-conversion-result"
import { WorkflowEngine } from "@/lib/workflow/workflow-engine"
import type { MessageProps } from "@/components/workflow/chat-message"

// Define the workflow configuration
const workflowConfig = {
  id: "screenshot-chart",
  title: "Screenshot Chart to Excel",
  description: "Convert chart screenshots into editable Excel charts",
  steps: [
    {
      id: 1,
      title: "Upload Screenshot",
      description: "Upload a screenshot of the chart you want to convert",
    },
    {
      id: 2,
      title: "Confirm Chart Type",
      description: "Confirm or select the type of chart detected",
    },
    {
      id: 3,
      title: "Customize Chart",
      description: "Customize chart options and data labels",
    },
    {
      id: 4,
      title: "Processing",
      description: "Converting screenshot to Excel chart",
    },
    {
      id: 5,
      title: "Review Results",
      description: "Review and download the converted Excel chart",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Welcome to the Screenshot Chart to Excel workflow. Please upload a screenshot of any chart you'd like to convert
        into an editable Excel chart.
      </p>
    </div>
  ),
}

// Sample chart data that would be "extracted" from the screenshot
const sampleChartData = {
  type: "bar",
  title: "Quarterly Revenue by Product Line (2022-2023)",
  labels: ["Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022", "Q1 2023", "Q2 2023"],
  datasets: [
    {
      name: "Product A",
      data: [120000, 132000, 141000, 160000, 152000, 170000],
      color: "#4C6FFF",
    },
    {
      name: "Product B",
      data: [85000, 90000, 100000, 110000, 115000, 125000],
      color: "#05CD99",
    },
    {
      name: "Product C",
      data: [65000, 70000, 75000, 85000, 90000, 100000],
      color: "#FFB547",
    },
  ],
}

// Custom message component for user messages with images
function UserMessageWithImage({ content, imageSrc }: { content: string; imageSrc: string }) {
  return (
    <div className="flex flex-col items-end">
      <div className="mb-2 inline-block rounded-lg overflow-hidden border border-[#dee6f5] shadow-sm">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt="Uploaded chart"
          className="max-w-[300px] max-h-[200px] w-auto h-auto object-contain"
        />
      </div>
      <div className="inline-block bg-[#EAF0FC] text-[#001742] rounded-lg p-4 whitespace-nowrap">{content}</div>
    </div>
  )
}

export default function ScreenshotChartPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isConversionComplete, setIsConversionComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [uploadedScreenshot, setUploadedScreenshot] = useState<string | null>(null)
  const [chartType, setChartType] = useState<string>("bar")
  const [chartOptions, setChartOptions] = useState({
    includeDataTable: true,
    applyColorScheme: "default",
    addTrendlines: false,
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

  // Handle screenshot upload
  const handleScreenshotUpload = (screenshotName: string) => {
    setUploadedScreenshot(screenshotName)
    setCurrentStep(2) // Move to chart type confirmation step

    // Add user message with image
    const userMessageId = Date.now().toString()
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: userMessageId,
        role: "user",
        content: (
          <UserMessageWithImage
            content="I have uploaded a screenshot of a chart."
            imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Uhbyd7u9OY5oGlF1HzxG1LrIcoWPZe.png"
          />
        ),
        timestamp: new Date(),
      },
    ])

    // Show loading message for chart detection
    workflowEngine.addLoadingMessage("Analyzing screenshot and detecting chart type...")
    setMessages((prevMessages) => prevMessages)

    // Simulate chart detection
    setTimeout(() => {
      // Remove loading message
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.role !== "loading"))

      // Show chart type confirmation
      const newId = Date.now().toString()
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: newId,
          role: "system",
          content: (
            <div className="space-y-4">
              <p className="text-[#001742]">
                I've analyzed your screenshot and detected a <strong>bar chart</strong>. Is this correct, or would you
                like to select a different chart type?
              </p>
            </div>
          ),
          timestamp: new Date(),
          showCustomization: true,
        },
      ])

      setActiveCustomizationId(newId)
    }, 2000)
  }

  // Handle chart type selection
  const handleChartTypeSelect = (type: string) => {
    setChartType(type)
    setCurrentStep(3) // Move to chart customization step

    // Add user message
    const userMessageId = Date.now().toString()
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: userMessageId,
        role: "user",
        content: `Yes, it's a ${type} chart`,
        timestamp: new Date(),
      },
    ])

    // Show chart customization options
    setTimeout(() => {
      const newId = Date.now().toString()
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: newId,
          role: "system",
          content: (
            <div className="space-y-4">
              <p className="text-[#001742]">
                Great! Now you can customize how you want your Excel chart to be generated. Please select from the
                following options:
              </p>
            </div>
          ),
          timestamp: new Date(),
          showCustomization: true,
        },
      ])

      setActiveCustomizationId(newId)
    }, 500)
  }

  // Handle chart customization
  const handleChartCustomization = (options: typeof chartOptions) => {
    setChartOptions(options)
    setCurrentStep(4) // Move to processing step

    // Add user message
    const customizationDetails = []
    if (options.includeDataTable) customizationDetails.push("include data table")
    if (options.applyColorScheme !== "default")
      customizationDetails.push(`apply ${options.applyColorScheme} color scheme`)
    if (options.addTrendlines) customizationDetails.push("add trendlines")

    const userMessageId = Date.now().toString()
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: userMessageId,
        role: "user",
        content: `I want to ${customizationDetails.length > 0 ? customizationDetails.join(", ") : "proceed with default options"}`,
        timestamp: new Date(),
      },
    ])

    // Show processing message
    const loadingId = "loading"
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: loadingId,
        role: "loading",
        content: "Extracting data points from chart...",
        timestamp: new Date(),
      },
    ])

    // Simulate processing steps
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingId ? { ...msg, content: "Identifying axes and data series..." } : msg,
        ),
      )

      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === loadingId ? { ...msg, content: "Converting to Excel format..." } : msg,
          ),
        )

        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === loadingId ? { ...msg, content: "Applying formatting and customizations..." } : msg,
            ),
          )

          setTimeout(() => {
            // Remove loading message
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== loadingId))
            showConversionResults()
          }, 1500)
        }, 1500)
      }, 1500)
    }, 1500)
  }

  // Show conversion results
  const showConversionResults = () => {
    setCurrentStep(5) // Move to results step
    setIsConversionComplete(true)

    // Clear active customization
    setActiveCustomizationId(null)

    const resultId = Date.now().toString()
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: resultId,
        role: "system",
        content: (
          <div className="space-y-4">
            <p className="text-[#001742]">
              I've successfully converted your chart screenshot to an editable Excel chart. Here's the result:
            </p>

            <ChartConversionResult
              chartData={sampleChartData}
              chartType={chartType}
              chartOptions={chartOptions}
              screenshotName={uploadedScreenshot || "chart_screenshot.png"}
              onRestart={() => {
                // Reset the workflow
                setMessages([])
                const initialMessages = workflowEngine.initialize()
                setMessages(initialMessages)
                setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
                setCurrentStep(1)
                setIsConversionComplete(false)
                setUploadedScreenshot(null)
                setChartType("bar")
                setChartOptions({
                  includeDataTable: true,
                  applyColorScheme: "default",
                  addTrendlines: false,
                })
              }}
            />
          </div>
        ),
        timestamp: new Date(),
      },
    ])
  }

  // Render customization content based on current step
  const renderCustomizationContent = () => {
    switch (currentStep) {
      case 1:
        return <ScreenshotUploader onUpload={handleScreenshotUpload} />
      case 2:
        return <ChartTypeSelector onSelect={handleChartTypeSelect} detectedType={chartType} />
      case 3:
        return <ChartCustomization options={chartOptions} onSubmit={handleChartCustomization} />
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
      <WorkflowHeader title="Screenshot Chart to Excel" breadcrumbs={[{ label: "Workflows", href: "/" }]} />

      {isMounted && (
        <>
          <ChatInterface
            messages={messagesWithCustomization}
            activeCustomizationId={activeCustomizationId}
            onEditMessage={() => {}}
            contentContainerRef={contentContainerRef}
          />

          {isConversionComplete && (
            <ChatInput
              onSend={(message) => {
                // Handle follow-up questions here
                const userMessageId = Date.now().toString()
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    id: userMessageId,
                    role: "user",
                    content: message,
                    timestamp: new Date(),
                  },
                ])

                // Simulate response
                setTimeout(() => {
                  const responseId = Date.now().toString()
                  setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                      id: responseId,
                      role: "system",
                      content: (
                        <div>
                          <p className="text-[#4e5971]">
                            I'll help you with that. What specific aspect of the chart conversion would you like to
                            explore further?
                          </p>
                        </div>
                      ),
                      timestamp: new Date(),
                    },
                  ])
                }, 1000)
              }}
              placeholder="Ask a follow-up question about the converted chart..."
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}
