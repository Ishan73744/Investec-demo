"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PeerComparisonPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the workflow page
    router.push("/workflows/peer-comparison")
  }, [router])

  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004ce6]"></div>
    </div>
  )
}
