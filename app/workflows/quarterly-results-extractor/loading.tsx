import { WorkflowLayout } from "@/components/workflow/workflow-layout"

export default function Loading() {
  return (
    <WorkflowLayout title="Quarterly Results Extractor" description="Loading...">
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-[#e6edf9] border-t-[#004ce6] animate-spin"></div>
          <p className="text-[#4e5971] animate-pulse">Loading workflow...</p>
        </div>
      </div>
    </WorkflowLayout>
  )
}
