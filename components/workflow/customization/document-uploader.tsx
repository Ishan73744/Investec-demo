"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentUploaderProps {
  onUpload: (documentName: string) => void
}

export function DocumentUploader({ onUpload }: DocumentUploaderProps) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    // Simulate file upload
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setUploadedFile(file.name)
      } else {
        alert("Please upload a PDF file")
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate file upload
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setUploadedFile(file.name)
      } else {
        alert("Please upload a PDF file")
      }
    }
  }

  const handleSimulatedUpload = () => {
    // Simulate a file upload with a predefined name
    setUploadedFile("Annual_Report_2022.pdf")
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  const handleContinue = () => {
    if (uploadedFile) {
      onUpload(uploadedFile)
    }
  }

  return (
    <div className="space-y-4">
      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed ${
            isDragging ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#dee6f5] bg-[#f9fafc]"
          } rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Upload className="h-8 w-8 text-[#8098c4] mb-2" />
          <p className="text-sm font-medium text-[#001742]">Drop your PDF file here or click to upload</p>
          <p className="text-xs text-[#6e7b96] mt-1">Only PDF files containing financial statements</p>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-md border border-[#e1e8f6] bg-white p-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#004ce6]" />
              <span className="text-sm font-medium text-[#001742]">{uploadedFile}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-[#8098c4] hover:text-[#004ce6] hover:bg-transparent"
              onClick={handleRemoveFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {!uploadedFile && (
        <div className="text-center">
          <Button
            variant="outline"
            className="text-[#004ce6] border-[#dee6f5] hover:bg-[#f4f9ff]"
            onClick={handleSimulatedUpload}
          >
            Use sample document
          </Button>
        </div>
      )}

      {uploadedFile && (
        <Button
          onClick={handleContinue}
          className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
        >
          Continue
        </Button>
      )}
    </div>
  )
}
