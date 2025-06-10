import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Private Equity workflows data with materials required (stored but not displayed)
const privateEquityWorkflows = [
  {
    category: "Deal Sourcing & Initial Screening",
    workflows: [
      {
        name: "CIM Data Extraction & Screening",
        description:
          "Extract key financial and qualitative data from a Confidential Information Memorandum (CIM) to determine if a target meets initial investment criteria.",
        steps: 5,
        path: "/workflows/cim-data-extraction",
        materials: [
          "CIM (PDF or digital document)",
          "Historical financial data (embedded in the CIM)",
          "Industry benchmarks (optional external data)",
          "Screening criteria checklist (internal template)",
          "Excel or templated model for data input",
        ],
      },
      {
        name: "Market & Industry Research Pre-Screen",
        description:
          "Perform preliminary research to gauge industry trends and market conditions for sectors in which potential targets operate.",
        steps: 4,
        path: "/workflows/market-industry-research",
        materials: [
          "Industry reports/market analysis documents",
          "Public databases/financial data feeds (Bloomberg, Capital IQ)",
          "Screening template for market trends",
          "Digital research tools (web browser, news aggregator)",
        ],
      },
      {
        name: "Initial LBO Model Setup",
        description:
          "Build a basic Leveraged Buyout (LBO) model using extracted financial data to estimate potential returns and assess deal viability.",
        steps: 6,
        path: "/workflows/initial-lbo-model",
        materials: [
          "Historical financials (from CIM or extracted source)",
          "Standardized LBO model template (Excel)",
          "Assumptions list (debt/equity ratio, interest rates, exit multiples)",
          "Market comparables data",
          "Financial data terminal access (optional)",
        ],
      },
      {
        name: "Preliminary Investment Screening Memo",
        description:
          "Draft a one-page memo summarizing the target's key metrics, model outputs, and preliminary recommendation for further due diligence.",
        steps: 4,
        path: "/workflows/preliminary-investment-memo",
        materials: [
          "Output from the initial LBO model",
          "CIM summary points",
          "Internal screening criteria",
          "Word processing software or templated slide deck",
        ],
      },
    ],
  },
  {
    category: "Due Diligence Coordination",
    workflows: [
      {
        name: "Due Diligence Request Generation",
        description:
          "Create and send a standardized due diligence request list to target companies to collect missing or detailed data.",
        steps: 4,
        path: "/workflows/due-diligence-request",
        materials: [
          "Preliminary CIM and screening memo",
          "Due diligence checklist (template)",
          "Email or DMS (Document Management System) access",
          "Contact list for target company representatives",
        ],
      },
      {
        name: "Data Room Document Tracking",
        description:
          "Organize and log incoming documents from the target's secure data room, ensuring all required files are received and noted.",
        steps: 5,
        path: "/workflows/data-room-tracking",
        materials: [
          "Access to the virtual data room",
          "Checklist of required documents",
          "Spreadsheet or due diligence tracker tool",
          "Email system for coordinating follow-ups",
          "Internal notes on document status",
        ],
      },
      {
        name: "Financial Detail Extraction & Integration",
        description:
          "Extract detailed financial information from due diligence documents to update the existing LBO model and refine assumptions.",
        steps: 6,
        path: "/workflows/financial-detail-extraction",
        materials: [
          "Due diligence documents (detailed financials, Quality of Earnings report)",
          "Existing LBO model file",
          "Financial analysis software (Excel)",
          "Data extraction tool or manual input template",
          "Comparative market data (if available)",
        ],
      },
      {
        name: "Investment Committee Memo Drafting",
        description:
          "Consolidate findings from due diligence and modeling into a comprehensive memo for presentation to the investment committee.",
        steps: 5,
        path: "/workflows/investment-committee-memo",
        materials: [
          "Consolidated due diligence findings",
          "Updated LBO model summary outputs",
          "Internal memo template or slide deck",
          "Comments/feedback from team members",
          "Relevant charts/graphs (exported from Excel)",
        ],
      },
    ],
  },
  {
    category: "Portfolio Monitoring & Performance Tracking",
    workflows: [
      {
        name: "Monthly Financial Pack Consolidation",
        description:
          "Compile monthly financial reports from portfolio companies, updating internal trackers to assess performance against targets.",
        steps: 5,
        path: "/workflows/monthly-financial-pack",
        materials: [
          "Monthly financial reports (sent by portfolio companies)",
          "Excel or dashboard for tracking KPIs",
          "Benchmark and budget data",
          "Email/communication tool for follow-up",
          "Internal monitoring template",
        ],
      },
      {
        name: "KPI Variance Analysis",
        description:
          "Analyze deviations between actual performance and budget, identifying causes for variances and preparing a summary for internal review.",
        steps: 4,
        path: "/workflows/kpi-variance-analysis",
        materials: [
          "Updated financial pack data",
          "Pre-established variance analysis template",
          "Historical performance data",
          "Analytical tools (Excel pivot tables/graphs)",
        ],
      },
      {
        name: "Automated Valuation Update",
        description:
          "Update the valuation model for a portfolio company using the latest financials and market comparables to refresh investment value estimates.",
        steps: 5,
        path: "/workflows/automated-valuation-update",
        materials: [
          "Latest financial data from portfolio companies",
          "Current market multiples/industry comparables",
          "Valuation model template (Excel)",
          "Financial data terminal output (if available)",
          "Data update instructions or macro-enabled workbook",
        ],
      },
      {
        name: "Board Reporting Deck Preparation",
        description:
          "Generate a concise board presentation that highlights portfolio performance, key variance drivers, and strategic recommendations.",
        steps: 4,
        path: "/workflows/board-reporting-deck",
        materials: [
          "Consolidated KPI and valuation data",
          "PowerPoint template for board reports",
          "Summary commentary from the monitoring process",
          "Visual charts/graphs from Excel",
          "Internal strategic notes",
        ],
      },
    ],
  },
  {
    category: "Investor Reporting & Communication",
    workflows: [
      {
        name: "Fund Performance Calculation",
        description:
          "Aggregate individual portfolio data to compute overall fund performance indicators such as IRR, MOIC, and NAV.",
        steps: 5,
        path: "/workflows/fund-performance-calculation",
        materials: [
          "Individual portfolio valuations",
          "Capital call and distribution records",
          "Fund accounting data",
          "Excel model for IRR/MOIC calculations",
          "Data reconciliation checklist",
        ],
      },
      {
        name: "Investor Report Template Update",
        description:
          "Refresh a pre-designed investor report template with the latest performance metrics and narrative, ensuring accuracy and consistency.",
        steps: 4,
        path: "/workflows/investor-report-template",
        materials: [
          "Latest calculated fund performance data",
          "Investor report template (Word/PPT)",
          "Standard narrative sections for performance commentary",
          "Historical performance benchmarks",
          "Data integration from internal systems",
        ],
      },
      {
        name: "Narrative Commentary Drafting",
        description:
          "Generate a concise narrative summarizing the quarter's performance, deal updates, and market commentary for investors.",
        steps: 3,
        path: "/workflows/narrative-commentary",
        materials: [
          "Performance summary data",
          "Recent deal updates and notable events",
          "Internal guidance or a style template for tone",
          "Drafting tool (Word processor, AI language model assistance)",
        ],
      },
      {
        name: "Distribution & Compliance Check",
        description:
          "Verify and distribute the final investor report package to all Limited Partners (LPs), ensuring it meets regulatory compliance.",
        steps: 4,
        path: "/workflows/distribution-compliance",
        materials: [
          "Finalized investor report (PDF/Word)",
          "LP distribution list or CRM system",
          "Compliance checklist (formatting, disclosures, etc.)",
          "Email or secure document distribution system",
          "Tracking/log report output",
        ],
      },
    ],
  },
]

