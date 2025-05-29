"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Download, RefreshCw, Calendar, FileIcon, Tag, BarChart2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SummaryResultProps {
  documentNames: string[]
  sections: Array<{
    id: string
    title: string
    selected?: boolean
    tags?: string[]
    description?: string
  }>
  tablesAndCharts: Array<{
    id: string
    type: string
    title: string
    selected?: boolean
    description?: string
    category?: string
  }>
  summaryDepth: "light" | "medium" | "deep"
  summaryOptions: {
    includeKeyQuotes?: boolean
    includeVisualElements?: boolean
  }
  onRestart: () => void
}

export function SummaryResult({
  documentNames,
  sections,
  tablesAndCharts,
  summaryDepth,
  summaryOptions,
  onRestart,
}: SummaryResultProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  // Format the current date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Simulate download
  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
    }, 2000)
  }

  // Generate sample content for each section based on tags
  const generateSectionContent = (section: (typeof sections)[0], depth: "light" | "medium" | "deep") => {
    const tags = section.tags || []
    const tagText = tags.join(", ")

    if (depth === "light") {
      return (
        <p className="text-[#4e5971] mb-4">
          This section focuses on {tagText}. Key insights are highlighted with minimal detail.
        </p>
      )
    } else if (depth === "medium") {
      return (
        <>
          <p className="text-[#4e5971] mb-4">
            This section provides a balanced overview of {tagText}, with moderate detail on core concepts.
          </p>
          <p className="text-[#4e5971] mb-4">
            The analysis covers the main aspects while maintaining a concise presentation of information.
          </p>
        </>
      )
    } else {
      return (
        <>
          <p className="text-[#4e5971] mb-4">
            This section delivers an in-depth analysis of {tagText}, with comprehensive coverage of all relevant
            aspects.
          </p>
          <p className="text-[#4e5971] mb-4">
            Detailed examination of each component provides thorough understanding with supporting evidence and context.
          </p>
          <p className="text-[#4e5971] mb-4">
            Extended discussion includes nuanced perspectives and implications for strategic decision-making.
          </p>
        </>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* PDF-like document */}
      <Card className="border border-[#e1e8f6] shadow-sm">
        {/* Cover Page */}
        <div className="p-8 border-b border-[#e1e8f6] bg-white">
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 rounded-full bg-[#f4f9ff] flex items-center justify-center">
              <FileText className="h-8 w-8 text-[#004ce6]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-[#001742] mb-4">Personalized Document Summary</h1>
          <p className="text-center text-[#6e7b96] mb-8">Generated on {formattedDate}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Card className="border-[#e1e8f6] bg-[#f9fafc]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-[#001742] mb-2 flex items-center">
                  <FileIcon className="h-4 w-4 mr-2 text-[#004ce6]" />
                  Source Documents
                </h3>
                <ul className="text-sm text-[#4e5971] space-y-1">
                  {documentNames.map((doc, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#004ce6] mr-2"></span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#e1e8f6] bg-[#f9fafc]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-[#001742] mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-[#004ce6]" />
                  Summary Details
                </h3>
                <ul className="text-sm text-[#4e5971] space-y-1">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004ce6] mr-2"></span>
                    Depth: {summaryDepth === "light" ? "Light" : summaryDepth === "medium" ? "Medium" : "Deep"}
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004ce6] mr-2"></span>
                    Sections: {sections.length}
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#004ce6] mr-2"></span>
                    Visuals: {tablesAndCharts.length}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="p-8 border-b border-[#e1e8f6] bg-white">
          <h2 className="text-xl font-bold text-[#001742] mb-6">Table of Contents</h2>
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-center">
                <span className="font-medium text-[#001742]">{index + 1}.</span>
                <span className="ml-2 text-[#4e5971]">{section.title}</span>
                <div className="flex-1 mx-2 border-b border-dotted border-[#dee6f5]"></div>
                <span className="text-[#6e7b96]">Page {index + 2}</span>
              </div>
            ))}
            {tablesAndCharts.length > 0 && (
              <div className="flex items-center">
                <span className="font-medium text-[#001742]">{sections.length + 1}.</span>
                <span className="ml-2 text-[#4e5971]">Appendix: Tables & Charts</span>
                <div className="flex-1 mx-2 border-b border-dotted border-[#dee6f5]"></div>
                <span className="text-[#6e7b96]">Page {sections.length + 2}</span>
              </div>
            )}
          </div>
        </div>

        {/* Document Content */}
        <div className="bg-white">
          {sections.map((section, index) => (
            <div key={section.id} className="p-8 border-b border-[#e1e8f6]">
              <div className="text-right text-xs text-[#8098c4] mb-2">Page {index + 2}</div>
              <h2 className="text-xl font-bold text-[#001742] mb-4">
                {index + 1}. {section.title}
              </h2>

              {/* Tags */}
              {section.tags && section.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {section.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-[#EAF0FC] text-[#004ce6] rounded-md text-xs"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}

              {/* Content based on depth */}
              {generateSectionContent(section, summaryDepth)}
            </div>
          ))}

          {/* Appendix: Tables & Charts */}
          {tablesAndCharts.length > 0 && (
            <div className="p-8">
              <div className="text-right text-xs text-[#8098c4] mb-2">Page {sections.length + 2}</div>
              <h2 className="text-xl font-bold text-[#001742] mb-6">
                {sections.length + 1}. Appendix: Tables & Charts
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tablesAndCharts.map((item, index) => (
                  <Card key={item.id} className="border-[#e1e8f6]">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-[#001742]">
                          Figure {index + 1}: {item.title}
                        </h3>
                        {item.type === "chart" ? (
                          <BarChart2 className="h-5 w-5 text-[#004ce6]" />
                        ) : (
                          <FileText className="h-5 w-5 text-[#004ce6]" />
                        )}
                      </div>
                      <div className="aspect-video bg-[#f4f9ff] rounded-md flex items-center justify-center">
                        <p className="text-[#6e7b96] text-sm">
                          {item.type === "chart" ? "Chart Visualization" : "Table Data"}
                        </p>
                      </div>
                      {item.description && <p className="text-xs text-[#6e7b96] mt-3">{item.description}</p>}
                      {item.category && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs bg-[#f9fafc]">
                            {item.category}
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-[#e1e8f6] bg-[#f9fafc] text-xs text-[#6e7b96] flex justify-between">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Generated on {formattedDate}
            </div>
            <div>
              Personalized summary from {documentNames.length} document{documentNames.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button
          variant="outline"
          onClick={onRestart}
          className="border-[#e1e8f6] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6]"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Start New Summary
        </Button>
        <Button onClick={handleDownload} className="bg-[#004ce6] hover:bg-[#0047cb] text-white">
          <Download className="h-4 w-4 mr-2" />
          {isDownloading ? "Downloading..." : "Download PDF"}
        </Button>
      </div>
    </div>
  )
}
