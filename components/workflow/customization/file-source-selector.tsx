"use client"

import type React from "react"
import { useState } from "react"
import { Upload } from "lucide-react"

interface FileSourceSelectorProps {
  onSelect: (source: "auto-fetch" | "upload", files?: File[]) => void
}

export function FileSourceSelector({ onSelect }: FileSourceSelectorProps) {
  const [selectedSource, setSelectedSource] = useState<"auto-fetch" | "upload">("auto-fetch")
  const [files, setFiles] = useState<File[]>([])

  const handleSourceChange = (source: "auto-fetch" | "upload") => {
    setSelectedSource(source)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleContinue = () => {
    if (selectedSource === "auto-fetch" || (selectedSource === "upload" && files.length > 0)) {
      onSelect(selectedSource, files)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => handleSourceChange("auto-fetch")}
          className={`flex-1 p-4 rounded-md border ${
            selectedSource === "auto-fetch" ? "border-[#004ce6] bg-[#f0f4fa]" : "border-[#dee6f5] bg-white"
          } transition-colors`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className={`p-2 rounded-full ${selectedSource === "auto-fetch" ? "bg-[#e6edf9]" : "bg-[#f0f4fa]"}`}>
              <svg className="h-5 w-5 text-[#004ce6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
            <span className="font-medium text-sm">Auto-Fetch</span>
            <span className="text-xs text-[#6e7b96]">Latest quarterly filings</span>
          </div>
        </button>

        <button
          onClick={() => handleSourceChange("upload")}
          className={`flex-1 p-4 rounded-md border ${
            selectedSource === "upload" ? "border-[#004ce6] bg-[#f0f4fa]" : "border-[#dee6f5] bg-white"
          } transition-colors`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className={`p-2 rounded-full ${selectedSource === "upload" ? "bg-[#e6edf9]" : "bg-[#f0f4fa]"}`}>
              <Upload className="h-5 w-5 text-[#004ce6]" />
            </div>
            <span className="font-medium text-sm">Upload Files</span>
            <span className="text-xs text-[#6e7b96]">Your own PDF documents</span>
          </div>
        </button>
      </div>

      {selectedSource === "upload" && (
        <div className="mt-4">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#dee6f5] rounded-md cursor-pointer bg-white hover:bg-[#f4f9ff] transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-8 w-8 text-[#8098c4] mb-2" />
              <p className="mb-2 text-sm text-[#4e5971]">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-[#6e7b96]">PDF files only</p>
            </div>
            <input id="file-upload" type="file" className="hidden" accept=".pdf" multiple onChange={handleFileChange} />
          </label>

          {files.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-[#4e5971]">{files.length} file(s) selected</p>
              <ul className="mt-1 text-xs text-[#6e7b96]">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={selectedSource === "upload" && files.length === 0}
        className="continue-button px-4 py-2 bg-[#004ce6] text-white rounded-md hover:bg-[#003bb2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  )
}
