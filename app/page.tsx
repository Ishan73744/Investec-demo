import type React from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChartBig,
  Building2,
  FileSearch,
  Microscope,
  ScanText,
  Scale,
  Search,
  SlidersHorizontal,
} from "lucide-react"

const workflowCategories = [
  {
    name: "Financial Analysis",
    workflows: [
      {
        name: "Ratio Analysis",
        description: "Calculate and analyze key financial ratios from statements.",
        href: "/workflows/ratio-analysis",
        icon: Scale,
      },
      {
        name: "Anomaly Detection",
        description: "Identify unusual patterns and outliers in financial data.",
        href: "/workflows/anomaly-detection",
        icon: Microscope,
      },
      {
        name: "Peer Comparison",
        description: "Benchmark a company against its competitors on key metrics.",
        href: "/workflows/peer-comparison",
        icon: BarChartBig,
      },
      {
        name: "Quarterly Results Extractor",
        description: "Extract key data points from quarterly earnings reports.",
        href: "/workflows/quarterly-results-extractor",
        icon: ScanText,
      },
    ],
  },
  {
    name: "Market & Company Research",
    workflows: [
      {
        name: "Market & Industry Research",
        description: "Generate a comprehensive report on a specific market or industry.",
        href: "/workflows/market-industry-research",
        icon: Search,
      },
      {
        name: "Industry Sizing",
        description: "Estimate the market size and growth potential of an industry.",
        href: "/workflows/industry-sizing",
        icon: SlidersHorizontal,
      },
      {
        name: "Company One-Pager",
        description: "Create a concise one-page summary of a company.",
        href: "/workflows/company-one-pager",
        icon: FileSearch,
      },
    ],
  },
  {
    name: "Screening & Due Diligence",
    workflows: [
      {
        name: "IPO Screening",
        description: "Analyze and screen upcoming Initial Public Offerings.",
        href: "/workflows/ipo-screening",
        icon: Building2,
      },
      {
        name: "Company & Management Screening",
        description: "Conduct background checks on companies and their key personnel.",
        href: "/workflows/company-management-screening",
        icon: Building2,
      },
    ],
  },
  {
    name: "Document & Data Extraction",
    workflows: [
      {
        name: "Financial Statement Extraction",
        description: "Extract structured data from financial statement documents.",
        href: "/workflows/financial-statement-extraction",
        icon: ScanText,
      },
      {
        name: "Document Summary",
        description: "Generate concise summaries of long documents.",
        href: "/workflows/document-summary",
        icon: FileSearch,
      },
      {
        name: "Screenshot to Chart/Table",
        description: "Convert images of charts or tables into editable data.",
        href: "/workflows/screenshot-chart",
        icon: ScanText,
      },
      {
        name: "RERA Filings",
        description: "Extract and analyze data from RERA filing documents.",
        href: "/workflows/rera-filings",
        icon: FileSearch,
      },
    ],
  },
]

const WorkflowCard = ({
  name,
  description,
  href,
  icon: Icon,
}: { name: string; description: string; href: string; icon: React.ElementType }) => (
  <Link
    href={href}
    className="group block rounded-lg border bg-white p-4 transition-all hover:shadow-md hover:border-blue-200"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf0fc] text-[#004ce6]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
    </div>
    <p className="mt-2 text-sm text-gray-600">{description}</p>
  </Link>
)

export default function WorkflowsPage() {
  return (
    <div className="flex-1 bg-[#F9FBFF] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
          <p className="mt-2 text-gray-600">Automate your research and analysis tasks with our pre-built workflows.</p>
        </header>

        <div className="space-y-10">
          {workflowCategories.map((category) => (
            <section key={category.name}>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">{category.name}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.workflows.map((workflow) => (
                  <WorkflowCard key={workflow.name} {...workflow} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
