"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowRight,
  Clock,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  BarChart2,
  MessageSquare,
  Code,
  FileImage,
  Table,
  ExternalLink,
  Info,
  X,
  Maximize2,
} from "lucide-react"
import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export default function HomePage() {
  const [inputValue, setInputValue] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showTrace, setShowTrace] = useState(false)
  const [traceCollapsed, setTraceCollapsed] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [expandedTraceItems, setExpandedTraceItems] = useState<string[]>([])
  const [showArtifactDrawer, setShowArtifactDrawer] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const traceRef = useRef<HTMLDivElement>(null)
  const traceItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Sample query
  const sampleQuery =
    "How has TCS' tone on AI-driven workforce efficiencies and future hiring plans evolved in the past 3 years?"

  // Workforce data for charts
  const workforceData = [
    { year: "FY 22", headcount: 592195, netAdditions: 103546, attrition: 17.4, revenuePerEmployee: 32.4 },
    { year: "FY 23", headcount: 614795, netAdditions: 22600, attrition: 20.1, revenuePerEmployee: 36.7 },
    { year: "FY 24", headcount: 601546, netAdditions: -13249, attrition: 12.5, revenuePerEmployee: 37.8 },
  ]

  // AI specialist data
  const aiSpecialistData = [
    { year: "FY 22", percentage: 4.2, count: 24872 },
    { year: "FY 23", percentage: 8.5, count: 52258 },
    { year: "FY 24", percentage: 12.1, count: 77098 },
  ]

  // Hiring mix data
  const hiringMixData = [
    {
      year: "FY 22",
      fresherHiring: 83000,
      lateralHiring: 20546,
      fresherPercentage: 80.1,
      lateralPercentage: 19.9,
    },
    {
      year: "FY 23",
      fresherHiring: 40000,
      lateralHiring: -17400,
      fresherPercentage: 69.7,
      lateralPercentage: 30.3,
    },
    {
      year: "FY 24",
      fresherHiring: 11000,
      lateralHiring: 11378,
      fresherPercentage: 49.2,
      lateralPercentage: 50.8,
    },
  ]

  // Enhanced reasoning trace steps with structured data and citation IDs
  const traceSteps = [
    {
      id: "search-process",
      title: "Searching internal index",
      description:
        "Searching for TCS annual reports, investor presentations, and press releases from the last three fiscal years",
      type: "process",
      duration: 2000,
      items: [
        {
          id: "search-1",
          type: "search",
          query: "TCS annual report 2022 AI workforce efficiency",
          resultCount: 12,
          timestamp: "11:32:15",
        },
        {
          id: "search-2",
          type: "search",
          query: "TCS annual report 2023 AI workforce efficiency",
          resultCount: 15,
          timestamp: "11:32:18",
        },
        {
          id: "search-3",
          type: "search",
          query: "TCS annual report 2024 AI workforce efficiency",
          resultCount: 18,
          timestamp: "11:32:21",
        },
      ],
    },
    {
      id: "annual-report-2024",
      title: "Analyzing TCS Annual Report 2023-24",
      description: "Extracting key insights about AI-driven workforce efficiencies from the latest annual report",
      type: "analysis",
      duration: 2500,
      items: [
        {
          id: "citation-1",
          type: "pdf",
          title: "CEO Letter (p.12)",
          content:
            "FY 2024 marks a pivotal year in our AI-native journey. ignio™ now automates 37% of infra tasks; AI-assisted code generation lifts developer productivity 31%. Revenue grew ₹ 2,40,893 cr (+8%) with only 22,378 net hires—down from 1,03,546 two years ago.",
          analysis: "78% hiring drop signals shift from scale-up to efficiency.",
          source: "TCS_Annual_Report_2023-24.pdf",
          pages: "12-13",
          timestamp: "11:33:05",
        },
        {
          id: "citation-2",
          type: "table",
          title: "Workforce Metrics Table (p.74)",
          content: [
            ["Particulars", "FY 22", "FY 23", "FY 24"],
            ["Total Employees", "5 92 195", "6 14 795", "6 37 173"],
            ["Net Addition", "1 03 546", "22 600", "22 378"],
            ["Revenue (₹ cr)", "1 91 754", "2 25 458", "2 40 893"],
            ["Revenue / Emp. (₹ lakh)", "32.4", "36.7", "37.8"],
          ],
          analysis: "Revenue-per-employee up 17% over three years despite slower headcount growth.",
          source: "TCS_Annual_Report_2023-24.pdf",
          pages: "74",
          timestamp: "11:33:42",
        },
      ],
    },
    {
      id: "investor-presentation",
      title: "Analyzing TCS Q4 FY24 Investor Presentation",
      description: "Reviewing hiring mix data from recent investor materials",
      type: "analysis",
      duration: 2000,
      items: [
        {
          id: "citation-3",
          type: "table",
          title: "Hiring Mix (Slide 18)",
          content: [
            ["", "FY 22", "FY 23", "FY 24"],
            ["Fresher Hiring", "83 000", "40 000", "11 000"],
            ["Lateral Hiring", "20 546", "(17 400)", "11 378"],
            ["% Freshers", "80.1%", "—", "49.2%"],
          ],
          analysis:
            "Model flips from fresher-heavy (80%) to specialist-heavy (≈50% laterals) as AI skills rise in demand.",
          source: "TCS_Q4_FY24_Investor_Presentation.pdf",
          pages: "18",
          timestamp: "11:35:21",
        },
      ],
    },
    {
      id: "historical-reports",
      title: "Analyzing Historical Reports",
      description: "Reviewing language evolution across annual reports from previous years",
      type: "analysis",
      duration: 2500,
      items: [
        {
          id: "citation-4",
          type: "pdf",
          title: "Chairman's Message (p.9)",
          content:
            "We added 22,600 employees while investing ₹ 2,847 cr in AI & automation—up 52% YoY. Non-linear growth levers are taking hold.",
          analysis: "2023 is transition year: tone shifts from 'hiring first' to 'AI-scaled productivity'.",
          source: "TCS_Annual_Report_2022-23.pdf",
          pages: "9",
          timestamp: "11:36:12",
        },
        {
          id: "citation-5",
          type: "pdf",
          title: "CEO Section (p.14)",
          content:
            "We welcomed a record 1,03,546 associates. AI and automation are force multipliers that enhance our people's capabilities.",
          analysis: "2022 messaging is defensive: AI augments (not replaces) a rapid hiring boom.",
          source: "TCS_Annual_Report_2021-22.pdf",
          pages: "14",
          timestamp: "11:37:05",
        },
      ],
    },
    {
      id: "sustainability-report",
      title: "Analyzing TCS Sustainability Report",
      description: "Extracting evidence of AI-driven efficiency improvements",
      type: "analysis",
      duration: 2000,
      items: [
        {
          id: "citation-6",
          type: "pdf",
          title: "Efficiency Metrics",
          content: [
            "• Code-gen tools cut dev time -31%",
            "• Predictive analytics lowered infra incidents -43%",
            "• Automated testing coverage 74% → +22 pp since FY 22",
          ],
          analysis: "Concrete efficiency gains underpin reduced hiring.",
          source: "TCS_FY24_Sustainability_Report.pdf",
          pages: "43-44",
          timestamp: "11:38:22",
        },
      ],
    },
    {
      id: "earnings-call",
      title: "Analyzing Earnings Call Transcript",
      description: "Extracting direct quotations from leadership about future hiring plans",
      type: "analysis",
      duration: 2000,
      items: [
        {
          id: "citation-7",
          type: "transcript",
          title: "CEO Statement",
          content: "Linear scaling is over. We target 25k-30k strategic hires in FY 25, 70% lateral specialists.",
          analysis:
            "Board minutes (Q4 FY 24) echo the plan, approving 30k net additions with 70% in AI, cloud, cybersecurity.",
          source: "TCS_Q4_FY24_Earnings_Call.txt",
          timestamp: "11:39:10",
        },
      ],
    },
    {
      id: "industry-report",
      title: "Analyzing Industry Report",
      description: "Benchmarking TCS against competitors in AI investment and workforce efficiency",
      type: "analysis",
      duration: 2000,
      items: [
        {
          id: "citation-8",
          type: "table",
          title: "Industry Comparison",
          content: [
            ["Company", "Headcount Δ FY 24", "AI Spend (₹ cr)", "Rev./Emp. Δ"],
            ["TCS", "+3.6%", "3,256", "+16.7%"],
            ["Infosys", "+5.2%", "2,876", "+12.3%"],
            ["Wipro", "–2.1%", "1,987", "+8.4%"],
            ["HCLTech", "+7.8%", "2,145", "+9.2%"],
          ],
          analysis: "TCS spends the most on AI yet posts the smallest headcount growth, validating non-linear scale.",
          source: "India_IT_Services_Report_2024.pdf",
          timestamp: "11:40:25",
        },
      ],
    },
    {
      id: "data-synthesis",
      title: "Data Synthesis",
      description: "Creating visualizations of workforce trends and generating final analysis",
      type: "synthesis",
      duration: 3000,
      items: [
        {
          id: "citation-9",
          type: "analysis",
          title: "Final Synthesis",
          content:
            "From FY 22's hiring-led strategy to FY 24's AI-first narrative, TCS demonstrates a 78% drop in net additions while boosting revenue per employee +17% and tripling AI specialist share.",
          timestamp: "11:43:05",
        },
      ],
    },
  ]

  // Toggle expansion of a trace item
  const toggleTraceItemExpansion = (id: string) => {
    setExpandedTraceItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Handle citation click - expand the specific item and scroll to it
  const handleCitationClick = (citationId: string) => {
    // Expand the trace if it's collapsed
    if (traceCollapsed) {
      setTraceCollapsed(false)
    }

    // First collapse all items
    setExpandedTraceItems([citationId])

    // Scroll to the item after a short delay to ensure DOM is updated
    setTimeout(() => {
      const element = traceItemRefs.current[citationId]
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setIsLoading(true)

    setTimeout(() => {
      setShowTrace(true)
      setIsLoading(false)
      setCurrentStep(0)

      // Start the sequential step revelation
      let stepIndex = 0
      const revealSteps = () => {
        if (stepIndex < traceSteps.length) {
          setCurrentStep(stepIndex + 1)
          stepIndex++
          setTimeout(revealSteps, traceSteps[stepIndex - 1]?.duration || 2000)
        } else {
          // After all steps are revealed, wait 3 seconds then auto-collapse
          setTimeout(() => {
            setTraceCollapsed(true)
            setIsSubmitted(true)
          }, 3000)
        }
      }

      revealSteps()
    }, 1500)
  }

  useEffect(() => {
    setInputValue(sampleQuery)
  }, [])

  // Function to render the appropriate icon for each item type
  const renderItemTypeIcon = (type: string) => {
    switch (type) {
      case "search":
        return <Search size={14} />
      case "pdf":
        return <FileText size={14} />
      case "table":
        return <Table size={14} />
      case "chart":
        return <BarChart2 size={14} />
      case "transcript":
        return <MessageSquare size={14} />
      case "code":
        return <Code size={14} />
      case "image":
        return <FileImage size={14} />
      case "analysis":
        return <Lightbulb size={14} />
      default:
        return <Lightbulb size={14} />
    }
  }

  // Function to determine pill color based on item type
  const getPillColorClass = (type: string) => {
    switch (type) {
      case "search":
        return "bg-slate-100 text-slate-700 hover:bg-slate-200"
      case "pdf":
        return "bg-red-50 text-red-700 hover:bg-red-100"
      case "table":
        return "bg-blue-50 text-blue-700 hover:bg-blue-100"
      case "chart":
        return "bg-purple-50 text-purple-700 hover:bg-purple-100"
      case "transcript":
        return "bg-teal-50 text-teal-700 hover:bg-teal-100"
      case "code":
        return "bg-gray-100 text-gray-700 hover:bg-gray-200"
      case "image":
        return "bg-amber-50 text-amber-700 hover:bg-amber-100"
      case "analysis":
        return "bg-green-50 text-green-700 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  }

  // Function to render the content of a trace item based on its type
  const renderTraceItemContent = (item: any) => {
    switch (item.type) {
      case "search":
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <Search size={14} />
              <span>Search Query</span>
              <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{item.resultCount} results</span>
              <span className="ml-auto text-xs text-slate-500">{item.timestamp}</span>
            </div>
            <div className="font-medium">{item.query}</div>
          </div>
        )
      case "pdf":
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <FileText size={14} />
              <span>PDF Document</span>
              <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">p. {item.pages}</span>
              <span className="ml-auto text-xs text-slate-500">{item.timestamp}</span>
            </div>
            <div className="font-medium mb-1">{item.title}</div>
            <div className="p-3 bg-slate-50 rounded-md border border-slate-200 mb-2">
              {typeof item.content === "string" ? (
                <p className="italic">{item.content}</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {item.content.map((line: string, i: number) => (
                    <li key={i} className="italic">
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
              <Lightbulb size={12} />
              <span>Analysis: {item.analysis}</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <FileText size={12} />
              <span>{item.source}</span>
            </div>
          </div>
        )
      case "table":
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <Table size={14} />
              <span>Data Table</span>
              {item.pages && <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">p. {item.pages}</span>}
              <span className="ml-auto text-xs text-slate-500">{item.timestamp}</span>
            </div>
            <div className="font-medium mb-1">{item.title}</div>
            <div className="overflow-x-auto mb-2">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    {item.content[0].map((header: string, i: number) => (
                      <th key={i} className="text-left py-2 px-3 font-medium text-slate-700">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.content.slice(1).map((row: string[], i: number) => (
                    <tr key={i} className="border-b border-slate-100">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`py-2 px-3 ${j === 0 ? "font-medium text-slate-700" : "text-slate-600"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
              <Lightbulb size={12} />
              <span>Analysis: {item.analysis}</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <FileText size={12} />
              <span>{item.source}</span>
            </div>
          </div>
        )
      case "transcript":
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <MessageSquare size={14} />
              <span>Transcript</span>
              <span className="ml-auto text-xs text-slate-500">{item.timestamp}</span>
            </div>
            <div className="font-medium mb-1">{item.title}</div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-md mb-2">
              <p>"{item.content}"</p>
            </div>
            <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
              <Lightbulb size={12} />
              <span>Analysis: {item.analysis}</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <MessageSquare size={12} />
              <span>{item.source}</span>
            </div>
          </div>
        )
      case "analysis":
        return (
          <div className="text-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <Lightbulb size={14} />
              <span>Analysis</span>
              <span className="ml-auto text-xs text-slate-500">{item.timestamp}</span>
            </div>
            <div className="font-medium mb-1">{item.title}</div>
            <div className="p-3 bg-green-50 border border-green-100 rounded-md">
              <p>{item.content}</p>
            </div>
          </div>
        )
      default:
        return <div>{JSON.stringify(item)}</div>
    }
  }

  // Extract citation number from citation ID
  const getCitationNumber = (citationId: string) => {
    const match = citationId.match(/citation-(\d+)/)
    return match ? match[1] : "?"
  }

  // Citation button component
  const CitationButton = ({ citationId }: { citationId: string }) => (
    <button
      onClick={() => handleCitationClick(citationId)}
      className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
    >
      [{getCitationNumber(citationId)}]
    </button>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto px-4 md:px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#004ce6] flex items-center justify-center text-white font-medium">
              U
            </div>
            <div className="flex-1">
              <p className="text-[#001742] font-medium">{inputValue}</p>
            </div>
          </div>

          {showTrace && (
            <div
              ref={traceRef}
              className={`mb-8 border border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden transition-all duration-500 ${
                traceCollapsed ? "max-h-16" : "max-h-[800px]"
              }`}
            >
              <div
                className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer"
                onClick={() => setTraceCollapsed(!traceCollapsed)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-gray-900">Reasoning Trace</span>
                    <p className="text-sm text-gray-500">
                      {traceCollapsed
                        ? "Click to expand and view the analysis process"
                        : "Analyzing TCS' workforce efficiency strategy evolution"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!traceCollapsed && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      <Info size={12} />
                      <span>Click citation numbers [1], [2], etc. to highlight sources</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{traceCollapsed ? "Completed" : "Processing..."}</span>
                  </div>
                  {traceCollapsed ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {!traceCollapsed && (
                <div className="py-4 max-h-[700px] overflow-y-auto">
                  {traceSteps.slice(0, currentStep).map((step, stepIndex) => (
                    <div key={step.id} className="relative pb-8 pl-6 last:pb-0">
                      {/* Timeline connector */}
                      {stepIndex < currentStep - 1 && (
                        <div className="absolute left-[19px] top-7 bottom-0 w-[2px] bg-blue-200"></div>
                      )}

                      {/* Step header with dot */}
                      <div className="flex items-start mb-3">
                        <div className="absolute left-0 mt-1.5 w-[10px] h-[10px] rounded-full bg-blue-500 ring-4 ring-white"></div>
                        <div className="ml-6">
                          <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>

                      {/* Step content */}
                      <div className="ml-6 space-y-3">
                        {step.items.map((item) => (
                          <div
                            key={item.id}
                            ref={(el) => (traceItemRefs.current[item.id] = el)}
                            className={`transition-all duration-300 ${
                              item.id.startsWith("citation") ? "scroll-mt-24" : ""
                            }`}
                          >
                            {/* Pill that expands to show content */}
                            <button
                              onClick={() => toggleTraceItemExpansion(item.id)}
                              className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${getPillColorClass(item.type)} ${
                                expandedTraceItems.includes(item.id) ? "rounded-b-none border-b" : ""
                              } ${item.id.startsWith("citation") ? "pr-2" : ""}`}
                            >
                              {renderItemTypeIcon(item.type)}
                              <span className="truncate max-w-[300px]">
                                {item.title ||
                                  item.query ||
                                  (typeof item.content === "string"
                                    ? item.content.substring(0, 40) + "..."
                                    : "Content")}
                              </span>
                              {item.type === "search" && (
                                <span className="bg-white/50 text-xs px-1.5 rounded-full">{item.resultCount}</span>
                              )}
                              {item.id.startsWith("citation") && (
                                <span className="ml-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                  {getCitationNumber(item.id)}
                                </span>
                              )}
                              <ChevronDown
                                className={`h-3 w-3 ml-1 transition-transform ${
                                  expandedTraceItems.includes(item.id) ? "transform rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Expanded content */}
                            {expandedTraceItems.includes(item.id) && (
                              <div
                                className={`p-3 border border-t-0 rounded-b-lg ${getPillColorClass(item.type)
                                  .replace("bg-", "bg-")
                                  .replace("hover:", "")}`}
                              >
                                {renderTraceItemContent(item)}
                                {item.id.startsWith("citation") && (
                                  <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                      Citation #{getCitationNumber(item.id)}
                                    </span>
                                    <button className="text-xs text-blue-600 flex items-center gap-1">
                                      <ExternalLink size={12} />
                                      View source document
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {isSubmitted && (
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#f2f6fe] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#004ce6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17V17.01"
                    stroke="#004ce6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.09009 9.00001C9.32519 8.33167 9.78924 7.76811 10.4 7.40914C11.0108 7.05016 11.729 6.91891 12.4273 7.03871C13.1255 7.15851 13.7589 7.52153 14.2152 8.06353C14.6714 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13"
                    stroke="#004ce6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-0">
                {/* Continuous text flow without borders */}
                <div className="prose prose-gray max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
                  <p className="mb-6">
                    Over FY 22 → FY 24, TCS pivoted from record hiring to AI-scaled productivity. Headcount jumped{" "}
                    <strong>+3.8 %</strong> in FY 23 but fell <strong>-2.2 %</strong> in FY 24 even as revenue kept
                    rising <CitationButton citationId="citation-2" />. Management language tracks the numbers: 2022's
                    "AI enhances talent" stance <CitationButton citationId="citation-5" /> became 2023's "non-linear
                    growth levers" <CitationButton citationId="citation-4" /> and, by 2024, a confident "AI-native
                    workforce" narrative <CitationButton citationId="citation-1" />
                    that decouples revenue from linear staff growth. Employee attrition peaked at{" "}
                    <strong>20.1 %</strong> in FY 23 and normalised to <strong>12.5 %</strong> after large-scale Gen-AI
                    reskilling <CitationButton citationId="citation-6" />, validating the company's efficiency push.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Narrative Highlights</h2>
                  <ul className="list-disc pl-5 space-y-3 mb-8">
                    <li>
                      <strong>Hiring Collapse vs AI Upskill</strong> Net additions plunge <strong>-78 %</strong> between
                      FY 22 and FY 24 while AI/ML specialist share (per AR slides) more than doubles, underscoring a
                      shift from volume hiring to skills density. <CitationButton citationId="citation-2" />
                    </li>
                    <li>
                      <strong>Revenue per Employee</strong> rises from <strong>₹ 32.4 lakh → ₹ 37.8 lakh</strong> (FY
                      22→24) as automation platforms (ignio™, AI code-gen) boost throughput.{" "}
                      <CitationButton citationId="citation-2" />
                    </li>
                    <li>
                      <strong>Selective Lateral Intake</strong> FY 24 freshers drop to <strong>11 k</strong>; ~50 % of
                      hiring is experienced AI talent, reversing FY 22's 80 % fresher mix.{" "}
                      <CitationButton citationId="citation-3" />
                    </li>
                    <li>
                      <strong>Board-Level Mandate</strong> FY 25 plan caps net additions at <strong>25-30 k</strong>,
                      with <strong>70 %</strong> lateral AI/cloud hires, cementing the non-linear scale strategy.{" "}
                      <CitationButton citationId="citation-7" />
                    </li>
                  </ul>

                  <p className="mb-6">
                    Overall, TCS has executed a three-year playbook:{" "}
                    <strong>build capacity → harvest efficiency → weaponise AI scale</strong>, achieving higher
                    productivity and a leaner, more specialised workforce. <CitationButton citationId="citation-9" />
                  </p>

                  <p className="text-sm text-gray-500 italic mb-8">
                    (Let me know if you'd like margin trends, AI-investment CAGR, or peer comparisons visualised.)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TCS Analysis Artifact at the bottom */}
          {isSubmitted && (
            <div className="mt-12">
              <div
                className="border border-gray-200 rounded-xl overflow-hidden backdrop-blur-sm bg-white/80 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => setShowArtifactDrawer(true)}
              >
                <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200/70">
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        stroke="#004ce6"
                        strokeWidth="2"
                      />
                      <path d="M14 2v6h6" stroke="#004ce6" strokeWidth="2" />
                      <path d="M16 13H8" stroke="#004ce6" strokeWidth="2" strokeLinecap="round" />
                      <path d="M16 17H8" stroke="#004ce6" strokeWidth="2" strokeLinecap="round" />
                      <path d="M10 9H8" stroke="#004ce6" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">TCS Workforce Analysis (FY22-FY24)</h2>
                      <p className="text-sm text-gray-600">Detailed breakdown with charts and data tables</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100/70 text-blue-700 rounded-full">
                      Data Artifact
                    </span>
                    <Maximize2 className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100/70 p-4">
                      <h3 className="font-medium text-gray-900 mb-2">FY-by-FY Breakdown</h3>
                      <p className="text-sm text-gray-600">Comprehensive year-over-year analysis with tone evolution</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100/70 p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Workforce Metrics</h3>
                      <p className="text-sm text-gray-600">Interactive charts showing headcount and attrition trends</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100/70 p-4">
                      <h3 className="font-medium text-gray-900 mb-2">AI Specialist Growth</h3>
                      <p className="text-sm text-gray-600">Visualization of AI talent acquisition strategy</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-blue-600 font-medium">Click to open detailed analysis →</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isSubmitted && !showTrace && (
        <div className="px-4 md:px-6 py-4">
          <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
            <div className="relative h-[100px] rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
              <textarea
                ref={inputRef}
                placeholder="Ask anything"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="absolute inset-0 w-full h-full px-4 py-4 text-base border-0 resize-none focus:outline-none focus:ring-0 text-gray-900 placeholder:text-gray-500"
              />
              <button
                type="submit"
                className={`absolute right-3 bottom-3 rounded-full h-8 w-8 flex items-center justify-center transition-colors ${
                  inputValue.trim() && !isLoading ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-100"
                }`}
                disabled={!inputValue.trim() || isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight className={`h-4 w-4 ${inputValue.trim() ? "text-white" : "text-gray-400"}`} />
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Right-side drawer for artifact details */}
      <div
        className={`fixed top-0 right-0 h-full w-[600px] bg-white transform transition-transform duration-300 ease-in-out ${
          showArtifactDrawer ? "translate-x-0" : "translate-x-full"
        } z-50 overflow-auto border-l border-gray-200 shadow-2xl`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">TCS Workforce Analysis</h3>
                <p className="text-sm text-gray-500">Detailed data artifact with interactive visualizations</p>
              </div>
            </div>
            <button
              onClick={() => setShowArtifactDrawer(false)}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-8">
            {/* FY-by-FY Breakdown */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                FY-by-FY Breakdown <CitationButton citationId="citation-2" />
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Tone Snapshot</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Key Metrics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 align-top font-medium text-gray-900">FY 22</td>
                      <td className="py-3 px-4 align-top text-gray-700">
                        <strong>Defensive expansion.</strong> AI "enhances our associates' capabilities"
                      </td>
                      <td className="py-3 px-4 align-top text-gray-700">Net adds: 103,546</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 align-top font-medium text-gray-900">FY 23</td>
                      <td className="py-3 px-4 align-top text-gray-700">
                        <strong>Transition to efficiency.</strong> "Non-linear growth levers"
                      </td>
                      <td className="py-3 px-4 align-top text-gray-700">Net adds: 22,600</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 align-top font-medium text-gray-900">FY 24</td>
                      <td className="py-3 px-4 align-top text-gray-700">
                        <strong>AI-native optimisation.</strong> "AI-ready workforce"
                      </td>
                      <td className="py-3 px-4 align-top text-gray-700">Net adds: -13,249</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Workforce Metrics <CitationButton citationId="citation-2" />
              </h3>
              <div className="h-[300px] bg-white rounded-lg border border-gray-100 p-4">
                <ChartContainer
                  config={{
                    headcount: {
                      label: "Headcount",
                      color: "hsl(var(--chart-1))",
                    },
                    attrition: {
                      label: "Attrition %",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={workforceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" tick={{ fill: "#4a5568" }} axisLine={{ stroke: "#e2e8f0" }} />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        label={{
                          value: "Headcount",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#4a5568",
                          offset: -5,
                        }}
                        tick={{ fill: "#4a5568" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{
                          value: "Attrition %",
                          angle: 90,
                          position: "insideRight",
                          fill: "#4a5568",
                          offset: -5,
                        }}
                        tick={{ fill: "#4a5568" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar
                        yAxisId="left"
                        dataKey="headcount"
                        fill="var(--color-headcount)"
                        name="Headcount"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="attrition"
                        stroke="var(--color-attrition)"
                        strokeWidth={3}
                        dot={{ r: 5, strokeWidth: 2 }}
                        activeDot={{ r: 7, strokeWidth: 2 }}
                        name="Attrition %"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  AI/ML Specialists Growth <CitationButton citationId="citation-2" />
                </h3>
                <div className="h-[250px] bg-white rounded-lg border border-gray-100 p-4">
                  <ChartContainer
                    config={{
                      percentage: {
                        label: "Percentage of Workforce",
                        color: "hsl(var(--chart-2))",
                      },
                      count: {
                        label: "Specialist Count",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={aiSpecialistData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" tick={{ fill: "#4a5568" }} axisLine={{ stroke: "#e2e8f0" }} />
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          label={{
                            value: "Percentage",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#4a5568",
                            offset: -5,
                          }}
                          tick={{ fill: "#4a5568" }}
                          axisLine={{ stroke: "#e2e8f0" }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          label={{
                            value: "Count",
                            angle: 90,
                            position: "insideRight",
                            fill: "#4a5568",
                            offset: -5,
                          }}
                          tick={{ fill: "#4a5568" }}
                          axisLine={{ stroke: "#e2e8f0" }}
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />
                        <Bar
                          yAxisId="left"
                          dataKey="percentage"
                          fill="var(--color-percentage)"
                          name="% of Workforce"
                          radius={[4, 4, 0, 0]}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="count"
                          stroke="var(--color-count)"
                          strokeWidth={3}
                          dot={{ r: 5, strokeWidth: 2 }}
                          activeDot={{ r: 7, strokeWidth: 2 }}
                          name="Specialist Count"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Hiring Mix Evolution <CitationButton citationId="citation-3" />
                </h3>
                <div className="h-[250px] bg-white rounded-lg border border-gray-100 p-4">
                  <ChartContainer
                    config={{
                      fresherHiring: {
                        label: "Fresher Hiring",
                        color: "hsl(var(--chart-1))",
                      },
                      lateralHiring: {
                        label: "Lateral Hiring",
                        color: "hsl(var(--chart-5))",
                      },
                      fresherPercentage: {
                        label: "Fresher %",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={hiringMixData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" tick={{ fill: "#4a5568" }} axisLine={{ stroke: "#e2e8f0" }} />
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          label={{
                            value: "Hiring Count",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#4a5568",
                            offset: -5,
                          }}
                          tick={{ fill: "#4a5568" }}
                          axisLine={{ stroke: "#e2e8f0" }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          label={{
                            value: "Percentage",
                            angle: 90,
                            position: "insideRight",
                            fill: "#4a5568",
                            offset: -5,
                          }}
                          tick={{ fill: "#4a5568" }}
                          axisLine={{ stroke: "#e2e8f0" }}
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />
                        <Bar
                          yAxisId="left"
                          dataKey="fresherHiring"
                          fill="var(--color-fresherHiring)"
                          name="Fresher Hiring"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          yAxisId="left"
                          dataKey="lateralHiring"
                          fill="var(--color-lateralHiring)"
                          name="Lateral Hiring"
                          radius={[4, 4, 0, 0]}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="fresherPercentage"
                          stroke="var(--color-fresherPercentage)"
                          strokeWidth={3}
                          dot={{ r: 5, strokeWidth: 2 }}
                          activeDot={{ r: 7, strokeWidth: 2 }}
                          name="Fresher %"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
