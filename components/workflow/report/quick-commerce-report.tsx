"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts"

interface QuickCommerceReportProps {
  region: string
  timeFrame: number[]
  onRestart: () => void
}

export function QuickCommerceReport({ region, timeFrame, onRestart }: QuickCommerceReportProps) {
  const pageRef = useRef<HTMLDivElement>(null)

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num)
  }

  const pieData = [
    { name: "Grocery", value: 60, color: "#3B82F6" },
    { name: "Ready-to-Eat", value: 30, color: "#60A5FA" },
    { name: "Pharmacy", value: 10, color: "#93C5FD" },
  ]

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180
    const radius = outerRadius * 1.1
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="#475569" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const barData = [
    { name: "Grocery", "2023": 30000, "2026": 42900 },
    { name: "Ready-to-Eat", "2023": 15000, "2026": 31950 },
    { name: "Pharmacy", "2023": 5000, "2026": 17150 },
  ]

  const cagrData = [
    { name: "Grocery", value: 12, color: "#3B82F6" },
    { name: "Ready-to-Eat", value: 27, color: "#60A5FA" },
    { name: "Pharmacy", value: 45, color: "#93C5FD" },
    { name: "Overall", value: 28, color: "#2563EB" },
  ]

  return (
    <div className="w-full mx-auto">
      <div
        ref={pageRef}
        className="w-full mx-auto bg-white border border-[#e1e8f6] rounded-md overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(#f1f5f9 0.5px, transparent 0.5px), radial-gradient(#f1f5f9 0.5px, #ffffff 0.5px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      >
        {/* Header */}
        <div className="bg-[#002673] p-6 border-b border-[#e1e8f6] text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Quick Commerce Industry</h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-sm text-gray-200">Market Sizing & Segmentation Report | 2023-2026</p>
                <div className="h-4 w-px bg-gray-400"></div>
                <p className="text-sm text-gray-200">
                  Region: <span className="font-medium">{region}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3">
            <div className="bg-white bg-opacity-10 border-l-4 border-blue-400 p-3 rounded-r-md shadow-sm">
              <p className="text-sm text-white italic font-light leading-relaxed">
                "The {region} quick commerce sector is experiencing rapid growth, with the market expected to nearly
                double by 2026. This report provides a comprehensive analysis of market segments, growth drivers, and
                strategic recommendations for stakeholders."
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Executive Summary */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              <h2 className="text-lg text-gray-800 font-medium">Executive Summary</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-lg p-4">
                <div className="text-xs uppercase text-gray-500 tracking-wider mb-1 font-medium">
                  Market Size (2023)
                </div>
                <div className="text-xl text-gray-800 mb-2 font-medium">₹50,000 Cr</div>
                <div className="text-[10px] text-blue-600 font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Projected CAGR: 28%
                </div>
              </div>
              <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-lg p-4">
                <div className="text-xs uppercase text-gray-500 tracking-wider mb-1 font-medium">Forecast (2026)</div>
                <div className="text-xl text-gray-800 mb-2 font-medium">₹92,000 Cr</div>
                <div className="text-[10px] text-blue-600 font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  84% growth over 2023
                </div>
              </div>
              <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-lg p-4">
                <div className="text-xs uppercase text-gray-500 tracking-wider mb-1 font-medium">Leading Segment</div>
                <div className="text-xl text-gray-800 mb-2 font-medium">Grocery (60%)</div>
                <div className="text-[10px] text-blue-600 font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Fastest: Pharmacy (45% CAGR)
                </div>
              </div>
            </div>
          </div>

          {/* Industry Sizing & Forecast */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              <h2 className="text-lg text-gray-800 font-medium">Industry Sizing & Forecast</h2>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-white">
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-medium"
                    >
                      Segment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium"
                    >
                      2023 Size (₹ Cr)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium"
                    >
                      2026 Forecast (₹ Cr)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider font-medium"
                    >
                      CAGR (2023–26)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">Grocery</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-800">30,000</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-800">42,900</td>
                    <td className="px-6 py-4 text-sm text-right text-black font-medium">12%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">Ready-to-Eat</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-800">15,000</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-800">31,950</td>
                    <td className="px-6 py-4 text-sm text-right text-black font-medium">27%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">Pharmacy</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-800">5,000</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-800">17,150</td>
                    <td className="px-6 py-4 text-sm text-right text-black font-medium">45%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">Total</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-800 font-medium">50,000</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-800 font-medium">92,000</td>
                    <td className="px-6 py-4 text-sm text-right text-black font-medium">28%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Segment Market Share and Growth Comparison - Horizontal Layout */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              <h2 className="text-lg text-gray-800 font-medium">Market Visualization</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Segment Market Share */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm text-gray-700 font-medium">Segment Market Share (2023)</h3>
                </div>
                <div className="p-4 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomizedLabel}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Segment Growth Comparison */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm text-gray-700 font-medium">Segment Growth Comparison</h3>
                </div>
                <div className="p-4 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={{ stroke: "#CBD5E1" }} />
                      <YAxis
                        tickFormatter={(value) => `${value / 1000}k`}
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: "#CBD5E1" }}
                      />
                      <Bar dataKey="2023" fill="#3B82F6" name="2023">
                        <LabelList dataKey="2023" position="top" formatter={(value) => `₹${value / 1000}k`} />
                      </Bar>
                      <Bar dataKey="2026" fill="#93C5FD" name="2026 Forecast">
                        <LabelList dataKey="2026" position="top" formatter={(value) => `₹${value / 1000}k`} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Insights */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              <h2 className="text-lg text-gray-800 font-medium">Strategic Insights & Veteran Commentary</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="border-l-3 border-blue-500 pl-4 py-3 bg-gradient-to-r from-blue-50 to-white rounded-r-md shadow-sm">
                  <h3 className="text-sm text-gray-700 mb-2 font-medium">Grocery: The Foundation of Quick Commerce</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Despite lower growth, its sheer scale (₹30,000 Cr) ensures it remains the bedrock—focus on margin
                    optimization (private brand vs. marketplace) is critical.
                  </p>
                </div>
                <div className="border-l-3 border-blue-500 pl-4 py-3 bg-gradient-to-r from-blue-50 to-white rounded-r-md shadow-sm">
                  <h3 className="text-sm text-gray-700 mb-2 font-medium">Ready-to-Eat: Convenience at a Premium</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    27% CAGR highlights rising consumer willingness to pay for prepared foods—opportunity to partner
                    with cloud kitchens and optimize last-mile costs.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-3 border-blue-500 pl-4 py-3 bg-gradient-to-r from-blue-50 to-white rounded-r-md shadow-sm">
                  <h3 className="text-sm text-gray-700 mb-2 font-medium">Pharmacy: White-Space Opportunity</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A 45% CAGR signals aggressive growth; however, regulatory hurdles (prescription requirements),
                    cold-chain logistics, and margin pressure need close monitoring.
                  </p>
                </div>
                <div className="border-l-3 border-blue-500 pl-4 py-3 bg-gradient-to-r from-blue-50 to-white rounded-r-md shadow-sm">
                  <h3 className="text-sm text-gray-700 mb-2 font-medium">Inflection Points & Risks</h3>
                  <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                    <li>
                      <span className="text-gray-700 font-medium">Unit Economics Breakeven:</span> Companies must manage
                      hyperlocal fulfilment costs to reach sustainable profitability.
                    </li>
                    <li>
                      <span className="text-gray-700 font-medium">Regulatory Environment:</span> Changes in food safety
                      and online pharmacy regulations could reshape cost structures overnight.
                    </li>
                    <li>
                      <span className="text-gray-700 font-medium">Customer Retention:</span> High acquisition costs
                      necessitate loyalty programs and differentiated service tiers.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps & Recommendations */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              <h2 className="text-lg text-gray-800 font-medium">Next Steps & Recommendations</h2>
            </div>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-3 font-medium shrink-0">
                  1
                </div>
                <div>
                  <span className="text-gray-800 font-medium">Micro-segment Analysis:</span> Deep-dive into urban vs.
                  tier-2/3 geographies—tier-2 adoption is nascent but could double TAM by 2026.
                </div>
              </li>
              <li className="flex bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-3 font-medium shrink-0">
                  2
                </div>
                <div>
                  <span className="text-gray-800 font-medium">Scenario Analysis:</span> Model impact of 10% variation in
                  delivery costs on EBITDA margins for each segment.
                </div>
              </li>
              <li className="flex bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-3 font-medium shrink-0">
                  3
                </div>
                <div>
                  <span className="text-gray-800 font-medium">Monitoring Triggers:</span>
                  <ul className="ml-0 mt-2 space-y-2 pl-0">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                      Regulatory updates from FSSAI and local health authorities for pharmacy delivery.
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                      Consolidation events (M&A among major players) that could shift competitive dynamics.
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* CAGR Comparison */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              <h2 className="text-lg text-gray-800 font-medium">CAGR Comparison by Segment</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm text-gray-700 font-medium">Growth Rate Analysis (2023-2026)</h3>
              </div>
              <div className="p-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={cagrData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 50,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={true} vertical={false} />
                    <XAxis
                      type="number"
                      domain={[0, 50]}
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: "#CBD5E1" }}
                    />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} axisLine={{ stroke: "#CBD5E1" }} />
                    <Bar dataKey="value" name="CAGR (2023-26)">
                      {cagrData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="right"
                        formatter={(value) => `${value}%`}
                        style={{ fontSize: "12px", fontWeight: 500 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Key Players */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-5 bg-blue-500 rounded mr-2"></div>
              <h2 className="text-lg text-gray-800 font-medium">Key Players Analysis</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-white px-4 py-3 border-b border-gray-200 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 mr-3 rounded"></div>
                  <h3 className="text-sm font-medium text-gray-800">Grocery Segment</h3>
                </div>
                <ul className="text-sm text-gray-600 p-4 space-y-2">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Blinkit</span> (Zomato)
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Zepto</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">BigBasket</span> (Tata)
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Swiggy Instamart</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">JioMart</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-white px-4 py-3 border-b border-gray-200 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 mr-3 rounded"></div>
                  <h3 className="text-sm font-medium text-gray-800">Ready-to-Eat Segment</h3>
                </div>
                <ul className="text-sm text-gray-600 p-4 space-y-2">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Swiggy</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Zomato</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">EatSure</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Rebel Foods</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">FreshMenu</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-white px-4 py-3 border-b border-gray-200 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 mr-3 rounded"></div>
                  <h3 className="text-sm font-medium text-gray-800">Pharmacy Segment</h3>
                </div>
                <ul className="text-sm text-gray-600 p-4 space-y-2">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">PharmEasy</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Tata 1mg</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Netmeds</span> (Reliance)
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">MedPlus</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">Apollo Pharmacy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-10">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">© 2023 Market Research Group. All Rights Reserved.</div>
              <div className="text-xs text-gray-500 border border-gray-200 px-4 py-2 rounded-full bg-white">
                Quick Commerce Industry Report | Confidential
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add workflow buttons at the bottom */}
      <div className="mt-6 flex flex-wrap gap-2 justify-end">
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6] px-4 py-1.5 h-auto"
          onClick={onRestart}
        >
          <RefreshCw className="h-4 w-4" />
          Restart Workflow
        </Button>
        <Button size="sm" className="gap-2 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  )
}
