import {
  BarChart3,
  Building,
  FileSearch,
  FileText,
  GanttChartSquare,
  Library,
  PieChart,
  ScanLine,
  ShieldCheck,
  Users,
  ZoomIn,
} from "lucide-react"
import Link from "next/link"

const workflowCategories = [
  {
    title: "Screening & Due Diligence",
    workflows: [
      {
        title: "Company & Management Screening",
        description: "Conduct background checks on companies and their key personnel.",
        href: "/workflows/company-management-screening",
        icon: ShieldCheck,
      },
      {
        title: "IPO Screening",
        description: "Analyze and screen upcoming Initial Public Offerings.",
        href: "/workflows/ipo-screening",
        icon: Building,
      },
    ],
  },
  {
    title: "Financial Analysis",
    workflows: [
      {
        title: "Peer Comparison",
        description: "Compare financial metrics of a company against its peers.",
        href: "/workflows/peer-comparison",
        icon: Users,
      },
      {
        title: "Ratio Analysis",
        description: "Calculate and analyze key financial ratios from statements.",
        href: "/workflows/ratio-analysis",
        icon: PieChart,
      },
      {
        title: "Anomaly Detection",
        description: "Identify unusual patterns and outliers in financial data.",
        href: "/workflows/anomaly-detection",
        icon: ZoomIn,
      },
    ],
  },
  {
    title: "Market & Industry Research",
    workflows: [
      {
        title: "Market & Industry Research",
        description: "Generate comprehensive reports on specific markets or industries.",
        href: "/workflows/market-industry-research",
        icon: GanttChartSquare,
      },
      {
        title: "Industry Sizing",
        description: "Estimate the market size and potential of an industry.",
        href: "/workflows/industry-sizing",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Data Extraction & Summarization",
    workflows: [
      {
        title: "Financial Statement Extraction",
        description: "Extract structured data from financial statement documents.",
        href: "/workflows/financial-statement-extraction",
        icon: FileSearch,
      },
      {
        title: "Quarterly Results Extractor",
        description: "Pull key metrics from quarterly earnings reports.",
        href: "/workflows/quarterly-results-extractor",
        icon: FileText,
      },
      {
        title: "Screenshot to Chart/Table",
        description: "Convert images of charts or tables into editable data.",
        href: "/workflows/screenshot-chart",
        icon: ScanLine,
      },
      {
        title: "Document Summary",
        description: "Generate concise summaries of long documents.",
        href: "/workflows/document-summary",
        icon: Library,
      },
      {
        title: "Company One-Pager",
        description: "Create a single-page summary of a company profile.",
        href: "/workflows/company-one-pager",
        icon: Building,
      },
      {
        title: "RERA Filings",
        description: "Extract and analyze data from RERA filing documents.",
        href: "/workflows/rera-filings",
        icon: FileSearch,
      },
    ],
  },
]

export default function WorkflowsPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F9FF]">
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800">Workflows</h1>
        <p className="mt-2 text-gray-600">Automate your financial analysis and research tasks.</p>

        {workflowCategories.map((category) => (
          <div key={category.title} className="mt-10">
            <h2 className="text-xl font-semibold text-gray-700">{category.title}</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.workflows.map((workflow) => (
                <Link href={workflow.href} key={workflow.title}>
                  <div className="flex h-full transform flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                        <workflow.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-800">{workflow.title}</h3>
                      <p className="mt-2 text-sm text-gray-600">{workflow.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
