"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileSpreadsheet, X, Check, Database } from "lucide-react"

interface FinancialFileUploaderProps {
  onUpload: (fileName: string) => void
}

export function FinancialFileUploader({ onUpload }: FinancialFileUploaderProps) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [selectedFromDatabase, setSelectedFromDatabase] = useState<string | null>(null)
  const [showDatabaseOptions, setShowDatabaseOptions] = useState(false)

  // Sample database financial files
  const databaseFiles = [
    { id: "fin1", name: "Annual Financial Report 2023.xlsx" },
    { id: "fin2", name: "Quarterly Financial Data Q1 2024.xlsx" },
    { id: "fin3", name: "Financial Statements 2022-2023.xlsx" },
    { id: "fin4", name: "Balance Sheet Analysis.xlsx" },
    { id: "fin5", name: "Cash Flow Projections.xlsx" },
  ]

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0].name)
      setSelectedFromDatabase(null)
    }
  }

  // Handle removing an uploaded file
  const removeFile = () => {
    setUploadedFile(null)
  }

  // Handle selecting a file from the database
  const selectDatabaseFile = (fileName: string) => {
    setSelectedFromDatabase(fileName)
    setUploadedFile(null)
    setShowDatabaseOptions(false)
  }

  // Handle submitting the selected file
  const handleSubmit = () => {
    const selectedFile = uploadedFile || selectedFromDatabase
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#001742]">Upload Financial Data</h3>
        <p className="text-sm text-[#4e5971]">
          Upload or select a financial Excel file to generate insights for the company profile.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upload from device */}
          <Card className="border-[#e1e8f6]">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-[#8098c4]" />
                <h4 className="text-md font-medium text-[#001742]">Upload from Device</h4>
              </div>

              <div
                className="border-2 border-dashed border-[#e1e8f6] rounded-md p-6 text-center hover:bg-[#f4f9ff] transition-colors cursor-pointer"
                onClick={() => document.getElementById("financial-file-upload")?.click()}
              >
                <input
                  type="file"
                  id="financial-file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".xlsx,.xls,.csv"
                />
                <div className="flex flex-col items-center gap-2">
                  <FileSpreadsheet className="h-10 w-10 text-[#8098c4]" />
                  <p className="text-sm font-medium text-[#4e5971]">Drag & drop or click to upload</p>
                  <p className="text-xs text-[#6e7b96]">Supports Excel and CSV files</p>
                </div>
              </div>

              {uploadedFile && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#4e5971]">Uploaded File:</p>
                  <div className="flex items-center justify-between p-2 bg-[#f4f9ff] rounded-md text-sm">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-[#8098c4]" />
                      <span className="text-[#4e5971] truncate max-w-[180px]">{uploadedFile}</span>
                    </div>
                    <button onClick={removeFile} className="text-[#8098c4] hover:text-[#004ce6]">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Select from database */}
          <Card className="border-[#e1e8f6]">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-[#8098c4]" />
                <h4 className="text-md font-medium text-[#001742]">Select from Bynd Database</h4>
              </div>

              <Button
                variant="outline"
                className="w-full border-[#e1e8f6] text-[#4e5971] hover:bg-[#f4f9ff] hover:text-[#004ce6]"
                onClick={() => setShowDatabaseOptions(!showDatabaseOptions)}
              >
                {showDatabaseOptions ? "Hide Files" : "Browse Files"}
              </Button>

              {showDatabaseOptions && (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {databaseFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center justify-between p-2 rounded-md text-sm cursor-pointer ${
                        selectedFromDatabase === file.name
                          ? "bg-[#f4f9ff] border border-[#004ce6]"
                          : "hover:bg-[#f4f9ff] border border-[#e1e8f6]"
                      }`}
                      onClick={() => selectDatabaseFile(file.name)}
                    >
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4 text-[#8098c4]" />
                        <span className="text-[#4e5971]">{file.name}</span>
                      </div>
                      {selectedFromDatabase === file.name && <Check className="h-4 w-4 text-[#004ce6]" />}
                    </div>
                  ))}
                </div>
              )}

              {selectedFromDatabase && !showDatabaseOptions && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#4e5971]">Selected File:</p>
                  <div className="flex items-center justify-between p-2 bg-[#f4f9ff] rounded-md text-sm">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-[#8098c4]" />
                      <span className="text-[#4e5971] truncate max-w-[180px]">{selectedFromDatabase}</span>
                    </div>
                    <button
                      onClick={() => setSelectedFromDatabase(null)}
                      className="text-[#8098c4] hover:text-[#004ce6]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!uploadedFile && !selectedFromDatabase}
          className="bg-[#004ce6] hover:bg-[#0047cb] text-white px-6"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