// Add the generalWorkflows data after the privateEquityWorkflows array
const generalWorkflows = [
  {
    category: "Document Processing & Data Extraction",
    workflows: [
      {
        name: "Screenshot Chart to Excel",
        description:
          "Upload a screenshot of any chart and convert it into an editable Excel chart, allowing you to edit it in the browser and integrate it into your reports.",
        steps: 3,
        path: "/workflows/screenshot-chart",
        materials: [
          "Uploaded Screenshot of Chart",
          "Chart Recognition & Conversion Engine (OCR to convert chart into data)",
          "Editable Excel Template (for inserting and editing the chart)",
          "Automated Excel Chart Integration (tools for smooth browser editing)",
        ],
      },
      {
        name: "Personalized Document Summary Generator",
        description:
          "Upload any document (e.g., report, financials, presentation) and get a personalized summary, allowing you to select specific sections of interest for extraction.",
        steps: 3,
        path: "/workflows/document-summary",
        materials: [
          "Uploaded Document (PDF, Word, or other formats)",
          "Preconfigured Section Templates (for user-defined summarization)",
          "AI-Based Natural Language Processing (NLP) Engine (to extract and summarize content based on preferences)",
        ],
      },
      {
        name: "Financial Statement Extraction from PDF to Excel",
        description:
          "Detect and extract the three key financial statements (Income Statement, Balance Sheet, Cash Flow) from an uploaded PDF and convert them into Excel format for further analysis.",
        steps: 4,
        path: "/workflows/financial-statement-extraction",
        materials: [
          "Uploaded PDF Document (with financial statements)",
          "AI-Driven Financial Statement Detection Engine (for auto-extraction)",
          "Excel Template for Financials (to place extracted data into relevant sheets)",
          "Automated Formula Application (for financial metrics like ratios, growth)",
        ],
      },
      {
        name: "Industry Sizing and Market Segmentation Report Generation",
        description:
          "Automate industry analysis by pulling data from DRHPs, Euromonitor, and news sources to generate segmented industry reports (e.g., pet care market segmentation).",
        steps: 4,
        path: "/workflows/industry-sizing",
        materials: [
          "Industry Reports (DRHP, Euromonitor)",
          "Automated Sizing Models",
          "Segment Breakdown Template",
          "NLP Extraction Engine",
          "Visualization & Dashboard Tools",
        ],
      },
    ],
  },
  {
    category: "Financial Analysis & Reporting",
    workflows: [
      {
        name: "Financial Statement Red Flag Detection in Excel",
        description:
          "Upload an Excel file containing financial statements and automatically detect any red flags or anomalies based on predefined financial analysis criteria.",
        steps: 3,
        path: "/workflows/red-flag-detection",
        materials: [
          "Uploaded Excel File with Financial Statements",
          "Predefined Red Flag Detection Criteria (e.g., abnormal ratios, negative growth)",
          "Automated Excel Formula Engine (for analysis and flagging)",
        ],
      },
      {
        name: "Due Diligence on Company Promoters",
        description:
          "Enter a company name to automatically generate a comprehensive due diligence report on the company's promoters, including background checks, financials, and public data analysis.",
        steps: 3,
        path: "/workflows/promoter-due-diligence",
        materials: [
          "Company Name Input",
          "Integrated Public Database Access (to gather promoter information)",
          "Preconfigured Due Diligence Template (for generating detailed reports)",
        ],
      },
      {
        name: "DRHP/IPO Document Screening",
        description:
          "Upload a DRHP (Draft Red Herring Prospectus) or IPO document, select the company name, and customize an IPO report based on predefined or user-selected criteria.",
        steps: 4,
        path: "/workflows/ipo-screening",
        materials: [
          "Uploaded DRHP/IPO Document",
          "Company Name Input (for automatic company identification)",
          "Preconfigured IPO Screening Template (to generate the IPO report)",
          "Customizable Report Criteria (user selects relevant sections for the report)",
        ],
      },
      {
        name: "Company One-Pagers – Strategic Summary Profiles",
        description:
          "Concise, standardized one-page summaries of companies covering key business details, product focus, financial performance, manufacturing footprint, and strategic transactions — for quick partner-level decision-making and opportunity assessment.",
        steps: 1,
        path: "/workflows/company-one-pager",
        materials: [
          "Company Name Input",
          "Automated Data Collection Engine",
          "Standardized Profile Template",
          "Financial Analysis Tools",
          "PDF Export Functionality",
        ],
      },
    ],
  },
  {
    category: "Data Extraction & Custom Reporting",
    workflows: [
      {
        name: "Custom Screener Memo from CIM Upload",
        description:
          "Upload a Confidential Information Memorandum (CIM), and automatically generate a customized screening memo in the output format of your choice.",
        steps: 4,
        path: "/workflows/cim-screener",
        materials: [
          "Uploaded CIM Document",
          "Preconfigured Screening Memo Template (with customizable outputs)",
          "AI-Driven Content Extraction Engine (to pull relevant data from CIM)",
          "User-Defined Output Format (e.g., PDF, Word, PowerPoint)",
        ],
      },
      {
        name: "Verifiable Metric Extraction from Document",
        description:
          "Upload any document and specify the metrics you wish to extract; get source-linked, verifiable metrics that can be used for further analysis or reporting.",
        steps: 4,
        path: "/workflows/metric-extraction",
        materials: [
          "Uploaded Document (PDF, Word, or other formats)",
          "User-Defined Metric Extraction Criteria (specific metrics or data points)",
          "AI-Powered Extraction Engine (to retrieve and verify data)",
          "Source-Linking & Verification Tools (to ensure extracted metrics are reliable)",
        ],
      },
      {
        name: "Peer Set Generation & Comparative Table Creation",
        description:
          "Enter a company name and automatically generate a peer set with a custom comparative table showing key financial metrics, valuations, and performance indicators.",
        steps: 3,
        path: "/workflows/peer-comparison",
        materials: [
          "Company Name Input",
          "Integrated Peer Group Data Feed (to identify comparable companies)",
          "Preconfigured Comparative Table Template (for financial metrics and performance comparison)",
          "User-Defined Customization Options (e.g., select specific financial metrics)",
        ],
      },
      {
        name: "RERA filings & press mentions",
        description:
          "Automatically consolidate and monitor critical regulatory disclosures (SEBI filings) and real-estate project filings (RERA)—along with press mentions—into a single, structured report. Flag on-time vs. delayed submissions, scope changes, and compliance breaches for your selected entities.",
        steps: 3,
        path: "/workflows/rera-filings",
        materials: [
          "Entity Selection Interface",
          "RERA & SEBI Database Access",
          "Compliance Monitoring Engine",
          "Structured Report Generator",
        ],
      },
      {
        name: "Quarterly Results Extractor",
        description:
          "Automatically pull the latest quarterly filings (SEBI/EDGAR or uploaded PDFs), extract key financial metrics and commentary, and deliver a ready-to-use Excel workbook—complete with calculations and management notes.",
        steps: 5,
        path: "/workflows/quarterly-results-extractor",
        materials: [
          "Company Selection Interface",
          "Auto-Fetch or Upload Option",
          "Metrics Selection Tool",
          "Excel Template Generator",
          "Management Commentary Extractor",
        ],
      },
    ],
  },
]

