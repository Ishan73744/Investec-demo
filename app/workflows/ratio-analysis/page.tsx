"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  BarChart4,
  ChevronDown,
  Clock,
  Download,
  FileText,
  LineChart,
  Loader2,
  Plus,
  Send,
  X,
} from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for demonstration
const companies = [
  { id: "aapl", name: "Apple Inc.", ticker: "AAPL" },
  { id: "msft", name: "Microsoft Corporation", ticker: "MSFT" },
  { id: "amzn", name: "Amazon.com, Inc.", ticker: "AMZN" },
  { id: "googl", name: "Alphabet Inc.", ticker: "GOOGL" },
  { id: "meta", name: "Meta Platforms, Inc.", ticker: "META" },
  { id: "tsla", name: "Tesla, Inc.", ticker: "TSLA" },
  { id: "nvda", name: "NVIDIA Corporation", ticker: "NVDA" },
  { id: "jpm", name: "JPMorgan Chase & Co.", ticker: "JPM" },
  { id: "v", name: "Visa Inc.", ticker: "V" },
  { id: "wmt", name: "Walmart Inc.", ticker: "WMT" },
]

const ratios = [
  { id: "current", name: "Current Ratio", category: "Liquidity" },
  { id: "quick", name: "Quick Ratio", category: "Liquidity" },
  { id: "cash", name: "Cash Ratio", category: "Liquidity" },
  { id: "debt-equity", name: "Debt-to-Equity Ratio", category: "Solvency" },
  { id: "interest-coverage", name: "Interest Coverage Ratio", category: "Solvency" },
  { id: "debt-assets", name: "Debt-to-Assets Ratio", category: "Solvency" },
  { id: "roe", name: "Return on Equity (ROE)", category: "Profitability" },
  { id: "roa", name: "Return on Assets (ROA)", category: "Profitability" },
  { id: "gross-margin", name: "Gross Profit Margin", category: "Profitability" },
  { id: "operating-margin", name: "Operating Profit Margin", category: "Profitability" },
  { id: "net-margin", name: "Net Profit Margin", category: "Profitability" },
  { id: "pe", name: "Price-to-Earnings (P/E) Ratio", category: "Valuation" },
  { id: "pb", name: "Price-to-Book (P/B) Ratio", category: "Valuation" },
  { id: "ps", name: "Price-to-Sales (P/S) Ratio", category: "Valuation" },
  { id: "dividend-yield", name: "Dividend Yield", category: "Valuation" },
]

const timePeriods = [
  { id: "1y", name: "Last 1 Year" },
  { id: "2y", name: "Last 2 Years" },
  { id: "3y", name: "Last 3 Years" },
  { id: "5y", name: "Last 5 Years" },
  { id: "10y", name: "Last 10 Years" },
  { id: "custom", name: "Custom Date Range" },
]

// Sample chart data
const chartData = {
  labels: ["Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022", "Q1 2023", "Q2 2023"],
  datasets: [
    {
      label: "Gross Profit Margin",
      data: [0.42, 0.43, 0.41, 0.43, 0.44, 0.45],
      borderColor: "hsl(221.2 83.2% 53.3%)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
    },
    {
      label: "Net Profit Margin",
      data: [0.21, 0.22, 0.2, 0.23, 0.24, 0.25],
      borderColor: "hsl(262.1 83.3% 57.8%)",
      backgroundColor: "rgba(124, 58, 237, 0.1)",
    },
    {
      label: "Operating Profit Margin",
      data: [0.28, 0.29, 0.27, 0.3, 0.31, 0.32],
      borderColor: "hsl(142.1 76.2% 36.3%)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
    },
  ],
}

type Message = {
  id: string
  role: "system" | "user" | "loading"
  content: string | React.ReactNode
  timestamp: Date
}

