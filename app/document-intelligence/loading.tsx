import { DocumentIntelligenceLayout } from "@/components/document-intelligence/document-intelligence-layout"

export default function Loading() {
  return (
    <DocumentIntelligenceLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004ce6]"></div>
        <p className="mt-4 text-[#4e5971]">Loading document intelligence...</p>
      </div>
    </DocumentIntelligenceLayout>
  )
}
