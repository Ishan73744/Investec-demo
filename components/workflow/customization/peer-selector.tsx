"use client"

import { useState } from "react"
import { Plus, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Company {
  id: string
  name: string
  sector: string
  marketCap: string
  logo: string
  logoColor: string
  metrics: {
    "Revenue Growth": string
    "Net Margin": string
    ROE: string
    "Debt/Equity": string
    "P/E Ratio": string
    "Market Cap": string
  }
}

interface PeerSelectorProps {
  primaryCompany: Company
  availableCompanies: Company[]
  selectedPeers: Company[]
  onPeerSelection: (peers: Company[]) => void
}

// Realistic pharmaceutical companies data for Aarti Drugs comparison
const pharmaceuticalCompanies: Company[] = [
  {
    id: "aarti-drugs",
    name: "Aarti Drugs Limited",
    sector: "Pharmaceuticals",
    marketCap: "₹4,650 Cr",
    logo: "AD",
    logoColor: "#004ce6",
    metrics: {
      "Revenue Growth": "4.2%",
      "Net Margin": "6.98%",
      ROE: "15.2%",
      "Debt/Equity": "0.46",
      "P/E Ratio": "18.5",
      "Market Cap": "₹4,650 Cr",
    },
  },
  {
    id: "sun-pharma",
    name: "Sun Pharmaceutical Industries",
    sector: "Pharmaceuticals",
    marketCap: "₹2,85,000 Cr",
    logo: "SP",
    logoColor: "#FF6B35",
    metrics: {
      "Revenue Growth": "10.8%",
      "Net Margin": "19.58%",
      ROE: "18.4%",
      "Debt/Equity": "0.12",
      "P/E Ratio": "22.3",
      "Market Cap": "₹2,85,000 Cr",
    },
  },
  {
    id: "cipla",
    name: "Cipla Limited",
    sector: "Pharmaceuticals",
    marketCap: "₹98,500 Cr",
    logo: "CI",
    logoColor: "#00A651",
    metrics: {
      "Revenue Growth": "6.4%",
      "Net Margin": "13.75%",
      ROE: "14.8%",
      "Debt/Equity": "0.08",
      "P/E Ratio": "19.7",
      "Market Cap": "₹98,500 Cr",
    },
  },
  {
    id: "dr-reddys",
    name: "Dr. Reddy's Laboratories",
    sector: "Pharmaceuticals",
    marketCap: "₹1,05,000 Cr",
    logo: "DR",
    logoColor: "#E31837",
    metrics: {
      "Revenue Growth": "8.1%",
      "Net Margin": "16.2%",
      ROE: "16.9%",
      "Debt/Equity": "0.15",
      "P/E Ratio": "21.4",
      "Market Cap": "₹1,05,000 Cr",
    },
  },
  {
    id: "lupin",
    name: "Lupin Limited",
    sector: "Pharmaceuticals",
    marketCap: "₹52,800 Cr",
    logo: "LU",
    logoColor: "#8B4513",
    metrics: {
      "Revenue Growth": "3.8%",
      "Net Margin": "8.9%",
      ROE: "12.1%",
      "Debt/Equity": "0.28",
      "P/E Ratio": "17.2",
      "Market Cap": "₹52,800 Cr",
    },
  },
  {
    id: "aurobindo",
    name: "Aurobindo Pharma",
    sector: "Pharmaceuticals",
    marketCap: "₹68,200 Cr",
    logo: "AU",
    logoColor: "#4A90E2",
    metrics: {
      "Revenue Growth": "5.6%",
      "Net Margin": "11.4%",
      ROE: "13.7%",
      "Debt/Equity": "0.22",
      "P/E Ratio": "16.8",
      "Market Cap": "₹68,200 Cr",
    },
  },
]

// Additional metrics that can be added
const availableMetrics = [
  "EBITDA Margin",
  "Current Ratio",
  "Asset Turnover",
  "Inventory Turnover",
  "Working Capital",
  "Free Cash Flow",
  "EV/EBITDA",
  "P/B Ratio",
  "Dividend Yield",
  "Beta",
  "Revenue per Employee",
  "R&D Spending",
]

export function PeerSelector({
  primaryCompany,
  availableCompanies,
  selectedPeers,
  onPeerSelection,
}: PeerSelectorProps) {
  // Use pharmaceutical companies for Aarti Drugs
  const [companies, setCompanies] = useState<Company[]>(pharmaceuticalCompanies)
  const [selectedMetrics, setSelectedMetrics] = useState([
    "Revenue Growth",
    "Net Margin",
    "ROE",
    "Debt/Equity",
    "P/E Ratio",
  ])

  const [isPeersModalOpen, setIsPeersModalOpen] = useState(false)
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false)
  const [peerSearchTerm, setPeerSearchTerm] = useState("")
  const [metricSearchTerm, setMetricSearchTerm] = useState("")

  // Filter companies to show (primary + selected peers)
  const displayedCompanies = companies.filter(
    (company) => company.id === primaryCompany.id || selectedPeers.some((peer) => peer.id === company.id),
  )

  // Available companies for adding (excluding already displayed ones)
  const availableToAdd = companies
    .filter((company) => company.id !== primaryCompany.id && !selectedPeers.some((peer) => peer.id === company.id))
    .filter((company) => company.name.toLowerCase().includes(peerSearchTerm.toLowerCase()))

  // Available metrics for adding (excluding already selected ones)
  const availableMetricsToAdd = availableMetrics
    .filter((metric) => !selectedMetrics.includes(metric))
    .filter((metric) => metric.toLowerCase().includes(metricSearchTerm.toLowerCase()))

  const addPeer = (company: Company) => {
    const newPeers = [...selectedPeers, company]
    onPeerSelection(newPeers)
    setIsPeersModalOpen(false)
    setPeerSearchTerm("")
  }

  const removePeer = (companyId: string) => {
    const newPeers = selectedPeers.filter((peer) => peer.id !== companyId)
    onPeerSelection(newPeers)
  }

  const addMetric = (metric: string) => {
    setSelectedMetrics([...selectedMetrics, metric])
    setIsMetricsModalOpen(false)
    setMetricSearchTerm("")
  }

  const removeMetric = (metric: string) => {
    if (selectedMetrics.length > 3) {
      // Keep at least 3 metrics
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric))
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-[#8098c4]">
        Here's your peer comparison table. You can add more companies and metrics using the buttons below.
      </div>

      {/* Main comparison table */}
      <div className="border border-[#EAF0FC] rounded-lg overflow-hidden relative">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-[#EAF0FC]">
                <th className="py-4 px-6 text-left text-[#344054] font-medium sticky left-0 bg-white z-10 min-w-[200px]">
                  Company
                </th>
                {selectedMetrics.map((metric) => (
                  <th
                    key={metric}
                    className="py-4 px-6 text-left text-[#344054] font-medium whitespace-nowrap relative group"
                  >
                    {metric}
                    {selectedMetrics.length > 3 && (
                      <button
                        onClick={() => removeMetric(metric)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAF0FC]">
              {displayedCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-[#F9FAFF] group">
                  <td className="py-4 px-6 sticky left-0 bg-white z-10 hover:bg-[#F9FAFF]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: company.logoColor }}
                      >
                        {company.logo}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${company.id === primaryCompany.id ? "text-[#004ce6]" : "text-[#101828]"}`}
                        >
                          {company.name}
                        </span>
                        {company.id === primaryCompany.id && (
                          <span className="text-xs bg-[#004ce6] text-white px-2 py-1 rounded">Primary</span>
                        )}
                        {company.id !== primaryCompany.id && (
                          <button
                            onClick={() => removePeer(company.id)}
                            className="w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ml-2"
                          >
                            <X size={10} />
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  {selectedMetrics.map((metric) => (
                    <td key={`${company.id}-${metric}`} className="py-4 px-6 text-[#101828]">
                      {company.metrics[metric as keyof typeof company.metrics] || "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Peer Button */}
        <div className="bg-[#F9FAFF] py-1 px-1 border-t border-[#EAF0FC] flex justify-center gap-2 relative z-20">
          <button
            onClick={() => setIsPeersModalOpen(true)}
            className="flex items-center justify-center gap-2 text-[#667085] hover:text-[#004ce6] transition-colors py-1 px-1 group"
          >
            <Plus size={16} className="text-[#667085] group-hover:text-[#004ce6] transition-colors" />
            <span className="font-medium text-xs group-hover:text-[#004ce6] transition-colors">Add peer</span>
          </button>
        </div>

        {/* Add Metric Button */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center">
          <button
            onClick={() => setIsMetricsModalOpen(true)}
            className="bg-[#F9FAFF] py-1 px-1 border-l border-[#EAF0FC] h-full w-8 flex flex-col items-center justify-center gap-4 group"
          >
            <Plus size={16} className="text-[#667085] font-medium group-hover:text-[#004ce6] transition-colors" />
            <span className="text-[#667085] font-medium text-xs rotate-90 transform origin-center whitespace-nowrap group-hover:text-[#004ce6] transition-colors">
              Metric
            </span>
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button onClick={() => onPeerSelection(selectedPeers)} className="bg-[#004ce6] hover:bg-[#0041cc] text-white">
          Continue to Analysis Options
        </Button>
      </div>

      {/* Add Peers Modal */}
      <Dialog open={isPeersModalOpen} onOpenChange={setIsPeersModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Peer Company</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8098c4] h-4 w-4" />
              <Input
                placeholder="Search for companies..."
                value={peerSearchTerm}
                onChange={(e) => setPeerSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {availableToAdd.map((company) => (
                <div
                  key={company.id}
                  onClick={() => addPeer(company)}
                  className="p-3 border border-[#e1e8f6] rounded-lg cursor-pointer hover:border-[#004ce6] hover:bg-[#f4f9ff] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: company.logoColor }}
                    >
                      {company.logo}
                    </div>
                    <div>
                      <div className="font-medium text-[#001742]">{company.name}</div>
                      <div className="text-sm text-[#8098c4]">{company.marketCap}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Metrics Modal */}
      <Dialog open={isMetricsModalOpen} onOpenChange={setIsMetricsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Metric</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8098c4] h-4 w-4" />
              <Input
                placeholder="Search for metrics..."
                value={metricSearchTerm}
                onChange={(e) => setMetricSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {availableMetricsToAdd.map((metric) => (
                <div
                  key={metric}
                  onClick={() => addMetric(metric)}
                  className="p-3 border border-[#e1e8f6] rounded-lg cursor-pointer hover:border-[#004ce6] hover:bg-[#f4f9ff] transition-all"
                >
                  <div className="font-medium text-[#001742]">{metric}</div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
