"use client"

import { useState } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowEngineComponent } from "@/components/workflow/workflow-engine"
import { CompanyNameInput } from "@/components/workflow/customization/company-name-input"
import { CompanyScreeningReport } from "@/components/workflow/report/company-screening-report"
import { companyScreeningData } from "@/lib/workflow/company-screening-data"
import type { CompanyScreeningData } from "@/lib/workflow/types"
import type { WorkflowConfig } from "@/lib/workflow/types"

const companyScreeningWorkflow: WorkflowConfig = {
  id: "company-management-screening",
  title: "Company & Management Screening",
  description: "Conduct comprehensive background checks on companies and their key personnel.",
  steps: [
    { id: 1, title: "Enter Company Name", description: "Provide the name of the company to screen." },
    { id: 2, title: "Generate Report", description: "Review the detailed screening report." },
  ],
  initialMessage: "Welcome to the Company & Management Screening workflow. Please enter a company name to begin.",
}

export default function CompanyManagementScreeningPage() {
  const [reportData, setReportData] = useState<CompanyScreeningData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCompanySubmit = async (companyName: string) => {
    const companyKey = "aarti-drugs" // In a real app, you'd look up the company

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user" as const,
      content: `Screen ${companyName}`,
      timestamp: new Date(),
    }

    const loadingMessage = {
      id: "loading",
      role: "loading" as const,
      content: "Searching databases and compiling the screening report...",
      timestamp: new Date(),
    }

    // This would be handled by the workflow engine, but for simplicity here:
    // 1. Add user message
    // 2. Add loading message
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const data = companyScreeningData[companyKey]
    setReportData(data)
    setIsLoading(false)

    // 3. Remove loading message
    // 4. Add system message with report
  }

  const handleEdit = () => {
    setReportData(null)
    setIsLoading(false)
  }

  return (
    <WorkflowLayout>
      <WorkflowEngineComponent
        workflowConfig={companyScreeningWorkflow}
        initialCustomization={!reportData && !isLoading ? <CompanyNameInput onSubmit={handleCompanySubmit} /> : null}
        isLoading={isLoading}
        loadingContent="Searching databases and compiling the screening report..."
        reportContent={reportData ? <CompanyScreeningReport data={reportData} /> : null}
        onEdit={handleEdit}
        userName="Analyst"
        userMessage={reportData ? `Screening report for ${reportData.name}` : ""}
      />
    </WorkflowLayout>
  )
}
