"use client"

import { useState } from "react"
import { Download, FileSpreadsheet, RotateCcw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/workflow/chart-component"
import { useFileDownload } from "@/hooks/use-file-download"

interface ChartConversionResultProps {
  chartData: any
  chartType: string
  chartOptions: {
    includeDataTable: boolean
    applyColorScheme: string
    addTrendlines: boolean
  }
  screenshotName: string
  excelFileUrl?: string
  extractedData?: any
  processingTime?: string
  onRestart: () => void
}

export function ChartConversionResult({
  chartData,
  chartType,
  chartOptions,
  screenshotName,
  excelFileUrl,
  extractedData,
  processingTime,
  onRestart,
}: ChartConversionResultProps) {
  const { downloadFile, isDownloading } = useFileDownload()
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const handleDownload = async () => {
    if (!excelFileUrl) {
      setDownloadError("Excel file URL not available")
      return
    }

    try {
      setDownloadError(null)
      const filename = `converted_chart_${Date.now()}.xlsx`
      await downloadFile(excelFileUrl, filename)
    } catch (error) {
      setDownloadError("Download failed. Please try again.")
      console.error("Download error:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Conversion Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#001742]">
            <FileSpreadsheet className="h-5 w-5" />
            Conversion Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[#8098c4]">Original File:</span>
              <p className="font-medium text-[#001742]">{screenshotName}</p>
            </div>
            <div>
              <span className="text-[#8098c4]">Chart Type:</span>
              <p className="font-medium text-[#001742] capitalize">{chartType}</p>
            </div>
            {processingTime && (
              <div>
                <span className="text-[#8098c4]">Processing Time:</span>
                <p className="font-medium text-[#001742]">{processingTime}</p>
              </div>
            )}
            <div>
              <span className="text-[#8098c4]">Data Points:</span>
              <p className="font-medium text-[#001742]">
                {extractedData?.dataPoints ||
                  chartData.datasets.reduce((acc: number, dataset: any) => acc + dataset.data.length, 0)}{" "}
                extracted
              </p>
            </div>
          </div>

          {/* Download Section */}
          <div className="pt-4 border-t border-[#dee6f5]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[#001742]">Excel File Ready</h4>
                <p className="text-sm text-[#8098c4]">Your chart has been converted to an editable Excel file</p>
              </div>
              <div className="flex gap-2">
                {excelFileUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(excelFileUrl, "_blank")}
                    className="text-[#004ce6] border-[#004ce6] hover:bg-[#f4f9ff]"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                )}
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading || !excelFileUrl}
                  className="bg-[#004ce6] hover:bg-[#0039b8] text-white"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Excel
                    </>
                  )}
                </Button>
              </div>
            </div>

            {downloadError && <p className="text-sm text-red-600 mt-2">{downloadError}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Chart Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001742]">Chart Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart data={chartData.datasets} type={chartType} title={chartData.title} />
        </CardContent>
      </Card>

      {/* Applied Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001742]">Applied Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${chartOptions.includeDataTable ? "bg-green-500" : "bg-gray-300"}`}
              />
              <span className="text-[#001742]">Data Table Included</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${chartOptions.applyColorScheme !== "default" ? "bg-green-500" : "bg-gray-300"}`}
              />
              <span className="text-[#001742]">Custom Color Scheme</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${chartOptions.addTrendlines ? "bg-green-500" : "bg-gray-300"}`} />
              <span className="text-[#001742]">Trendlines Added</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={onRestart} className="text-[#004ce6] border-[#004ce6] hover:bg-[#f4f9ff]">
          <RotateCcw className="h-4 w-4 mr-2" />
          Convert Another Chart
        </Button>
      </div>
    </div>
  )
}
