"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, FileText, Upload } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const steps = [
  {
    id: 1,
    title: "Upload Documents",
    description: "Upload or select previously tagged financial documents for analysis",
  },
  {
    id: 2,
    title: "Content Standardization",
    description: "System breaks documents into structured elements",
  },
  {
    id: 3,
    title: "Anomaly Detection",
    description: "Analysis for unusual patterns or outliers",
  },
  {
    id: 4,
    title: "Matrix Analysis",
    description: "Comparison against historical statements or industry norms",
  },
  {
    id: 5,
    title: "Anomaly Highlighting",
    description: "Potential anomalies highlighted with confidence scores",
  },
  {
    id: 6,
    title: "Relevancy Assessment",
    description: "Context provided on why items appear unusual",
  },
  {
    id: 7,
    title: "Source Suggestion",
    description: "Recommendations for additional documents to verify findings",
  },
  {
    id: 8,
    title: "Investigation",
    description: "Investigate specific anomalies and add notes to the project",
  },
]

export default function AnomalyDetectionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadedFiles(["Q2_2023_Financial_Statement.pdf", "Q1_2023_Financial_Statement.pdf"])
  }

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="container mx-auto max-w-6xl py-6">
      <div className="mb-6 flex items-center">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Financial Statement Anomaly Detection</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Steps sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workflow Progress</CardTitle>
              <CardDescription>
                Step {currentStep} of {steps.length}
              </CardDescription>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-1 p-2">
                {steps.map((step) => (
                  <li key={step.id} className="flex items-start gap-3 rounded-md p-2">
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        step.id < currentStep
                          ? "bg-primary text-primary-foreground"
                          : step.id === currentStep
                            ? "border-primary text-primary"
                            : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <span className="text-xs">{step.id}</span>
                      )}
                    </div>
                    <div>
                      <div
                        className={`text-sm font-medium ${
                          step.id === currentStep
                            ? "text-primary"
                            : step.id < currentStep
                              ? "text-foreground"
                              : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <Tabs defaultValue="upload">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload">Upload New Documents</TabsTrigger>
                      <TabsTrigger value="existing">Use Existing Documents</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="space-y-4 pt-4">
                      <div
                        className="flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 p-12 text-center"
                        onClick={handleFileUpload}
                      >
                        <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
                        <h3 className="mb-1 text-lg font-medium">Upload Financial Statements</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Drag and drop your financial documents here or click to browse
                        </p>
                        <Button>Select Files</Button>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Uploaded Files</h4>
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 rounded-md border p-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{file}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="existing" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Previously Uploaded Documents</h4>
                        <div className="flex items-center gap-2 rounded-md border p-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Annual_Report_2022.pdf</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border p-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Q4_2022_Financial_Statement.pdf</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border p-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Q3_2022_Financial_Statement.pdf</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <h3 className="mb-2 text-sm font-medium">Content Standardization in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      The system is currently processing your documents and breaking them down into structured elements
                      for analysis.
                    </p>
                    <Progress value={65} className="mt-4 h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Processing Files</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between rounded-md border p-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{file}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">65% complete</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <h3 className="mb-2 text-sm font-medium">Anomaly Detection in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI is analyzing the financial statements for unusual patterns or outliers that might indicate
                      errors or areas requiring further investigation.
                    </p>
                    <Progress value={40} className="mt-4 h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Analysis Areas</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="rounded-md border p-3">
                        <div className="mb-1 text-sm font-medium">Revenue Recognition</div>
                        <div className="text-xs text-muted-foreground">
                          Analyzing timing and classification patterns
                        </div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="mb-1 text-sm font-medium">Expense Categorization</div>
                        <div className="text-xs text-muted-foreground">Checking for unusual allocations</div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="mb-1 text-sm font-medium">Asset Valuation</div>
                        <div className="text-xs text-muted-foreground">Reviewing for inconsistent valuations</div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="mb-1 text-sm font-medium">Liability Recognition</div>
                        <div className="text-xs text-muted-foreground">Identifying potential omissions</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional step content would be implemented similarly */}
              {currentStep > 3 && (
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">Step {currentStep} content would be implemented here</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline" onClick={handlePreviousStep} disabled={currentStep === 1}>
                Previous
              </Button>
              <Button onClick={handleNextStep} disabled={currentStep === steps.length}>
                {currentStep === steps.length ? "Complete" : "Next"}
                {currentStep !== steps.length && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