export default function RatioAnalysisPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<(typeof companies)[0] | null>(null)
  const [selectedRatios, setSelectedRatios] = useState<typeof ratios>([])
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<(typeof timePeriods)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "system",
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#001742]">Financial Ratio Trend Analysis</h3>
            <p className="text-[#4e5971]">
              Welcome to the Financial Ratio Trend Analysis workflow. This tool will automatically extract and analyze
              key financial ratios for a specified company across multiple quarters, providing trend visualization and
              insights without manual calculation or data gathering.
            </p>
            <Button onClick={handleStart} className="mt-2 bg-[#004ce6] hover:bg-[#0047cb] text-white">
              Start Analysis
            </Button>
          </div>
        ),
        timestamp: new Date(),
      },
    ])
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleStart = () => {
    setIsStarted(true)
    setCurrentStep(1)

    addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#4e5971]">Let's begin by selecting a company you'd like to analyze:</p>
        <CompanySelector onSelect={handleCompanySelect} />
      </div>,
    )
  }

  const handleCompanySelect = (company: (typeof companies)[0]) => {
    setSelectedCompany(company)
    setCurrentStep(2)

    // Add user message
    addMessage("user", `I want to analyze ${company.name} (${company.ticker})`)

    // Add system response
    setTimeout(() => {
      addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#4e5971]">
            Great! You've selected {company.name} ({company.ticker}).
          </p>
          <p className="text-[#4e5971]">
            Now, please select the financial ratios you'd like to analyze (you can select multiple):
          </p>
          <RatioSelector
            selectedRatios={selectedRatios}
            onSelectRatio={handleRatioSelect}
            onDeselectRatio={handleRatioDeselect}
          />
          <div className="mt-4">
            {selectedRatios.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedRatios.map((ratio) => (
                  <Badge
                    key={ratio.id}
                    variant="secondary"
                    className="flex items-center gap-1 bg-[#eaf0fc] text-[#004ce6] hover:bg-[#d9e4f7] border-[#d9e4f7]"
                  >
                    {ratio.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1 text-[#8098c4] hover:text-[#004ce6] hover:bg-transparent"
                      onClick={() => handleRatioDeselect(ratio)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {selectedRatios.length > 0 && (
            <Button onClick={handleRatiosConfirm} className="mt-2 bg-[#004ce6] hover:bg-[#0047cb] text-white">
              Continue
            </Button>
          )}
        </div>,
      )
    }, 500)
  }

  const handleRatioSelect = (ratio: (typeof ratios)[0]) => {
    if (!selectedRatios.some((r) => r.id === ratio.id)) {
      setSelectedRatios([...selectedRatios, ratio])
    }
  }

  const handleRatioDeselect = (ratio: (typeof ratios)[0]) => {
    setSelectedRatios(selectedRatios.filter((r) => r.id !== ratio.id))
  }

  const handleRatiosConfirm = () => {
    setCurrentStep(3)

    // Add user message showing selected ratios
    const ratioNames = selectedRatios.map((r) => r.name).join(", ")
    addMessage("user", `I want to analyze the following ratios: ${ratioNames}`)

    // Add system response for time period selection
    setTimeout(() => {
      addMessage(
        "system",
        <div className="space-y-4">
          <p className="text-[#4e5971]">Please select the time period for analysis:</p>
          <TimePeriodSelector onSelect={handleTimePeriodSelect} />
        </div>,
      )
    }, 500)
  }

  const handleTimePeriodSelect = (period: (typeof timePeriods)[0]) => {
    setSelectedTimePeriod(period)
    setCurrentStep(4)

    // Add user message
    addMessage("user", `I want to analyze data for ${period.name}`)

    // Show loading state
    addLoadingMessage("Identifying available data sources...")

    // Simulate data source identification
    setTimeout(() => {
      updateLoadingMessage("Fetching financial data from multiple sources...")

      // Simulate data fetching
      setTimeout(() => {
        updateLoadingMessage("Extracting and normalizing financial elements...")

        // Simulate data processing
        setTimeout(() => {
          updateLoadingMessage("Calculating financial ratios for selected timeframes...")

          // Simulate ratio calculation
          setTimeout(() => {
            updateLoadingMessage("Generating visualizations of ratio trends...")

            // Simulate chart generation
            setTimeout(() => {
              removeLoadingMessage()

              // Show data sources
              addMessage(
                "system",
                <div className="space-y-4">
                  <h4 className="font-medium text-[#001742]">Data Sources Identified:</h4>
                  <div className="rounded-md bg-[#f4f9ff] p-3">
                    <ul className="space-y-1 text-sm text-[#4e5971]">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#21a265]"></div>
                        <span>SEC Filings (10-K, 10-Q) - Primary Source</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#21a265]"></div>
                        <span>Company Annual Reports (2018-2023)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#004ce6]"></div>
                        <span>Industry Benchmark Data</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#004ce6]"></div>
                        <span>Earnings Call Transcripts</span>
                      </li>
                    </ul>
                  </div>
                </div>,
              )

              // Show visualization
              setTimeout(() => {
                addMessage(
                  "system",
                  <div className="space-y-4">
                    <h4 className="font-medium text-[#001742]">Ratio Trend Analysis:</h4>
                    <Card className="border-[#e1e8f6]">
                      <CardContent className="p-4">
                        <Tabs defaultValue="chart">
                          <TabsList className="grid w-full grid-cols-2 bg-[#f4f7ff]">
                            <TabsTrigger
                              value="chart"
                              className="data-[state=active]:bg-white data-[state=active]:text-[#001742]"
                            >
                              Chart
                            </TabsTrigger>
                            <TabsTrigger
                              value="data"
                              className="data-[state=active]:bg-white data-[state=active]:text-[#001742]"
                            >
                              Data Table
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="chart" className="pt-4">
                            <div className="h-[300px] w-full">
                              <ChartPlaceholder ratios={selectedRatios.map((r) => r.name)} />
                            </div>
                          </TabsContent>
                          <TabsContent value="data" className="pt-4">
                            <div className="rounded-md border border-[#e1e8f6]">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b bg-[#f4f7ff]">
                                    <th className="p-2 text-left text-sm font-medium text-[#4e5971]">Period</th>
                                    {selectedRatios.map((ratio) => (
                                      <th key={ratio.id} className="p-2 text-right text-sm font-medium text-[#4e5971]">
                                        {ratio.name}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {chartData.labels.map((label, i) => (
                                    <tr key={i} className="border-b border-[#e8eef9]">
                                      <td className="p-2 text-sm text-[#4e5971]">{label}</td>
                                      {selectedRatios.map((ratio, j) => (
                                        <td key={`${ratio.id}-${i}`} className="p-2 text-right text-sm text-[#4e5971]">
                                          {chartData.datasets[j % chartData.datasets.length].data[i]}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>,
                )

                // Show analysis
                setTimeout(() => {
                  setIsAnalysisComplete(true)
                  addMessage(
                    "system",
                    <div className="space-y-4">
                      <h4 className="font-medium text-[#001742]">Analysis Insights:</h4>
                      <div className="space-y-2 text-[#4e5971]">
                        <p>
                          <strong>Overall Trend:</strong> {selectedCompany?.name}'s profitability metrics have shown a
                          positive trend over the analyzed period, with all selected ratios improving since Q1 2022.
                        </p>
                        {selectedRatios.map((ratio, i) => (
                          <p key={ratio.id}>
                            <strong>{ratio.name}:</strong> {getRandomInsight(ratio.name, selectedCompany?.name || "")}
                          </p>
                        ))}
                        <p>
                          <strong>Industry Comparison:</strong> Compared to industry peers, {selectedCompany?.name} has
                          maintained above-average profitability metrics, particularly in{" "}
                          {selectedRatios[0]?.name || "Gross Profit Margin"}.
                        </p>
                        <p>
                          <strong>Key Factors:</strong> The improvement in profitability metrics coincides with the
                          company's strategic initiatives announced in Q4 2022, including cost optimization and supply
                          chain improvements.
                        </p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-medium text-[#001742] mb-2">Sources:</h4>
                        <div className="space-y-1 text-sm text-[#6e7b96]">
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 mt-0.5 text-[#8098c4]" />
                            <span>SEC Form 10-K (Annual Report) - Filed Feb 2023</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 mt-0.5 text-[#8098c4]" />
                            <span>SEC Form 10-Q (Quarterly Reports) - Q1-Q2 2023</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 mt-0.5 text-[#8098c4]" />
                            <span>Industry Benchmark Data - Financial Services Database</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6]"
                        >
                          <Download className="h-4 w-4" />
                          Download Report
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6]"
                        >
                          <Clock className="h-4 w-4" />
                          Set Alert for Changes
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6]"
                        >
                          <BarChart4 className="h-4 w-4" />
                          Compare with Competitor
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover
                          className=\"gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6]"
                        >
                          <Plus className="h-4 w-4" />
                          Save to Project
                        </Button>
                      </div>
                    </div>,
                  )
                }, 1000)
              }, 1000)
            }, 1500)
          }, 1500)
        }, 1500)
      }, 1500)
    }, 1500)
  }

  const addMessage = (role: "system" | "user", content: string | React.ReactNode) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role,
        content,
        timestamp: new Date(),
      },
    ])
  }

  const addLoadingMessage = (content: string) => {
    setIsLoading(true)
    setMessages((prev) => [
      ...prev,
      {
        id: "loading",
        role: "loading",
        content,
        timestamp: new Date(),
      },
    ])
  }

  const updateLoadingMessage = (content: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === "loading" ? { ...msg, content } : msg)))
  }

  const removeLoadingMessage = () => {
    setIsLoading(false)
    setMessages((prev) => prev.filter((msg) => msg.id !== "loading"))
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    addMessage("user", inputValue)
    setInputValue("")

    // Simulate response
    setTimeout(() => {
      addMessage(
        "system",
        <div>
          <p className="text-[#4e5971]">
            I'll help you with that. What specific aspect of the analysis would you like to explore further?
          </p>
        </div>,
      )
    }, 1000)
  }

  // Helper function to generate random insights
  const getRandomInsight = (ratioName: string, companyName: string) => {
    const insights = [
      `${ratioName} has improved by 7.1% over the analyzed period, indicating stronger financial performance.`,
      `${ratioName} shows a steady upward trend, with a notable 3.2% increase in the most recent quarter.`,
      `${ratioName} has outperformed the industry average by 12% throughout the analyzed period.`,
      `${companyName}'s ${ratioName} demonstrates consistent improvement, reflecting effective management strategies.`,
      `${ratioName} experienced temporary volatility in Q3 2022 but recovered strongly in subsequent quarters.`,
    ]
    return insights[Math.floor(Math.random() * insights.length)]
  }

  return (
    <div className="flex h-screen flex-col bg-[#f7f9fe]">
      {/* Header */}
      <header className="flex h-14 items-center border-b bg-white px-4">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" className="text-[#4e5971] hover:text-[#004ce6] hover:bg-[#f4f9ff]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-[#001742]">Financial Ratio Trend Analysis</h1>
        {selectedCompany && (
          <div className="ml-4 flex items-center gap-2 rounded-full bg-[#f4f9ff] px-3 py-1 text-sm">
            <span className="text-[#004ce6]">{selectedCompany.ticker}</span>
            {selectedRatios.length > 0 && (
              <>
                <span className="text-[#8098c4]">|</span>
                <span className="text-[#4e5971]">{selectedRatios.length} ratios selected</span>
              </>
            )}
          </div>
        )}
      </header>

      {/* Chat container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-[#004ce6] text-white"
                    : message.role === "loading"
                      ? "bg-[#eaf0fc] text-[#4e5971]"
                      : "bg-white border border-[#dee6f5] shadow-sm"
                }`}
              >
                {message.role === "loading" ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin text-[#004ce6]" />
                    <span>{message.content}</span>
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isAnalysisComplete ? "Ask a follow-up question about the analysis..." : "Type a message..."}
              className="flex-1 rounded-md border border-[#dee6f5] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004ce6]"
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim()} className="bg-[#004ce6] hover:bg-[#0047cb]">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Company selector component
function CompanySelector({ onSelect }: { onSelect: (company: (typeof companies)[0]) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-[#dee6f5] bg-white text-[#4e5971]"
        >
          {`Select a company or enter ticker symbol...`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search company or ticker..." />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {companies.map((company) => (
                <CommandItem
                  key={company.id}
                  onSelect={() => {
                    onSelect(company)
                    setOpen(false)
                  }}
                >
                  <span>{company.name}</span>
                  <span className="ml-2 text-xs text-[#8098c4]">({company.ticker})</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Ratio selector component
function RatioSelector({
  selectedRatios,
  onSelectRatio,
  onDeselectRatio,
}: {
  selectedRatios: typeof ratios
  onSelectRatio: (ratio: (typeof ratios)[0]) => void
  onDeselectRatio: (ratio: (typeof ratios)[0]) => void
}) {
  const [open, setOpen] = useState(false)

  // Group ratios by category
  const ratiosByCategory = ratios.reduce(
    (acc, ratio) => {
      if (!acc[ratio.category]) {
        acc[ratio.category] = []
      }
      acc[ratio.category].push(ratio)
      return acc
    },
    {} as Record<string, typeof ratios>,
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-[#dee6f5] bg-white text-[#4e5971]"
        >
          {selectedRatios.length > 0
            ? `${selectedRatios.length} ratio${selectedRatios.length > 1 ? "s" : ""} selected`
            : `Select financial ratios...`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search ratios..." />
          <CommandList>
            <CommandEmpty>No ratio found.</CommandEmpty>
            {Object.entries(ratiosByCategory).map(([category, categoryRatios]) => (
              <CommandGroup key={category} heading={category}>
                {categoryRatios.map((ratio) => {
                  const isSelected = selectedRatios.some((r) => r.id === ratio.id)
                  return (
                    <CommandItem
                      key={ratio.id}
                      onSelect={() => {
                        if (isSelected) {
                          onDeselectRatio(ratio)
                        } else {
                          onSelectRatio(ratio)
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={isSelected}
                          id={`ratio-${ratio.id}`}
                          className="border-[#9babc7] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
                        />
                        <label htmlFor={`ratio-${ratio.id}`} className="text-sm">
                          {ratio.name}
                        </label>
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Time period selector component
function TimePeriodSelector({ onSelect }: { onSelect: (period: (typeof timePeriods)[0]) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-[#dee6f5] bg-white text-[#4e5971]"
        >
          {`Select time period...`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {timePeriods.map((period) => (
                <CommandItem
                  key={period.id}
                  onSelect={() => {
                    onSelect(period)
                    setOpen(false)
                  }}
                >
                  {period.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Chart placeholder component
function ChartPlaceholder({ ratios }: { ratios: string[] }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-[#dee6f5] p-4">
      <LineChart className="mb-2 h-8 w-8 text-[#004ce6]" />
      <div className="text-center">
        <p className="text-sm font-medium text-[#001742]">Financial Ratio Trends (Last 6 Quarters)</p>
        <p className="text-xs text-[#8098c4]">Chart showing trends for {ratios.join(", ")}</p>
      </div>
    </div>
  )
}
