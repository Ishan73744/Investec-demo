"use client"

import { useState } from "react"

export function useFileDownload() {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadFile = async (url: string, filename: string) => {
    setIsDownloading(true)
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error("Download failed")

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Download error:", error)
      throw error
    } finally {
      setIsDownloading(false)
    }
  }

  return { downloadFile, isDownloading }
}
