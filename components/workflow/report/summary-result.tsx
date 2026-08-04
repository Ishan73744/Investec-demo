"use client"

import { Download, RefreshCw, FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SummaryResultProps {
  documentName: string
  sections: Array<{ id: string; title: string; selected?: boolean }>
  customSections: Array<{ id: string; title: string; description: string }>
  summaryOptions: {
    length: string
    tone: string
    includeKeyQuotes: boolean
    includeVisualElements: boolean
  }
  onRestart: () => void
}

export function SummaryResult({
  documentName,
  sections,
  customSections,
  summaryOptions,
  onRestart,
}: SummaryResultProps) {
  const handleDownload = () => {
    // In a real application, this would trigger the download of the PDF file
    alert("Downloading summary as PDF...")
  }

  // Generate sample summary content based on the selected options
  const generateSampleContent = (sectionTitle: string) => {
    const lengthMultiplier = summaryOptions.length === "short" ? 1 : summaryOptions.length === "medium" ? 2 : 3
    const paragraphCount = lengthMultiplier * 2

    const content = []

    for (let i = 0; i < paragraphCount; i++) {
      content.push(
        <p key={i} className="mb-3 text-[#4e5971]">
          {getSampleParagraph(sectionTitle, summaryOptions.tone, i)}
        </p>,
      )
    }

    if (summaryOptions.includeKeyQuotes && sectionTitle !== "Conclusion") {
      content.push(
        <blockquote key="quote" className="border-l-4 border-[#004ce6] pl-4 italic my-4 text-[#4e5971]">
          "{getRandomQuote(sectionTitle)}"
        </blockquote>,
      )
    }

    if (
      summaryOptions.includeVisualElements &&
      (sectionTitle === "Key Findings" ||
        sectionTitle === "Market Analysis" ||
        sectionTitle === "Financial Projections")
    ) {
      content.push(
        <div key="visual" className="my-4 p-4 bg-[#f4f9ff] rounded-md border border-[#dee6f5] text-center">
          <p className="text-sm text-[#6e7b96]">[Visual element: {getVisualElementType(sectionTitle)}]</p>
        </div>,
      )
    }

    return content
  }

  // Helper function to get a sample paragraph
  const getSampleParagraph = (sectionTitle: string, tone: string, index: number) => {
    const toneAdjective = tone === "professional" ? "clear" : tone === "casual" ? "straightforward" : "comprehensive"
    const toneAdverb = tone === "professional" ? "effectively" : tone === "casual" ? "simply" : "thoroughly"

    if (index === 0) {
      return `This ${toneAdjective} ${sectionTitle.toLowerCase()} provides a ${tone} overview of the key points discussed in the document. The analysis ${toneAdverb} demonstrates the main concepts and findings related to this section.`
    } else {
      return `Further examination reveals additional insights within this section. The document ${toneAdverb} explains how these findings contribute to the overall narrative and supports the main arguments with ${tone === "academic" ? "empirical evidence" : "relevant examples"}.`
    }
  }

  // Helper function to get a random quote
  const getRandomQuote = (sectionTitle: string) => {
    const quotes = [
      "The data clearly indicates a significant trend toward increased market adoption in the coming fiscal year.",
      "Our analysis suggests that implementing these recommendations could result in a 15-20% improvement in operational efficiency.",
      "As noted in the research, 'the correlation between these variables presents a compelling case for strategic realignment'.",
      "The competitive landscape has evolved substantially, requiring a more agile approach to product development.",
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  // Helper function to get visual element type
  const getVisualElementType = (sectionTitle: string) => {
    if (sectionTitle === "Key Findings") return "Comparison chart of main findings"
    if (sectionTitle === "Market Analysis") return "Market share pie chart"
    if (sectionTitle === "Financial Projections") return "Revenue forecast line graph"
    return "Relevant visualization"
  }

  return (
    <div className="space-y-4">
      <Card className="border-[#e1e8f6]">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#001742]">Document Summary</h3>
              <div className="text-xs text-[#6e7b96] bg-[#f4f9ff] px-2 py-1 rounded">
                {summaryOptions.length} • {summaryOptions.tone}
              </div>
            </div>

            <p className="text-[#4e5971]">
              Personalized summary of <span className="font-medium">{documentName}</span> with{" "}
              {sections.length + customSections.length} sections.
            </p>

            <Tabs defaultValue="preview" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 bg-[#f4f7ff]">
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#001742]"
                >
                  Summary Preview
                </TabsTrigger>
                <TabsTrigger
                  value="outline"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#001742]"
                >
                  Document Outline
                </TabsTrigger>
              </TabsList>

              {/* Summary Preview Tab */}
              <TabsContent value="preview" className="pt-4">
                <div className="border border-[#e1e8f6] rounded-md p-4 max-h-[500px] overflow-y-auto">
                  <div className="prose max-w-none">
                    <h1 className="text-xl font-bold text-[#001742] mb-4">Summary of {documentName}</h1>

                    {sections.map((section) => (
                      <div key={section.id} className="mb-6">
                        <h2 className="text-lg font-semibold text-[#001742] mb-2">{section.title}</h2>
                        {generateSampleContent(section.title)}
                      </div>
                    ))}

                    {customSections.map((section) => (
                      <div key={section.id} className="mb-6">
                        <h2 className="text-lg font-semibold text-[#001742] mb-2">{section.title}</h2>
                        <p className="mb-3 text-[#4e5971]">
                          {section.description || "Custom section content based on your specific requirements."}
                        </p>
                        {generateSampleContent(section.title)}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Document Outline Tab */}
              <TabsContent value="outline" className="pt-4">
                <div className="border border-[#e1e8f6] rounded-md p-4">
                  <h3 className="text-sm font-medium text-[#001742] mb-3">Document Structure</h3>
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id} className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#8098c4]" />
                        <span className="text-sm text-[#4e5971]">{section.title}</span>
                      </li>
                    ))}
                    {customSections.map((section) => (
                      <li key={section.id} className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#004ce6]" />
                        <span className="text-sm text-[#004ce6]">{section.title} (Custom)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-2">
              <h4 className="font-medium text-[#001742]">Summary Features:</h4>
              <ul className="space-y-1 text-sm text-[#4e5971]">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>
                    {summaryOptions.length === "short"
                      ? "Concise overview focusing on key points"
                      : summaryOptions.length === "medium"
                        ? "Balanced summary with moderate detail"
                        : "Comprehensive analysis with extensive detail"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>
                    {summaryOptions.tone === "professional"
                      ? "Professional tone suitable for business contexts"
                      : summaryOptions.tone === "casual"
                        ? "Casual tone that's conversational and accessible"
                        : "Academic tone with scholarly language and technical precision"}
                  </span>
                </li>
                {summaryOptions.includeKeyQuotes && (
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                    <span>Key quotes extracted from the original document</span>
                  </li>
                )}
                {summaryOptions.includeVisualElements && (
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                    <span>Visual elements included for enhanced comprehension</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  <span>Structured according to your selected sections</span>
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
          Download PDF Summary
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6] px-4 py-1.5 h-auto"
        >
          <ExternalLink className="h-4 w-4" />
          Open in PDF Viewer
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 border-[#dee6f5] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6] px-4 py-1.5 h-auto"
          onClick={onRestart}
        >
          <RefreshCw className="h-4 w-4" />
          Summarize Another Document
        </Button>
      </div>
    </div>
  )
}
