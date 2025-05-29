"use client"

import type React from "react"
import { useState } from "react"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"

interface ScreenshotUploaderProps {
  onUpload: (imageUrl: string, filename: string) => void
}

export function ScreenshotUploader({ onUpload }: ScreenshotUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

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
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadStatus("error")
      return
    }

    setIsUploading(true)
    setUploadStatus("idle")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadStatus("success")
        setUploadedFile(file.name)
        onUpload(result.url, result.filename)
      } else {
        setUploadStatus("error")
        console.error("Upload failed:", result.error)
      }
    } catch (error) {
      setUploadStatus("error")
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
      case "error":
        return <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
      default:
        return <Upload className="h-8 w-8 text-[#8098c4] mb-2" />
    }
  }

  const getStatusText = () => {
    if (isUploading) return "Uploading..."
    if (uploadStatus === "success") return `Uploaded: ${uploadedFile}`
    if (uploadStatus === "error") return "Upload failed. Please try again."
    return "Drop your chart screenshot here or click to upload"
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed ${
          isDragging
            ? "border-[#004ce6] bg-[#f4f9ff]"
            : uploadStatus === "success"
              ? "border-green-300 bg-green-50"
              : uploadStatus === "error"
                ? "border-red-300 bg-red-50"
                : "border-[#dee6f5] bg-[#f9fafc]"
        } rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
          !isUploading && uploadStatus !== "success" ? "cursor-pointer" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {getStatusIcon()}
        <p
          className={`text-sm font-medium ${
            uploadStatus === "success" ? "text-green-700" : uploadStatus === "error" ? "text-red-700" : "text-[#001742]"
          }`}
        >
          {getStatusText()}
        </p>
        {uploadStatus === "idle" && <p className="text-xs text-[#8098c4]">Supported formats: PNG, JPG, JPEG</p>}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          disabled={isUploading || uploadStatus === "success"}
        />

        {uploadStatus !== "success" && !isUploading && (
          <label
            htmlFor="file-upload"
            className="mt-2 text-xs text-[#004ce6] hover:text-[#0039b8] cursor-pointer underline"
          >
            Browse files
          </label>
        )}
      </div>
    </div>
  )
}
