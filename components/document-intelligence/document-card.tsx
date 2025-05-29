"use client"
import { useState } from "react"
import Image from "next/image"
import { Eye } from "lucide-react"
import { DocumentPreviewModal } from "./document-preview-modal"

export interface DocumentCardProps {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
}

export function DocumentCard({ id, title, description, date, imageUrl }: DocumentCardProps) {
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  return (
    <>
      <div className="bg-white border border-[#EAF0FC] rounded-lg overflow-hidden p-4 relative group">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#001742] font-medium text-base mb-1">{title}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
            <div className="text-gray-500 text-sm">{date}</div>
          </div>
        </div>

        {/* Preview button - visible on hover */}
        <button
          className="absolute bottom-2 right-2 bg-white border border-gray-200 rounded-md px-2 py-1 text-xs flex items-center gap-1 text-gray-600 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setShowPreviewModal(true)}
        >
          <Eye className="h-3 w-3" />
          Preview
        </button>
      </div>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        document={{ id, title, imageUrl }}
      />
    </>
  )
}
