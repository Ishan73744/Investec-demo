"use client"

import { Download, RefreshCw, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChartDataset {
  name: string
  data: number[]
  color: string
}

interface ChartData {
  type: string
  title: string
  labels: string[]
  datasets: ChartDataset[]
}

interface ChartConversionResultProps {
  chartData: ChartData
  chartType: string
  chartOptions: {
    includeDataTable: boolean
    applyColorScheme: string
    addTrendlines: boolean
  }
  screenshotName: string
  onRestart: () => void
}

export function ChartConversionResult({
  chartData,
  chartType,
  chartOptions,
  screenshotName,
  onRestart,
}: ChartConversionResultProps) {
  const handleDownload = () => {
    // In a real application, this would trigger the download of the Excel file
    alert("Downloading Excel chart...")
  }

  // Function to render a preview of the chart
  const renderChartPreview = () => {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-[#e1e8f6] bg-white p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/excel-bar-chart-data-table.png"
            alt="Excel Chart Preview"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="border-[#e1e8f6]">
        <CardContent className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#001742]">Converted Excel Chart</h3>
            <p className="text-[#4e5971]">
              Successfully converted <span className="font-medium">{screenshotName}</span> to an editable Excel chart.
            </p>

            <Tabs defaultValue="preview" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 bg-[#f4f7ff]">
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#001742]"
                >
                  Chart Preview
                </TabsTrigger>
                <TabsTrigger value="data" className="data-[state=active]:bg-white data-[state=active]:text-[#001742]">
                  Data Table
                </TabsTrigger>
              </TabsList>

              {/* Chart Preview Tab */}
              <TabsContent value="preview" className="pt-4">
                {renderChartPreview()}
              </TabsContent>

              {/* Data Table Tab */}
              <TabsContent value="data" className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] border-collapse rounded-md border border-[#e1e8f6]">
                    <thead>
                      <tr className="bg-[#f4f7ff]">
                        <th className="border-b border-[#e1e8f6] p-3 text-left text-sm font-medium text-[#001742]">
                          Period
                        </th>
                        {chartData.datasets.map((dataset) => (
                          <th
                            key={dataset.name}
                            className="border-b border-[#e1e8f6] p-3 text-right text-sm font-medium text-[#001742]"
                          >
                            {dataset.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {chartData.labels.map((label, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafc]"}>
                          <td className="border-b border-[#e1e8f6] p-3 text-sm text-[#001742]">{label}</td>
                          {chartData.datasets.map((dataset) => (
                            <td
                              key={`${dataset.name}-${i}`}
                              className="border-b border-[#e1e8f6] p-3 text-right text-sm text-[#001742]"
                            >
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(dataset.data[i])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-2">
              <h4 className="font-medium text-[#001742]">Applied Enhancements:</h4>
              <ul className="space-y-1 text-sm text-[#4e5971]">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Fully editable chart with source data</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>
                    {chartOptions.applyColorScheme === "default"
                      ? "Original color scheme preserved"
                      : `Applied ${chartOptions.applyColorScheme} color scheme`}
                  </span>
                </li>
                {chartOptions.includeDataTable && (
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                    <span>Included data table with the chart</span>
                  </li>
                )}
                {chartOptions.addTrendlines && (
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                    <span>Added trendlines to visualize data patterns</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Optimized for printing and presentation</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          size="sm"
          className="gap-2 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download Excel File
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6] px-4 py-1.5 h-auto"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Open in Excel Online
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6] px-4 py-1.5 h-auto"
          onClick={onRestart}
        >
          <RefreshCw className="h-4 w-4" />
          Convert Another Chart
        </Button>
      </div>
    </div>
  )
}
