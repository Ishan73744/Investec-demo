"use client"

import type React from "react"

export type MessageRole = "system" | "user" | "loading"

export interface MessageProps {
  id: string
  role: MessageRole
  content: React.ReactNode | string
  timestamp: Date
  showCustomization?: boolean
  step?: number
  customization?: React.ReactNode
  onEdit?: (id: string) => void
  isActiveCustomization?: boolean
}

export function ChatMessage({ id, role, content, customization, onEdit, isActiveCustomization = false }: MessageProps) {
  if (role === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 flex-shrink-0">
          <img src="/fynd-logo.png" alt="Fynd Logo" width={32} height={32} className="opacity-50" />
        </div>
        <span className="text-[#4e5971]">{content}</span>
      </div>
    )
  }

  if (role === "system") {
    return (
      <div className="flex">
        <div className="h-8 w-8 flex-shrink-0 mt-1">
          <img src="/fynd-logo.png" alt="Fynd Logo" width={32} height={32} />
        </div>
        <div className="flex-1 pl-3">
          <div className="flex flex-col">
            <div className="text-[#001742] leading-normal">{content}</div>
            {/* We don't need to render customization here as it's handled by ChatInterface */}
          </div>
        </div>
      </div>
    )
  }

  // For user messages, we now directly render the content which might include the image
  return (
    <div className="flex justify-end">
      {typeof content === "string" ? (
        <div className="max-w-[85%] bg-[#EAF0FC] text-[#001742] rounded-lg p-4 relative group">
          {content}
          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-[#8098c4] hover:text-[#004ce6] transition-opacity"
            >
              Edit
            </button>
          )}
        </div>
      ) : (
        content
      )}
    </div>
  )
}
