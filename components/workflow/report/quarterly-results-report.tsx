"use client"

import { useState } from "react"
import { FileSpreadsheet, FileIcon as FilePdf, Printer, BarChart3, PieChart, ArrowLeft, Download } from "lucide-react"

interface QuarterlyResultsReportProps {
  companies: string[]
  metrics: string[]
  onRestart?: () => void
}

export function QuarterlyResultsReport({ companies, metrics, onRestart }: QuarterlyResultsReportProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Use actual data instead of random generation
  const quarterlyData = {
    Lodha: {
      Quarter: "Q1 FY26",
      "Units Sold": 1200,
      "Collections (₹ Cr)": 850,
      "Net Debt (₹ Cr)": 1500,
      "EBITDA (₹ Cr)": 400,
      "Net Debt/EBITDA": "3.75×",
      Commentary:
        "Collections remained robust at ₹850 Cr, driven by strong bookings in suburban projects. Management targets 10% volume growth next quarter.",
    },
    Prestige: {
      Quarter: "Q1 FY26",
      "Units Sold": 950,
      "Collections (₹ Cr)": 720,
      "Net Debt (₹ Cr)": 1250,
      "EBITDA (₹ Cr)": 350,
      "Net Debt/EBITDA": "3.57×",
      Commentary:
        "Unit sales dipped slightly due to festival-season pause; expect rebound in Q2 backed by new launches.",
    },
    DLF: {
      Quarter: "Q1 FY26",
      "Units Sold": 1100,
      "Collections (₹ Cr)": 910,
      "Net Debt (₹ Cr)": 1800,
      "EBITDA (₹ Cr)": 450,
      "Net Debt/EBITDA": "4.00×",
      Commentary: "EBITDA improved 8% QoQ; however, leverage rose to 4.0× as net debt increased for land acquisitions.",
    },
    "Godrej Properties": {
      Quarter: "Q1 FY26",
      "Units Sold": 1050,
      "Collections (₹ Cr)": 780,
      "Net Debt (₹ Cr)": 1100,
      "EBITDA (₹ Cr)": 320,
      "Net Debt/EBITDA": "3.44×",
      Commentary:
        "Strong performance in NCR and Bengaluru markets. Launched 3 new projects with excellent initial response.",
    },
    "Oberoi Realty": {
      Quarter: "Q1 FY26",
      "Units Sold": 650,
      "Collections (₹ Cr)": 620,
      "Net Debt (₹ Cr)": 900,
      "EBITDA (₹ Cr)": 280,
      "Net Debt/EBITDA": "3.21×",
      Commentary: "Premium segment continues to show resilience. Mulund and Goregaon projects driving sales momentum.",
    },
  }

  // Filter data based on selected companies
  const filteredData = Object.entries(quarterlyData)
    .filter(([company]) => companies.includes(company) || companies.length === 0)
    .reduce(
      (acc, [company, data]) => {
        acc[company] = data
        return acc
      },
      {} as Record<string, any>,
    )

  // Calculate industry averages
  const calculateIndustryAverages = () => {
    const companies = Object.values(filteredData)
    const metrics = ["Units Sold", "Collections (₹ Cr)", "Net Debt (₹ Cr)", "EBITDA (₹ Cr)"]

    return metrics.reduce(
      (acc, metric) => {
        const sum = companies.reduce((total, company) => total + company[metric], 0)
        acc[metric] = Math.round(sum / companies.length)
        return acc
      },
      {} as Record<string, number>,
    )
  }

  const industryAverages = calculateIndustryAverages()

  // Get company colors for charts
  const getCompanyColor = (company: string, index: number) => {
    const colors = [
      "rgba(0, 76, 230, 0.9)",
      "rgba(0, 76, 230, 0.75)",
      "rgba(0, 76, 230, 0.6)",
      "rgba(0, 76, 230, 0.45)",
      "rgba(0, 76, 230, 0.3)",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#e5e9f0] overflow-hidden">
      {/* Report Header */}
      <div className="p-6 border-b border-[#e5e9f0] bg-gradient-to-r from-[#f8faff] to-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#001742]">Quarterly Results Analysis</h2>
            <p className="text-[#6e7b96] mt-1">Q1 FY26 Results for {Object.keys(filteredData).join(", ")}</p>
          </div>
          <div className="flex gap-2">
            {onRestart && (
              <button
                onClick={onRestart}
                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-[#dee6f5] hover:bg-[#f4f9ff] transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-[#6e7b96]" />
                <span>New Analysis</span>
              </button>
            )}
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-[#dee6f5] hover:bg-[#f4f9ff] transition-colors">
              <Printer className="h-4 w-4 text-[#6e7b96]" />
              <span>Print</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-[#dee6f5] hover:bg-[#f4f9ff] transition-colors">
              <FilePdf className="h-4 w-4 text-[#6e7b96]" />
              <span>PDF</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#004ce6] text-white rounded-md hover:bg-[#003bb2] transition-colors">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="border-b border-[#e5e9f0]">
        <div className="flex px-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === "overview"
                ? "border-[#004ce6] text-[#004ce6]"
                : "border-transparent text-[#6e7b96] hover:text-[#4e5971]"
            } transition-colors`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === "metrics"
                ? "border-[#004ce6] text-[#004ce6]"
                : "border-transparent text-[#6e7b96] hover:text-[#4e5971]"
            } transition-colors`}
          >
            Detailed Metrics
          </button>
          <button
            onClick={() => setActiveTab("commentary")}
            className={`px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === "commentary"
                ? "border-[#004ce6] text-[#004ce6]"
                : "border-transparent text-[#6e7b96] hover:text-[#4e5971]"
            } transition-colors`}
          >
            Management Commentary
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Executive Summary */}
            <div className="bg-[#f8faff] p-4 rounded-lg border border-[#e5e9f0]">
              <h3 className="text-lg font-semibold text-[#001742] mb-2">Executive Summary</h3>
              <p className="text-sm text-[#4e5971]">
                This report analyzes Q1 FY26 results for {Object.keys(filteredData).length} real estate companies.
                Industry average for units sold was {industryAverages["Units Sold"].toLocaleString()}, with collections
                averaging ₹{industryAverages["Collections (₹ Cr)"].toLocaleString()} Cr. Net debt to EBITDA ratios range
                from 3.21× to 4.00×, with most companies maintaining healthy leverage levels.
              </p>
            </div>

            {/* Metrics Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-[#001742]">Quarterly Performance Metrics</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6e7b96]">View as:</span>
                  <button className="p-1 rounded bg-[#f0f4fa] text-[#004ce6]">
                    <BarChart3 className="h-4 w-4" />
                  </button>
                  <button className="p-1 rounded hover:bg-[#f0f4fa] text-[#6e7b96]">
                    <PieChart className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#4e5971] bg-[#f0f4fa] border-y border-[#e5e9f0]">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#4e5971] bg-[#f0f4fa] border-y border-[#e5e9f0]">
                        Quarter
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#4e5971] bg-[#f0f4fa] border-y border-[#e5e9f0]">
                        Units Sold
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#4e5971] bg-[#f0f4fa] border-y border-[#e5e9f0]">
                        Collections (₹ Cr)
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#4e5971] bg-[#f0f4fa] border-y border-[#e5e9f0]">
                        Net Debt (₹ Cr)
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#4e5971] bg-[#f0f4fa] border-y border-[#e5e9f0]">
                        EBITDA (₹ Cr)
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#4e5971] bg-[#f0f4fa] border-y border-[#e5e9f0]">
                        Net Debt/EBITDA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(filteredData).map(([company, data], index) => (
                      <tr
                        key={company}
                        className={`hover:bg-[#f8faff] transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-[#fafbfd]"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-[#001742] border-b border-[#e5e9f0]">
                          {company}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#4e5971] border-b border-[#e5e9f0]">{data.Quarter}</td>
                        <td className="px-4 py-3 text-sm text-right text-[#4e5971] border-b border-[#e5e9f0]">
                          {data["Units Sold"].toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-[#4e5971] border-b border-[#e5e9f0]">
                          {data["Collections (₹ Cr)"].toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-[#4e5971] border-b border-[#e5e9f0]">
                          {data["Net Debt (₹ Cr)"].toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-[#4e5971] border-b border-[#e5e9f0]">
                          {data["EBITDA (₹ Cr)"].toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-[#4e5971] border-b border-[#e5e9f0]">
                          {data["Net Debt/EBITDA"]}
                        </td>
                      </tr>
                    ))}
                    {/* Industry Average Row */}
                    <tr className="bg-[#f0f4fa]">
                      <td className="px-4 py-3 text-sm font-medium text-[#001742] border-b border-[#e5e9f0]">
                        Industry Average
                      </td>
                      <td className="px-4 py-3 text-sm text-[#4e5971] border-b border-[#e5e9f0]">Q1 FY26</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-[#001742] border-b border-[#e5e9f0]">
                        {industryAverages["Units Sold"].toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-[#001742] border-b border-[#e5e9f0]">
                        {industryAverages["Collections (₹ Cr)"].toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-[#001742] border-b border-[#e5e9f0]">
                        {industryAverages["Net Debt (₹ Cr)"].toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-[#001742] border-b border-[#e5e9f0]">
                        {industryAverages["EBITDA (₹ Cr)"].toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-[#001742] border-b border-[#e5e9f0]">
                        -
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visualization Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Units Sold Chart */}
              <div className="bg-white rounded-lg border border-[#e5e9f0] overflow-hidden">
                <div className="px-4 py-3 bg-[#f8faff] border-b border-[#e5e9f0]">
                  <h4 className="text-sm font-semibold text-[#001742]">Units Sold by Company</h4>
                </div>
                <div className="p-4">
                  <div className="h-64 flex items-center justify-center">
                    <div className="flex flex-col items-center w-full">
                      <div className="flex items-end h-40 w-full justify-around mb-4">
                        {Object.entries(filteredData).map(([company, data], index) => {
                          const maxUnits = Math.max(...Object.values(filteredData).map((d) => d["Units Sold"]))
                          const height = (data["Units Sold"] / maxUnits) * 100
                          return (
                            <div key={company} className="flex flex-col items-center">
                              <div className="text-xs text-[#4e5971] mb-1">{data["Units Sold"].toLocaleString()}</div>
                              <div
                                className="w-16 rounded-t-md"
                                style={{
                                  height: `${height}%`,
                                  backgroundColor: getCompanyColor(company, index),
                                }}
                              ></div>
                              <div className="mt-2 text-xs font-medium text-[#4e5971] max-w-16 truncate">{company}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Debt/EBITDA Chart */}
              <div className="bg-white rounded-lg border border-[#e5e9f0] overflow-hidden">
                <div className="px-4 py-3 bg-[#f8faff] border-b border-[#e5e9f0]">
                  <h4 className="text-sm font-semibold text-[#001742]">Net Debt/EBITDA Ratio</h4>
                </div>
                <div className="p-4">
                  <div className="h-64 flex items-center justify-center">
                    <div className="flex flex-col items-center w-full">
                      <div className="flex items-end h-40 w-full justify-around mb-4">
                        {Object.entries(filteredData).map(([company, data], index) => {
                          const ratio = Number.parseFloat(data["Net Debt/EBITDA"].replace("×", ""))
                          const maxRatio = 5 // Setting max to 5x for visualization
                          const height = (ratio / maxRatio) * 100
                          return (
                            <div key={company} className="flex flex-col items-center">
                              <div className="text-xs text-[#4e5971] mb-1">{data["Net Debt/EBITDA"]}</div>
                              <div
                                className="w-16 rounded-t-md"
                                style={{
                                  height: `${height}%`,
                                  backgroundColor: getCompanyColor(company, index),
                                }}
                              ></div>
                              <div className="mt-2 text-xs font-medium text-[#4e5971] max-w-16 truncate">{company}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Commentary Snippets */}
            <div>
              <h3 className="text-lg font-semibold text-[#001742] mb-3">Key Management Commentary</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(filteredData).map(([company, data]) => (
                  <div
                    key={company}
                    className="p-4 bg-white border border-[#e5e9f0] rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <p className="text-sm">
                      <span className="font-semibold text-[#001742]">{company}:</span>{" "}
                      <span className="text-[#4e5971]">{data.Commentary}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "metrics" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-[#001742] mb-4">Detailed Metrics by Company</h3>
              {Object.entries(filteredData).map(([company, data]) => (
                <div key={company} className="mb-8 bg-white border border-[#e5e9f0] rounded-lg overflow-hidden">
                  <div className="px-5 py-4 bg-[#f8faff] border-b border-[#e5e9f0]">
                    <h4 className="text-md font-semibold text-[#001742]">{company}</h4>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-[#f9fafc] border border-[#e5e9f0] rounded-md">
                        <div className="text-sm text-[#6e7b96]">Units Sold</div>
                        <div className="text-xl font-medium text-[#001742] mt-1">
                          {data["Units Sold"].toLocaleString()}
                        </div>
                        <div className="text-xs text-[#6e7b96] mt-1">
                          {data["Units Sold"] > industryAverages["Units Sold"] ? (
                            <span className="text-green-600">
                              +{((data["Units Sold"] / industryAverages["Units Sold"] - 1) * 100).toFixed(1)}% vs. avg
                            </span>
                          ) : (
                            <span className="text-red-600">
                              {((data["Units Sold"] / industryAverages["Units Sold"] - 1) * 100).toFixed(1)}% vs. avg
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-4 bg-[#f9fafc] border border-[#e5e9f0] rounded-md">
                        <div className="text-sm text-[#6e7b96]">Collections</div>
                        <div className="text-xl font-medium text-[#001742] mt-1">
                          ₹{data["Collections (₹ Cr)"].toLocaleString()} Cr
                        </div>
                        <div className="text-xs text-[#6e7b96] mt-1">
                          {data["Collections (₹ Cr)"] > industryAverages["Collections (₹ Cr)"] ? (
                            <span className="text-green-600">
                              +
                              {(
                                (data["Collections (₹ Cr)"] / industryAverages["Collections (₹ Cr)"] - 1) *
                                100
                              ).toFixed(1)}
                              % vs. avg
                            </span>
                          ) : (
                            <span className="text-red-600">
                              {(
                                (data["Collections (₹ Cr)"] / industryAverages["Collections (₹ Cr)"] - 1) *
                                100
                              ).toFixed(1)}
                              % vs. avg
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-4 bg-[#f9fafc] border border-[#e5e9f0] rounded-md">
                        <div className="text-sm text-[#6e7b96]">Net Debt</div>
                        <div className="text-xl font-medium text-[#001742] mt-1">
                          ₹{data["Net Debt (₹ Cr)"].toLocaleString()} Cr
                        </div>
                        <div className="text-xs text-[#6e7b96] mt-1">
                          {data["Net Debt (₹ Cr)"] < industryAverages["Net Debt (₹ Cr)"] ? (
                            <span className="text-green-600">
                              -{((1 - data["Net Debt (₹ Cr)"] / industryAverages["Net Debt (₹ Cr)"]) * 100).toFixed(1)}%
                              vs. avg
                            </span>
                          ) : (
                            <span className="text-red-600">
                              +{((data["Net Debt (₹ Cr)"] / industryAverages["Net Debt (₹ Cr)"] - 1) * 100).toFixed(1)}%
                              vs. avg
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-4 bg-[#f9fafc] border border-[#e5e9f0] rounded-md">
                        <div className="text-sm text-[#6e7b96]">EBITDA</div>
                        <div className="text-xl font-medium text-[#001742] mt-1">
                          ₹{data["EBITDA (₹ Cr)"].toLocaleString()} Cr
                        </div>
                        <div className="text-xs text-[#6e7b96] mt-1">
                          {data["EBITDA (₹ Cr)"] > industryAverages["EBITDA (₹ Cr)"] ? (
                            <span className="text-green-600">
                              +{((data["EBITDA (₹ Cr)"] / industryAverages["EBITDA (₹ Cr)"] - 1) * 100).toFixed(1)}% vs.
                              avg
                            </span>
                          ) : (
                            <span className="text-red-600">
                              {((data["EBITDA (₹ Cr)"] / industryAverages["EBITDA (₹ Cr)"] - 1) * 100).toFixed(1)}% vs.
                              avg
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-4 bg-[#f9fafc] border border-[#e5e9f0] rounded-md">
                        <div className="text-sm text-[#6e7b96]">Net Debt/EBITDA</div>
                        <div className="text-xl font-medium text-[#001742] mt-1">{data["Net Debt/EBITDA"]}</div>
                        <div className="text-xs text-[#6e7b96] mt-1">Leverage Ratio</div>
                      </div>
                      <div className="p-4 bg-[#f9fafc] border border-[#e5e9f0] rounded-md">
                        <div className="text-sm text-[#6e7b96]">Collections per Unit</div>
                        <div className="text-xl font-medium text-[#001742] mt-1">
                          ₹
                          {((data["Collections (₹ Cr)"] * 10000000) / data["Units Sold"]).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </div>
                        <div className="text-xs text-[#6e7b96] mt-1">Average per unit</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "commentary" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#001742] mb-4">Management Commentary Analysis</h3>

              <div className="mb-6 bg-[#f8faff] p-4 rounded-lg border border-[#e5e9f0]">
                <h4 className="text-md font-medium text-[#001742] mb-2">Key Themes</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-[#4e5971]">
                  <li>Strong collections performance across most developers</li>
                  <li>New project launches driving sales momentum</li>
                  <li>Regional variations in performance (NCR, Bengaluru performing well)</li>
                  <li>Debt levels being managed despite land acquisitions</li>
                  <li>Premium segment showing resilience in current market</li>
                </ul>
              </div>

              {Object.entries(filteredData).map(([company, data]) => (
                <div key={company} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-md font-medium text-[#001742]">{company}</h4>
                  </div>
                  <div className="p-4 bg-white border border-[#e5e9f0] rounded-lg">
                    <p className="text-sm text-[#4e5971]">{data.Commentary}</p>

                    <div className="mt-3 pt-3 border-t border-[#e5e9f0]">
                      <h5 className="text-xs font-medium text-[#6e7b96] mb-1">Key Metrics Impact</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-0.5 text-xs bg-[#f0f4fa] text-[#4e5971] rounded-md">
                          Units Sold: {data["Units Sold"].toLocaleString()}
                        </span>
                        <span className="px-2 py-0.5 text-xs bg-[#f0f4fa] text-[#4e5971] rounded-md">
                          Collections: ₹{data["Collections (₹ Cr)"].toLocaleString()} Cr
                        </span>
                        <span className="px-2 py-0.5 text-xs bg-[#f0f4fa] text-[#4e5971] rounded-md">
                          Net Debt/EBITDA: {data["Net Debt/EBITDA"]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Footer */}
      <div className="p-6 border-t border-[#e5e9f0] bg-[#f8faff] flex justify-between items-center">
        <div className="text-sm text-[#6e7b96]">
          Generated on {new Date().toLocaleDateString()} • Quarterly Results Extractor
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-[#dee6f5] hover:bg-[#f4f9ff] transition-colors">
            <Download className="h-4 w-4 text-[#6e7b96]" />
            <span>Download Report</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#004ce6] text-white rounded-md hover:bg-[#003bb2] transition-colors">
            <FileSpreadsheet className="h-4 w-4" />
            <span>Download Excel</span>
          </button>
        </div>
      </div>
    </div>
  )
}
