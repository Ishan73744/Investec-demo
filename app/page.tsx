import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Updated workflows data with only the 4 specified workflows
const workflows = [
  {
    name: "Screenshot Chart to Excel",
    description:
      "Upload a screenshot of any chart and convert it into an editable Excel chart, allowing you to edit it in the browser and integrate it into your reports.",
    steps: 3,
    path: "/workflows/screenshot-chart",
  },
  {
    name: "Financial Statement Extraction from PDF to Excel",
    description:
      "Detect and extract the three key financial statements (Income Statement, Balance Sheet, Cash Flow) from an uploaded PDF and convert them into Excel format for further analysis.",
    steps: 4,
    path: "/workflows/financial-statement-extraction",
  },
  {
    name: "Company One-Pagers – Strategic Summary Profiles",
    description:
      "Concise, standardized one-page summaries of companies covering key business details, product focus, financial performance, manufacturing footprint, and strategic transactions — for quick partner-level decision-making and opportunity assessment.",
    steps: 1,
    path: "/workflows/company-one-pager",
  },
  {
    name: "Peer Set Generation & Comparative Table Creation",
    description:
      "Enter a company name and automatically generate a peer set with a custom comparative table showing key financial metrics, valuations, and performance indicators.",
    steps: 3,
    path: "/workflows/peer-comparison",
  },
]

export default function Page() {
  return (
    <div className="h-full overflow-auto scrollbar-hide">
      <div className="px-6 py-6">
        <div className="grid gap-6 md:grid-cols-2">
          {workflows.map((workflow, index) => (
            <Link
              key={index}
              href={workflow.path}
              className="rounded-lg border border-[#e1e8f6] bg-[#FBFDFF] p-4 transition-colors hover:bg-white hover:shadow-sm"
            >
              <h3 className="text-base font-medium text-[#001742]">{workflow.name}</h3>
              <p className="mt-2 text-sm text-[#6e7b96]">{workflow.description}</p>
              <div className="mt-2 flex items-center gap-1">
                <div className="text-xs text-[#8098c4]">{workflow.steps} steps</div>
                <ArrowRight className="h-3 w-3 text-[#8098c4] mx-1" />
                <div className="flex items-center gap-1 bg-[#f2f4f7] rounded-md px-2 py-0.5">
                  {workflow.name === "Screenshot Chart to Excel" ||
                  workflow.name === "Financial Statement Extraction from PDF to Excel" ||
                  workflow.name === "Peer Set Generation & Comparative Table Creation" ? (
                    <>
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201000004581-qMr1tksNcWjItvl6u5fAyfEgFFjAQT.png"
                        alt="Excel"
                        className="w-3 h-4"
                      />
                      <span className="text-xs font-medium text-[#4e5971]">Excel</span>
                    </>
                  ) : (
                    <>
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PDF%20Icon-ymdgoZrxsua2O7fNTjvAQNa9lS4EZV.png"
                        alt="PDF"
                        className="w-3 h-4"
                      />
                      <span className="text-xs font-medium text-[#4e5971]">PDF</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
