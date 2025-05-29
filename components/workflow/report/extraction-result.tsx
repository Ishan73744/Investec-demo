"use client"

import { Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface FinancialStatement {
  title: string
  data: Array<Record<string, string | number>>
}

interface FinancialStatements {
  incomeStatement: FinancialStatement
  balanceSheet: FinancialStatement
  cashFlow: FinancialStatement
}

interface ExtractionResultProps {
  financialStatements: FinancialStatements
  extractionOption: "single" | "separate"
  documentName: string
  onRestart: () => void
}

export function ExtractionResult({
  financialStatements,
  extractionOption,
  documentName,
  onRestart,
}: ExtractionResultProps) {
  const [currency, setCurrency] = useState("USD")
  const [denomination, setDenomination] = useState("1")
  const [decimal, setDecimal] = useState("0")

  const formatNumber = (value: number) => {
    // Apply denomination
    const denominatedValue = value / Number(denomination)

    // Format with currency and decimals
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: Number(decimal),
      maximumFractionDigits: Number(decimal),
    }).format(denominatedValue)
  }

  const handleDownload = (statementType?: string) => {
    // In a real application, this would trigger the download of the Excel file
    if (statementType) {
      alert(`Downloading ${statementType} as Excel file...`)
    } else {
      alert("Downloading all financial statements as Excel file...")
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-[#e1e8f6]">
        <CardContent className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#001742]">Extracted Financial Statements</h3>
            <p className="text-[#4e5971]">
              Successfully extracted {Object.keys(financialStatements).length} financial statements from{" "}
              <span className="font-medium">{documentName}</span>.
            </p>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#6e7b96]">Currency</label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-[120px] h-8 text-sm">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#6e7b96]">Denomination</label>
                <Select value={denomination} onValueChange={setDenomination}>
                  <SelectTrigger className="w-[120px] h-8 text-sm">
                    <SelectValue placeholder="Denomination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Actual</SelectItem>
                    <SelectItem value="1000">Thousands</SelectItem>
                    <SelectItem value="1000000">Millions</SelectItem>
                    <SelectItem value="1000000000">Billions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#6e7b96]">Decimal Places</label>
                <Select value={decimal} onValueChange={setDecimal}>
                  <SelectTrigger className="w-[120px] h-8 text-sm">
                    <SelectValue placeholder="Decimals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="income" className="mt-6">
              <TabsList className="grid w-full grid-cols-3 bg-[#f4f7ff]">
                <TabsTrigger value="income" className="data-[state=active]:bg-white data-[state=active]:text-[#001742]">
                  Income Statement
                </TabsTrigger>
                <TabsTrigger
                  value="balance"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#001742]"
                >
                  Balance Sheet
                </TabsTrigger>
                <TabsTrigger
                  value="cashflow"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#001742]"
                >
                  Cash Flow
                </TabsTrigger>
              </TabsList>

              {/* Income Statement Tab */}
              <TabsContent value="income" className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] border-collapse rounded-md border border-[#e1e8f6]">
                    <thead>
                      <tr className="bg-[#f4f7ff]">
                        <th className="border-b border-[#e1e8f6] p-3 text-left text-sm font-medium text-[#001742]">
                          Item
                        </th>
                        {Object.keys(financialStatements.incomeStatement.data[0])
                          .filter((key) => key !== "item")
                          .map((year) => (
                            <th
                              key={year}
                              className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]"
                            >
                              {year}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {financialStatements.incomeStatement.data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#f9fafc]"}>
                          <td className="border-b border-[#e1e8f6] p-3 text-sm text-[#001742]">{row.item}</td>
                          {Object.keys(row)
                            .filter((key) => key !== "item")
                            .map((year) => (
                              <td
                                key={year}
                                className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]"
                              >
                                {typeof row[year] === "number" ? formatNumber(row[year] as number) : row[year]}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {extractionOption === "separate" && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      size="sm"
                      className="gap-2 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto"
                      onClick={() => handleDownload("Income Statement")}
                    >
                      <Download className="h-4 w-4" />
                      Download Income Statement
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Balance Sheet Tab */}
              <TabsContent value="balance" className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] border-collapse rounded-md border border-[#e1e8f6]">
                    <thead>
                      <tr className="bg-[#f4f7ff]">
                        <th className="border-b border-[#e1e8f6] p-3 text-left text-sm font-medium text-[#001742]">
                          Item
                        </th>
                        {Object.keys(financialStatements.balanceSheet.data[0])
                          .filter((key) => key !== "item")
                          .map((year) => (
                            <th
                              key={year}
                              className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]"
                            >
                              {year}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {financialStatements.balanceSheet.data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#f9fafc]"}>
                          <td className="border-b border-[#e1e8f6] p-3 text-sm text-[#001742]">{row.item}</td>
                          {Object.keys(row)
                            .filter((key) => key !== "item")
                            .map((year) => (
                              <td
                                key={year}
                                className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]"
                              >
                                {typeof row[year] === "number" ? formatNumber(row[year] as number) : row[year]}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {extractionOption === "separate" && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      size="sm"
                      className="gap-2 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto"
                      onClick={() => handleDownload("Balance Sheet")}
                    >
                      <Download className="h-4 w-4" />
                      Download Balance Sheet
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Cash Flow Tab */}
              <TabsContent value="cashflow" className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] border-collapse rounded-md border border-[#e1e8f6]">
                    <thead>
                      <tr className="bg-[#f4f7ff]">
                        <th className="border-b border-[#e1e8f6] p-3 text-left text-sm font-medium text-[#001742]">
                          Item
                        </th>
                        {Object.keys(financialStatements.cashFlow.data[0])
                          .filter((key) => key !== "item")
                          .map((year) => (
                            <th
                              key={year}
                              className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]"
                            >
                              {year}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {financialStatements.cashFlow.data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#f9fafc]"}>
                          <td className="border-b border-[#e1e8f6] p-3 text-sm text-[#001742]">{row.item}</td>
                          {Object.keys(row)
                            .filter((key) => key !== "item")
                            .map((year) => (
                              <td
                                key={year}
                                className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]"
                              >
                                {typeof row[year] === "number" ? formatNumber(row[year] as number) : row[year]}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {extractionOption === "separate" && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      size="sm"
                      className="gap-2 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto"
                      onClick={() => handleDownload("Cash Flow Statement")}
                    >
                      <Download className="h-4 w-4" />
                      Download Cash Flow Statement
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="text-xs text-[#6e7b96] mt-2">
              {denomination !== "1" && (
                <p>
                  Note: Values shown in{" "}
                  {denomination === "1000" ? "thousands" : denomination === "1000000" ? "millions" : "billions"} of{" "}
                  {currency}
                </p>
              )}
            </div>

            <div className="mt-6 space-y-2">
              <h4 className="font-medium text-[#001742]">Applied Formulas & Enhancements:</h4>
              <ul className="space-y-1 text-sm text-[#4e5971]">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Automatic calculation of totals and subtotals</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Year-over-year growth percentages</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Common size analysis (percentage of revenue/total assets)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Key financial ratios (profitability, liquidity, solvency)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Conditional formatting for significant changes</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-wrap gap-2">
        {extractionOption === "single" && (
          <Button
            size="sm"
            className="gap-2 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto"
            onClick={() => handleDownload()}
          >
            <Download className="h-4 w-4" />
            Download Excel File
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6] px-4 py-1.5 h-auto"
          onClick={onRestart}
        >
          <RefreshCw className="h-4 w-4" />
          Process Another Document
        </Button>
      </div>
    </div>
  )
}