// Update the personaTabs array to include "General" as the first tab
const personaTabs = [
  { id: "general", name: "General" },
  { id: "private-equity", name: "Private Equity" },
  { id: "investment-banking", name: "Investment Banking" },
  { id: "corporate-finance", name: "Corporate Finance" },
  { id: "risk-management", name: "Risk Management" },
  { id: "equity-research", name: "Equity Research" },
  { id: "asset-management", name: "Asset Management" },
]

export default function Page() {
  return (
    <Tabs defaultValue="general" className="h-full flex flex-col">
      {/* Fixed tab header */}
      <div className="px-6 pt-6 pb-2">
        <TabsList className="bg-transparent p-0 h-auto flex gap-6 overflow-x-auto justify-start">
          {personaTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="px-4 py-2 rounded-md data-[state=active]:bg-[#f0f4fa] data-[state=active]:text-[#001742] text-[#6e7b96] hover:text-[#001742] transition-colors data-[state=active]:shadow-none"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-hidden">
        <TabsContent value="general" className="h-full m-0 data-[state=active]:border-0 overflow-auto scrollbar-hide">
          <div className="px-6 pb-6">
            <div className="space-y-8 mt-6">
              {generalWorkflows.map((category, index) => (
                <div key={index}>
                  <h2 className="mb-4 text-xl font-medium text-[#101828]">{category.category}</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {category.workflows.map((workflow, wIndex) => (
                      <Link
                        key={wIndex}
                        href={workflow.path}
                        className="rounded-lg border border-[#e1e8f6] bg-[#FBFDFF] p-4 transition-colors hover:bg-white hover:shadow-sm"
                      >
                        <h3 className="text-base font-medium text-[#001742]">{workflow.name}</h3>
                        <p className="mt-2 text-sm text-[#6e7b96]">{workflow.description}</p>
                        {(() => {
                          if (
                            workflow.name === "Screenshot Chart to Excel" ||
                            workflow.name === "Financial Statement Extraction from PDF to Excel" ||
                            workflow.name === "Peer Set Generation & Comparative Table Creation"
                          ) {
                            return (
                              <div className="mt-2 flex items-center gap-1">
                                <div className="text-xs text-[#8098c4]">{workflow.steps} steps</div>
                                <ArrowRight className="h-3 w-3 text-[#8098c4] mx-1" />
                                <div className="flex items-center gap-1 bg-[#f2f4f7] rounded-md px-2 py-0.5">
                                  <img
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201000004581-qMr1tksNcWjItvl6u5fAyfEgFFjAQT.png"
                                    alt="Excel"
                                    className="w-3 h-4"
                                  />
                                  <span className="text-xs font-medium text-[#4e5971]">Excel</span>
                                </div>
                              </div>
                            )
                          } else {
                            return (
                              <div className="mt-2 flex items-center gap-1">
                                <div className="text-xs text-[#8098c4]">{workflow.steps} steps</div>
                                <ArrowRight className="h-3 w-3 text-[#8098c4] mx-1" />
                                <div className="flex items-center gap-1 bg-[#f2f4f7] rounded-md px-2 py-0.5">
                                  <img
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PDF%20Icon-ymdgoZrxsua2O7fNTjvAQNa9lS4EZV.png"
                                    alt="PDF"
                                    className="w-3 h-4"
                                  />
                                  <span className="text-xs font-medium text-[#4e5971]">PDF</span>
                                </div>
                              </div>
                            )
                          }
                        })()}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="private-equity"
          className="h-full m-0 data-[state=active]:border-0 overflow-auto scrollbar-hide"
        >
          <div className="px-6 pb-6">
            <div className="space-y-8 mt-6">
              {privateEquityWorkflows.map((category, index) => (
                <div key={index}>
                  <h2 className="mb-4 text-xl font-medium text-[#101828]">{category.category}</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {category.workflows.map((workflow, wIndex) => (
                      <Link
                        key={wIndex}
                        href={workflow.path}
                        className="rounded-lg border border-[#e1e8f6] bg-[#FBFDFF] p-4 transition-colors hover:bg-white hover:shadow-sm"
                      >
                        <h3 className="text-base font-medium text-[#001742]">{workflow.name}</h3>
                        <p className="mt-2 text-sm text-[#6e7b96]">{workflow.description}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <div className="text-xs text-[#8098c4]">{workflow.steps} steps</div>
                          <ArrowRight className="h-3 w-3 text-[#8098c4] mx-1" />
                          <div className="flex items-center gap-1 bg-[#f2f4f7] rounded-md px-2 py-0.5">
                            <img
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PDF%20Icon-ymdgoZrxsua2O7fNTjvAQNa9lS4EZV.png"
                              alt="PDF"
                              className="w-3 h-4"
                            />
                            <span className="text-xs font-medium text-[#4e5971]">PDF</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Placeholder content for other personas */}
        {personaTabs.slice(1).map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="h-full m-0 data-[state=active]:border-0 overflow-auto scrollbar-hide"
          >
            <div className="px-6 pb-6">
              <div className="mt-6 text-center py-12 text-[#6e7b96]">
                <h3 className="text-lg font-medium text-[#001742] mb-2">{tab.name} Workflows</h3>
                <p>Content for {tab.name} will be added soon.</p>
              </div>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}

// Add this CSS class at the end of the component
// This will be added to the globals.css file
// @layer utilities {
//   .scrollbar-hide {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
//   .scrollbar-hide::-webkit-scrollbar {
//     display: none;
//   }
// }
