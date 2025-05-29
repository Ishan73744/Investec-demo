"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, File, X, Check, Database } from "lucide-react"

interface DocumentUploaderProps {
  onUpload: (documentNames: string[]) => void
  allowMultiple?: boolean
}

export function DocumentUploader({ onUpload, allowMultiple = false }: DocumentUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [selectedFromDatabase, setSelectedFromDatabase] = useState<string[]>([])
  const [showDatabaseOptions, setShowDatabaseOptions] = useState(false)

  // Sample database documents
  const databaseDocuments = [
    { id: "doc1", name: "Real Estate Market Analysis.pdf" },
    { id: "doc2", name: "Q4 2025 Financial Review.docx" },
    { id: "doc3", name: "Annual Performance Report.pptx" },
    { id: "doc4", name: "Industry Competitive Analysis.pdf" },
    { id: "doc5", name: "Strategic Growth Plan 2026.pdf" },
  ]

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => file.name)

      if (allowMultiple) {
        setUploadedFiles([...uploadedFiles, ...newFiles])
      } else {
        setUploadedFiles(newFiles.slice(0, 1))
      }
    }
  }

  // Handle removing an uploaded file
  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file !== fileName))
  }

  // Handle selecting a document from the database
  const toggleDatabaseDocument = (docName: string) => {
    if (selectedFromDatabase.includes(docName)) {
      setSelectedFromDatabase(selectedFromDatabase.filter((name) => name !== docName))
    } else {
      if (allowMultiple) {
        setSelectedFromDatabase([...selectedFromDatabase, docName])
      } else {
        setSelectedFromDatabase([docName])
      }
    }
  }

  // Handle submitting the selected documents
  const handleSubmit = () => {
    const allDocuments = [...uploadedFiles, ...selectedFromDatabase]
    if (allDocuments.length > 0) {
      onUpload(allDocuments)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#001742]">Upload or Select Documents</h3>
        <p className="text-sm text-[#4e5971]">
          {allowMultiple
            ? "Upload or select the documents you want to summarize. You can select multiple documents."
            : "Upload or select the document you want to summarize."}
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
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple={allowMultiple}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                />
                <div className="flex flex-col items-center gap-2">
                  <File className="h-10 w-10 text-[#8098c4]" />
                  <p className="text-sm font-medium text-[#4e5971]">Drag & drop or click to upload</p>
                  <p className="text-xs text-[#6e7b96]">Supports PDF, Word, PowerPoint, and text files</p>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#4e5971]">Uploaded Files:</p>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-[#f4f9ff] rounded-md text-sm">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-[#8098c4]" />
                        <span className="text-[#4e5971] truncate max-w-[180px]">{file}</span>
                      </div>
                      <button onClick={() => removeFile(file)} className="text-[#8098c4] hover:text-[#004ce6]">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
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
                {showDatabaseOptions ? "Hide Documents" : "Browse Documents"}
              </Button>

              {showDatabaseOptions && (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {databaseDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className={`flex items-center justify-between p-2 rounded-md text-sm cursor-pointer ${
                        selectedFromDatabase.includes(doc.name)
                          ? "bg-[#f4f9ff] border border-[#004ce6]"
                          : "hover:bg-[#f4f9ff] border border-[#e1e8f6]"
                      }`}
                      onClick={() => toggleDatabaseDocument(doc.name)}
                    >
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-[#8098c4]" />
                        <span className="text-[#4e5971]">{doc.name}</span>
                      </div>
                      {selectedFromDatabase.includes(doc.name) && <Check className="h-4 w-4 text-[#004ce6]" />}
                    </div>
                  ))}
                </div>
              )}

              {selectedFromDatabase.length > 0 && !showDatabaseOptions && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#4e5971]">Selected Documents:</p>
                  {selectedFromDatabase.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-[#f4f9ff] rounded-md text-sm">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-[#8098c4]" />
                        <span className="text-[#4e5971] truncate max-w-[180px]">{doc}</span>
                      </div>
                      <button
                        onClick={() => toggleDatabaseDocument(doc)}
                        className="text-[#8098c4] hover:text-[#004ce6]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSubmit}
          disabled={uploadedFiles.length === 0 && selectedFromDatabase.length === 0}
          className="bg-[#004ce6] hover:bg-[#0047cb] text-white px-6"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
