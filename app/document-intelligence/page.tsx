import { DocumentTabs } from "@/components/document-intelligence/document-tabs"
import { DocumentSearch } from "@/components/document-intelligence/document-search"
import { DocumentIntelligenceLayout } from "@/components/document-intelligence/document-intelligence-layout"

export default function DocumentIntelligencePage() {
  return (
    <DocumentIntelligenceLayout>
      <DocumentTabs activeTab="discover" />
      <DocumentSearch />
    </DocumentIntelligenceLayout>
  )
}
