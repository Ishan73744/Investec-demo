"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"

interface RERAFilingsReportProps {
  data: {
    generatedDate: string
    triggerTypes: string[]
    entities: string[]
    filings: Array<{
      date: string
      entity: string
      type: string
      detail: string
      compliance: "on-time" | "delayed" | "breach"
      sourceLink: string
    }>
    detailedEntries: Array<{
      id: string
      entity: string
      type: string
      date: string
      title: string
      details: {
        filingDate?: string
        receivedDate?: string
        dueDate?: string
        section?: string
        compliance: "on-time" | "delayed" | "breach"
        project?: string
        originalHandoverDate?: string
        revisedHandoverDate?: string
        noticeIssued?: string
        reason?: string
        revisionType?: string
        filingType?: string
      }
      summary: string
      fullTextExcerpt: string
      sourcePDF: string
    }>
  }
  onRestart?: () => void
}

export function RERAFilingsReport({ data, onRestart }: RERAFilingsReportProps) {
  const pageRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = () => {
    alert("In a production environment, this would download a PDF of the RERA filings report.")
  }

  return (
    <div className="max-w-[210mm] mx-auto">
      <div
        ref={pageRef}
        className="w-[210mm] mx-auto bg-white p-6 border rounded-lg shadow-sm relative"
        style={{ fontFamily: "Inter, sans-serif", borderColor: "#EAF0FC" }}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-[#002673]">RERA Filings and Press Mentions</h1>
            <Button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1 bg-[#004ce6] hover:bg-[#0040c9] text-white h-8 px-3 py-1"
              size="sm"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Download PDF
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {data.entities.map((entity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0f7f7] text-[#2a5b5b]"
              >
                {entity}
              </span>
            ))}
          </div>
        </div>

        {/* Summary Table */}
        <div className="mb-6">
          <div className="overflow-x-auto rounded-md border border-[#EAF0FC]">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#f8fafd]">
                  <th className="px-4 py-3 border-b border-[#EAF0FC] text-left text-[10px] font-semibold text-[#4e5971] uppercase tracking-wider whitespace-nowrap w-[80px]">
                    Date
                  </th>
                  <th className="px-4 py-3 border-b border-[#EAF0FC] text-left text-[10px] font-semibold text-[#4e5971] uppercase tracking-wider whitespace-nowrap w-[80px]">
                    Entity
                  </th>
                  <th className="px-4 py-3 border-b border-[#EAF0FC] text-left text-[10px] font-semibold text-[#4e5971] uppercase tracking-wider whitespace-nowrap w-[80px]">
                    Type
                  </th>
                  <th className="px-4 py-3 border-b border-[#EAF0FC] text-left text-[10px] font-semibold text-[#4e5971] uppercase tracking-wider w-auto">
                    Trigger Detail
                  </th>
                  <th className="px-4 py-3 border-b border-[#EAF0FC] text-left text-[10px] font-semibold text-[#4e5971] uppercase tracking-wider whitespace-nowrap w-[80px]">
                    Status
                  </th>
                  <th className="px-4 py-3 border-b border-[#EAF0FC] text-left text-[10px] font-semibold text-[#4e5971] uppercase tracking-wider whitespace-nowrap w-[70px]">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAF0FC]">
                {data.filings.map((filing, index) => (
                  <tr key={index} className="hover:bg-[#f8fafd]">
                    <td className="px-4 py-3 text-xs text-[#4e5971] whitespace-nowrap">{filing.date}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#002673] whitespace-nowrap">{filing.entity}</td>
                    <td className="px-4 py-3 text-xs text-[#4e5971] whitespace-nowrap">{filing.type}</td>
                    <td className="px-4 py-3 text-xs text-[#4e5971]">
                      <span className="font-medium">{filing.detail.split(":")[0]}:</span> {filing.detail.split(":")[1]}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap">
                      {filing.compliance === "on-time" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800">
                          ✔ On-time
                        </span>
                      )}
                      {filing.compliance === "delayed" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-800">
                          ⚠ Delayed
                        </span>
                      )}
                      {filing.compliance === "breach" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800">
                          ❌ Breach
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap">
                      <a
                        href={filing.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#004ce6] hover:underline font-medium"
                      >
                        View PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Trigger Entries */}
        <div className="mb-10">
          <h2 className="text-xl font-medium text-[#002673] mb-4">Detailed Trigger Entries</h2>

          {data.detailedEntries.map((entry, index) => (
            <div key={entry.id} className="mb-6 border border-[#EAF0FC] rounded-md overflow-hidden">
              <div className="bg-[#f8fafd] px-4 py-2 border-b border-[#EAF0FC]">
                <h3 className="font-medium text-[#002673] flex items-center justify-between">
                  <span>
                    {entry.entity} – {entry.type}
                  </span>
                  <span className="text-xs text-[#6e7b96]">{entry.date}</span>
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div className="space-y-2">
                    {entry.details.project && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Project:</span>{" "}
                        <span className="text-[#002673]">{entry.details.project}</span>
                      </p>
                    )}
                    {entry.details.filingDate && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Filing Date:</span>{" "}
                        <span className="text-[#002673]">{entry.details.filingDate}</span>
                      </p>
                    )}
                    {entry.details.receivedDate && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Received:</span>{" "}
                        <span className="text-[#002673]">{entry.details.receivedDate}</span>
                      </p>
                    )}
                    {entry.details.dueDate && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Due Date:</span>{" "}
                        <span className="text-[#002673]">{entry.details.dueDate}</span>
                      </p>
                    )}
                    {entry.details.originalHandoverDate && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Original Handover Date:</span>{" "}
                        <span className="text-[#002673]">{entry.details.originalHandoverDate}</span>
                      </p>
                    )}
                    {entry.details.revisedHandoverDate && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Revised Handover Date:</span>{" "}
                        <span className="text-[#002673]">{entry.details.revisedHandoverDate}</span>
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    {entry.details.section && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Section:</span>{" "}
                        <span className="text-[#002673]">{entry.details.section}</span>
                      </p>
                    )}
                    {entry.details.filingType && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Filing Type:</span>{" "}
                        <span className="text-[#002673]">{entry.details.filingType}</span>
                      </p>
                    )}
                    {entry.details.revisionType && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Revision Type:</span>{" "}
                        <span className="text-[#002673]">{entry.details.revisionType}</span>
                      </p>
                    )}
                    {entry.details.noticeIssued && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Notice Issued:</span>{" "}
                        <span className="text-[#002673]">{entry.details.noticeIssued}</span>
                      </p>
                    )}
                    {entry.details.reason && (
                      <p className="text-xs">
                        <span className="font-medium text-[#4e5971]">Reason:</span>{" "}
                        <span className="text-[#002673]">{entry.details.reason}</span>
                      </p>
                    )}
                    <p className="text-xs">
                      <span className="font-medium text-[#4e5971]">Compliance:</span>{" "}
                      {entry.details.compliance === "on-time" && (
                        <span className="text-green-600 font-medium">On-time (✔)</span>
                      )}
                      {entry.details.compliance === "delayed" && (
                        <span className="text-yellow-600 font-medium">Delayed (⚠)</span>
                      )}
                      {entry.details.compliance === "breach" && (
                        <span className="text-red-600 font-medium">Breach (❌)</span>
                      )}
                    </p>
                  </div>
                </div>
                {entry.summary && (
                  <div className="mb-4 bg-[#f8fafd] p-3 rounded-md">
                    <p className="text-xs">
                      <span className="font-medium text-[#4e5971]">Summary:</span>{" "}
                      <span className="text-[#002673]">{entry.summary}</span>
                    </p>
                  </div>
                )}
                <div className="mb-4">
                  <p className="text-xs font-medium text-[#4e5971] mb-2">Full Text Excerpt:</p>
                  <div className="p-3 bg-[#f8fafd] border border-[#EAF0FC] rounded-md text-xs text-[#4e5971] italic">
                    {entry.fullTextExcerpt}
                  </div>
                </div>
                <div>
                  <p className="text-xs">
                    <span className="font-medium text-[#4e5971]">Source PDF:</span>{" "}
                    <a
                      href={entry.sourcePDF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#004ce6] hover:underline font-medium"
                    >
                      Download
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-[#EAF0FC] pt-4 mt-8">
          <div className="flex justify-between items-center text-[10px] text-[#6e7b96]">
            <div>© 2025 Bynd Financial Research. All Rights Reserved.</div>
            <div>RERA Filings and Press Mentions | Generated: {data.generatedDate}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-start gap-2 mt-6 mb-8">
        {onRestart && (
          <Button onClick={onRestart} variant="outline" className="flex items-center gap-1" size="sm">
            <RefreshCw className="h-4 w-4" />
            New Monitoring
          </Button>
        )}
      </div>
    </div>
  )
}
