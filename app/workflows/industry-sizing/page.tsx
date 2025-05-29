"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { WorkflowEngine } from "@/lib/workflow/workflow-engine"
import type { MessageProps } from "@/components/workflow/chat-message"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, FileText, BarChart, PieChart, LineChart } from "lucide-react"

// Import the necessary components for the slider
import { Slider } from "@/components/ui/slider"
import { DownloadIcon } from "lucide-react"

// Import the QuickCommerceReport component
import { QuickCommerceReport } from "@/components/workflow/report/quick-commerce-report"

// Define the workflow configuration
const workflowConfig = {
  id: "industry-sizing",
  title: "Industry Sizing and Market Segmentation Report Generation",
  description:
    "Automate industry analysis by pulling data from DRHPs, Euromonitor, and news sources to generate segmented industry reports",
  steps: [
    {
      id: 1,
      title: "Data Collection",
      description: "Fetch the latest industry reports from various sources",
    },
    {
      id: 2,
      title: "Data Segmentation and Extraction",
      description: "Analyze content and extract market segments using NLP",
    },
    {
      id: 3,
      title: "Market Sizing and Forecasting",
      description: "Calculate current market size and forecast growth",
    },
    {
      id: 4,
      title: "Report Generation and Visualization",
      description: "Generate comprehensive report with visualizations",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Welcome to the Industry Sizing and Market Segmentation Report Generation workflow. This tool automates industry
        analysis by pulling data from DRHPs, Euromonitor, and news sources to generate segmented industry reports.
      </p>
      <p className="text-[#001742]">Let's start by selecting an industry for analysis.</p>
    </div>
  ),
}

// Sample industries for selection
const industries = [
  { id: "pet-care", name: "Pet Care", icon: "🐾" },
  { id: "quick-commerce", name: "Quick Commerce", icon: "🛒" },
  { id: "ev-market", name: "Electric Vehicles", icon: "🚗" },
  { id: "fintech", name: "Financial Technology", icon: "💳" },
  { id: "edtech", name: "Education Technology", icon: "📚" },
  { id: "healthcare", name: "Healthcare", icon: "🏥" },
]

// Update the dataSources array to remove the "Analyst Reports" option
const dataSources = [
  { id: "drhp", name: "DRHP Reports", count: 12, lastUpdated: "2 days ago" },
  { id: "euromonitor", name: "Euromonitor", count: 8, lastUpdated: "1 day ago" },
  { id: "news", name: "News Sources", count: 24, lastUpdated: "Today" },
]

// Sample market segments for Pet Care industry
const petCareSegments = [
  { id: "dog-food", name: "Dog Food", size: 4.2, growth: 8.5, unit: "billion USD" },
  { id: "cat-food", name: "Cat Food", size: 3.8, growth: 7.2, unit: "billion USD" },
  { id: "pet-accessories", name: "Pet Accessories", size: 2.1, growth: 9.1, unit: "billion USD" },
  { id: "pet-grooming", name: "Pet Grooming", size: 1.5, growth: 12.3, unit: "billion USD" },
  { id: "pet-healthcare", name: "Pet Healthcare", size: 3.2, growth: 10.5, unit: "billion USD" },
  { id: "other", name: "Other Pet Products", size: 0.9, growth: 5.2, unit: "billion USD" },
]

// Sample report data
const reportData = {
  title: "Pet Care Industry Market Segmentation Report",
  summary:
    "The global pet care market is experiencing robust growth, driven by increasing pet ownership, premiumization trends, and growing awareness of pet health and wellness. This report provides a detailed analysis of key market segments, growth drivers, and future projections.",
  totalMarketSize: 15.7,
  cagr: 8.9,
  forecastPeriod: "2023-2028",
  keyInsights: [
    "Premium pet food segment shows highest growth rate at 12.3% CAGR",
    "E-commerce channels gaining significant market share in pet product distribution",
    "Pet healthcare segment expected to grow due to increasing focus on preventive care",
    "Emerging markets in Asia-Pacific region present substantial growth opportunities",
  ],
}

// Sample market trend data
const marketTrendData = {
  "quick-commerce": {
    title: "Quick Commerce Market Segmentation Report",
    summary:
      "The quick commerce market is rapidly expanding, driven by increasing demand for on-demand delivery services and changing consumer preferences. This report provides a detailed analysis of key market segments, growth drivers, and future projections.",
    totalMarketSize: 50,
    cagr: 15.2,
    forecastPeriod: "2023-2028",
    keyInsights: [
      "Last-mile delivery segment shows highest growth rate at 18.5% CAGR",
      "Mobile commerce platforms gaining significant market share in quick commerce distribution",
      "Urban areas expected to drive growth due to high population density",
      "Partnerships with local retailers present substantial growth opportunities",
    ],
  },
}

export default function IndustrySizingPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isReportComplete, setIsReportComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [segments, setSegments] = useState<typeof petCareSegments>([])

  // Add state for custom segments
  const [customSegments, setCustomSegments] = useState<
    Array<{
      id: string
      name: string
      size: number
      growth: number
      unit: string
    }>
  >([])

  // Add state for new custom segment
  const [newSegment, setNewSegment] = useState({
    name: "",
    size: "",
    growth: "",
  })

  // Add state for region and time frame
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<number[]>([2020, 2024])

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
  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId)
    setCurrentStep(2) // Move to data sources step

    // Find the selected industry
    const industry = industries.find((ind) => ind.id === industryId)

    // Add user message
    workflowEngine.addMessage("user", `I want to analyze the ${industry?.name} industry`)

    // Show loading message
    workflowEngine.addLoadingMessage("Identifying available data sources...")
    setMessages(workflowEngine.getMessages())

    // Simulate processing
    setTimeout(() => {
      workflowEngine.removeLoadingMessage()

      // Show data sources selection
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            I've identified several data sources for the {industry?.name} industry. Please select which sources you'd
            like to include in your analysis:
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 1500)
  }

  // Update the handleSourcesSelect function to move to the region/timeframe step
  const handleSourcesSelect = (sources: string[]) => {
    setSelectedSources(sources)
    setCurrentStep(3) // Move to region/timeframe step

    // Add user message
    workflowEngine.addMessage(
      "user",
      `I want to use ${sources.map((s) => dataSources.find((ds) => ds.id === s)?.name).join(", ")} as data sources`,
    )

    // Show loading message
    workflowEngine.addLoadingMessage("Fetching data from selected sources...")
    setMessages(workflowEngine.getMessages())

    // Simulate data fetching
    setTimeout(() => {
      workflowEngine.removeLoadingMessage()

      // Show region and time frame selection
      const newId = workflowEngine.addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#001742]">
            I've fetched the data from your selected sources. Now, please specify the region and time frame for your
            analysis:
          </p>
        </div>,
        true,
      )

      setActiveCustomizationId(newId)
      setMessages(workflowEngine.getMessages())
    }, 1500)
  }

  // Add the handleRegionTimeFrameSelect function
  const handleRegionTimeFrameSelect = (region: string, timeFrame: number[]) => {
    setSelectedRegion(region)
    setSelectedTimeFrame(timeFrame)
    setCurrentStep(4) // Move to report generation step

    // Add user message
    workflowEngine.addMessage(
      "user",
      `I want to analyze the ${selectedIndustry} industry in ${region} from ${timeFrame[0]} to ${timeFrame[1]}`,
    )

    // Show loading message
    workflowEngine.addLoadingMessage("Generating market sizing and segmentation report...")
    setMessages(workflowEngine.getMessages())

    // Simulate report generation
    setTimeout(() => {
      workflowEngine.removeLoadingMessage()
      showFinalReport()
      setMessages(workflowEngine.getMessages())
    }, 3000)
  }

  // Handle market sizing confirmation
  const handleMarketSizingConfirm = () => {
    setCurrentStep(4) // Move to report generation step

    // Combine standard and custom segments
    const allSegments = [...segments, ...customSegments]
    setSegments(allSegments)

    // Add user message
    workflowEngine.addMessage("user", "Yes, please proceed with market sizing and forecasting")

    // Show loading message
    workflowEngine.addLoadingMessage("Calculating current market sizes...")
    setMessages(workflowEngine.getMessages())

    // Simulate market sizing and forecasting
    setTimeout(() => {
      workflowEngine.updateLoadingMessage("Applying forecasting models...")
      setMessages(workflowEngine.getMessages())

      setTimeout(() => {
        workflowEngine.updateLoadingMessage("Generating visualizations...")
        setMessages(workflowEngine.getMessages())

        setTimeout(() => {
          workflowEngine.removeLoadingMessage()
          showFinalReport()
          setMessages(workflowEngine.getMessages())
        }, 1500)
      }, 1500)
    }, 1500)
  }

  // Update the showFinalReport function
  const showFinalReport = () => {
    setIsReportComplete(true)

    // Send a single combined message with both the text and the report component
    workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">
          I've generated a comprehensive market segmentation report for the Quick Commerce industry based on the data
          analysis:
        </p>

        <QuickCommerceReport
          region={selectedRegion || "India"}
          timeFrame={selectedTimeFrame}
          onRestart={() => {
            // Reset the workflow
            const initialMessages = workflowEngine.initialize()
            setMessages(initialMessages)
            setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
            setCurrentStep(1)
            setIsReportComplete(false)
            setSelectedIndustry(null)
            setSelectedSources([])
            setSelectedRegion(null)
            setSelectedTimeFrame([2020, 2024])
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

  // Industry Selection Component
  const IndustrySelector = () => (
    <div className="space-y-4">
      <p className="text-sm text-[#4e5971]">Please select an industry to analyze:</p>
      <div className="grid grid-cols-2 gap-3">
        {industries.map((industry) => (
          <button
            key={industry.id}
            className="flex items-center gap-3 rounded-lg border border-[#e1e8f6] bg-white p-4 hover:bg-[#f4f9ff] hover:border-[#d9e4f7] transition-colors"
            onClick={() => handleIndustrySelect(industry.id)}
          >
            <span className="text-2xl">{industry.icon}</span>
            <span className="text-sm font-medium text-[#001742]">{industry.name}</span>
          </button>
        ))}
      </div>
    </div>
  )

  // Data Sources Selection Component
  const DataSourcesSelector = () => {
    const [sources, setSources] = useState<string[]>([])

    const toggleSource = (sourceId: string) => {
      if (sources.includes(sourceId)) {
        setSources(sources.filter((id) => id !== sourceId))
      } else {
        setSources([...sources, sourceId])
      }
    }

    return (
      <div className="space-y-4">
        <p className="text-sm text-[#4e5971]">Select data sources to include in your analysis:</p>
        <div className="space-y-3">
          {dataSources.map((source) => (
            <div
              key={source.id}
              className={`flex items-center justify-between rounded-md border p-3 cursor-pointer ${
                sources.includes(source.id)
                  ? "border-[#004ce6] bg-[#f4f9ff]"
                  : "border-[#e1e8f6] bg-white hover:bg-[#f9fafc]"
              }`}
              onClick={() => toggleSource(source.id)}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={sources.includes(source.id)}
                  onChange={() => {}}
                  className="rounded border-[#dee6f5]"
                />
                <div>
                  <div className="text-sm font-medium text-[#001742]">{source.name}</div>
                  <div className="text-xs text-[#6e7b96]">
                    {source.count} reports • Last updated {source.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={() => handleSourcesSelect(sources)}
          disabled={sources.length === 0}
          className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
        >
          Continue
        </Button>
      </div>
    )
  }

  // Add a new component for region and time frame selection
  const RegionTimeFrameSelector = () => {
    const [region, setRegion] = useState("India")
    const [timeFrame, setTimeFrame] = useState([2020, 2024])
    const regions = ["India", "Southeast Asia", "United States", "Europe", "Middle East"]

    const handleTimeFrameChange = (values: number[]) => {
      setTimeFrame(values)
    }

    return (
      <div className="space-y-4">
        <p className="text-sm text-[#4e5971]">Select the region for your analysis:</p>
        <div className="grid grid-cols-3 gap-3">
          {regions.map((r) => (
            <button
              key={r}
              className={`flex items-center justify-center gap-2 rounded-lg border p-3 ${
                region === r
                  ? "border-[#004ce6] bg-[#f4f9ff] text-[#004ce6]"
                  : "border-[#e1e8f6] bg-white text-[#4e5971] hover:bg-[#f9fafc]"
              }`}
              onClick={() => setRegion(r)}
            >
              <span className="text-sm font-medium">{r}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-sm text-[#4e5971] mb-4">Select the time frame for your analysis:</p>
          <div className="px-4">
            <Slider
              defaultValue={[2020, 2024]}
              min={2015}
              max={2024}
              step={1}
              minStepsBetweenThumbs={1}
              onValueChange={handleTimeFrameChange}
              className="my-6"
            />
            <div className="flex justify-between text-xs text-[#4e5971]">
              <span>2015</span>
              <span>2024</span>
            </div>
            <div className="mt-4 text-center text-sm font-medium text-[#001742]">
              Selected: {timeFrame[0]} - {timeFrame[1]}
            </div>
          </div>
        </div>

        <Button
          onClick={() => handleRegionTimeFrameSelect(region, timeFrame)}
          className="mt-6 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
        >
          Continue
        </Button>
      </div>
    )
  }

  // Update the MarketSizingConfirmation component to include custom segment functionality
  const MarketSizingConfirmation = () => {
    const handleAddCustomSegment = () => {
      if (newSegment.name && newSegment.size && newSegment.growth) {
        const customSegment = {
          id: `custom-${Date.now()}`,
          name: newSegment.name,
          size: Number.parseFloat(newSegment.size),
          growth: Number.parseFloat(newSegment.growth),
          unit: "billion USD",
        }

        setCustomSegments([...customSegments, customSegment])
        setNewSegment({ name: "", size: "", growth: "" })
      }
    }

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#001742]">Add a custom segment (optional):</p>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Segment name"
              value={newSegment.name}
              onChange={(e) => setNewSegment({ ...newSegment, name: e.target.value })}
              className="rounded-md border border-[#dee6f5] p-2 text-sm"
            />
            <input
              type="number"
              placeholder="Market size (billions)"
              value={newSegment.size}
              onChange={(e) => setNewSegment({ ...newSegment, size: e.target.value })}
              className="rounded-md border border-[#dee6f5] p-2 text-sm"
            />
            <input
              type="number"
              placeholder="Growth rate (%)"
              value={newSegment.growth}
              onChange={(e) => setNewSegment({ ...newSegment, growth: e.target.value })}
              className="rounded-md border border-[#dee6f5] p-2 text-sm"
            />
          </div>
          <Button
            onClick={handleAddCustomSegment}
            variant="outline"
            className="mt-2 text-[#004ce6] border-[#dee6f5] hover:bg-[#f4f9ff] text-sm"
            disabled={!newSegment.name || !newSegment.size || !newSegment.growth}
          >
            Add Custom Segment
          </Button>
        </div>

        {customSegments.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-[#001742] mb-2">Custom segments:</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse rounded-md border border-[#e1e8f6]">
                <thead>
                  <tr className="bg-[#f4f7ff]">
                    <th className="border-b border-[#e1e8f6] p-3 text-left text-sm font-medium text-[#001742]">
                      Segment
                    </th>
                    <th className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]">
                      Market Size
                    </th>
                    <th className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]">
                      Growth Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customSegments.map((segment, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#f9fafc]"}>
                      <td className="border-b border-[#e1e8f6] p-3 text-sm text-[#001742]">{segment.name}</td>
                      <td className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]">
                        ${segment.size} {segment.unit}
                      </td>
                      <td className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]">
                        {segment.growth}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4">
          <p className="text-sm text-[#4e5971]">
            The system will now calculate current market sizes and forecast growth for each segment based on historical
            data and trends.
          </p>
          <Button
            onClick={() => handleMarketSizingConfirm()}
            className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
          >
            Generate Market Sizing & Forecast
          </Button>
        </div>
      </div>
    )
  }

  // Update the renderCustomizationContent function to include the new step
  const renderCustomizationContent = () => {
    switch (currentStep) {
      case 1:
        return <IndustrySelector />
      case 2:
        return <DataSourcesSelector />
      case 3:
        return <RegionTimeFrameSelector />
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
        title="Industry Sizing and Market Segmentation Report Generation"
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
                        I'll help you with that. What specific aspect of the market segmentation report would you like
                        to explore further?
                      </p>
                    </div>,
                  )
                  setMessages(workflowEngine.getMessages())
                }, 1000)
              }}
              placeholder="Ask a follow-up question about the market segmentation report..."
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}

// Report Result Component
function ReportResult({
  reportData,
  segments,
  onRestart,
}: {
  reportData: typeof reportData
  segments: typeof petCareSegments
  onRestart: () => void
}) {
  return (
    <div className="space-y-6">
      <Card className="border-[#e1e8f6]">
        <CardContent className="p-4">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#001742]">{reportData.title}</h3>
            <p className="text-[#4e5971]">{reportData.summary}</p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-md bg-[#f4f9ff] p-3">
                <div className="text-sm font-medium text-[#001742]">Total Market Size</div>
                <div className="text-lg font-semibold text-[#001742]">${reportData.totalMarketSize} billion</div>
              </div>
              <div className="rounded-md bg-[#f4f9ff] p-3">
                <div className="text-sm font-medium text-[#001742]">CAGR</div>
                <div className="text-lg font-semibold text-[#001742]">{reportData.cagr}%</div>
              </div>
              <div className="rounded-md bg-[#f4f9ff] p-3">
                <div className="text-sm font-medium text-[#001742]">Forecast Period</div>
                <div className="text-lg font-semibold text-[#001742]">{reportData.forecastPeriod}</div>
              </div>
            </div>

            {/* Market Segments Section */}
            <div className="space-y-4">
              <h4 className="text-base font-medium text-[#001742]">Market Segments</h4>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse rounded-md border border-[#e1e8f6]">
                  <thead>
                    <tr className="bg-[#f4f7ff]">
                      <th className="border-b border-[#e1e8f6] p-3 text-left text-sm font-medium text-[#001742]">
                        Segment
                      </th>
                      <th className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]">
                        Market Size
                      </th>
                      <th className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]">
                        Growth Rate
                      </th>
                      <th className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]">
                        Market Share
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {segments.map((segment, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#f9fafc]"}>
                        <td className="border-b border-[#e1e8f6] p-3 text-sm text-[#001742]">{segment.name}</td>
                        <td className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]">
                          ${segment.size} billion
                        </td>
                        <td className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]">
                          {segment.growth}%
                        </td>
                        <td className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]">
                          {Math.round((segment.size / reportData.totalMarketSize) * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visualizations Section */}
            <div className="space-y-4">
              <h4 className="text-base font-medium text-[#001742]">Market Visualizations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-md border border-[#e1e8f6] p-4 bg-white">
                  <div className="text-sm font-medium text-[#001742] mb-2">Market Share by Segment</div>
                  <div className="h-[220px] flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <PieChart className="h-32 w-32 text-[#004ce6] opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xs text-[#6e7b96]">Interactive pie chart visualization</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-[#e1e8f6] p-4 bg-white">
                  <div className="text-sm font-medium text-[#001742] mb-2">Growth Rate by Segment</div>
                  <div className="h-[220px] flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <BarChart className="h-32 w-32 text-[#004ce6] opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xs text-[#6e7b96]">Interactive bar chart visualization</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-[#e1e8f6] p-4 bg-white md:col-span-2">
                  <div className="text-sm font-medium text-[#001742] mb-2">Market Size Forecast (2023-2028)</div>
                  <div className="h-[220px] flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <LineChart className="h-32 w-32 text-[#004ce6] opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xs text-[#6e7b96]">Interactive line chart visualization</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insights Section */}
            <div className="space-y-4">
              <h4 className="text-base font-medium text-[#001742]">Key Market Insights</h4>
              <ul className="space-y-2">
                {reportData.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                    <span className="text-sm text-[#4e5971]">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Sources Section */}
            <div className="space-y-2">
              <h4 className="text-base font-medium text-[#001742]">Data Sources</h4>
              <div className="space-y-1 text-sm text-[#6e7b96]">
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-0.5 text-[#8098c4]" />
                  <span>DRHP Reports (12 documents analyzed)</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-0.5 text-[#8098c4]" />
                  <span>Euromonitor Industry Reports (8 documents analyzed)</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-0.5 text-[#8098c4]" />
                  <span>News Sources (24 articles analyzed)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button size="sm" className="gap-2 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto">
          <DownloadIcon className="h-4 w-4" />
          Download Full Report
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6] px-4 py-1.5 h-auto"
        >
          <DownloadIcon className="h-4 w-4" />
          Export Data to Excel
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6] px-4 py-1.5 h-auto"
          onClick={onRestart}
        >
          <RefreshCw className="h-4 w-4" />
          Analyze Another Industry
        </Button>
      </div>
    </div>
  )
}
