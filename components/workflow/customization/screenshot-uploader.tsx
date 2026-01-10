"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"

interface ScreenshotUploaderProps {
  onUpload: (screenshotName: string) => void
}

export function ScreenshotUploader({ onUpload }: ScreenshotUploaderProps) {
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
    simulateUpload()
  }

  const simulateUpload = () => {
    // Immediately trigger the upload without showing a preview
    onUpload("quarterly_revenue_chart.png")
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed ${
          isDragging ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#dee6f5] bg-[#f9fafc]"
        } rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={simulateUpload}
      >
        <Upload className="h-8 w-8 text-[#8098c4] mb-2" />
        <p className="text-sm font-medium text-[#001742]">Drop your chart screenshot here or click to upload</p>
        <p className="text-xs text-[#8098c4]">Supported formats: PNG, JPG</p>
      </div>
    </div>
  )
}
