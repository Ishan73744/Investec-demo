"use client"

import type React from "react"
import { useState } from "react"

interface ChatInputProps {
  onSend: (message: string) => void
  placeholder?: string
  fixed?: boolean
  contentContainerRef?: React.RefObject<HTMLDivElement>
}

export function ChatInput({
  onSend,
  placeholder = "Type a message...",
  fixed = false,
  contentContainerRef,
}: ChatInputProps) {
  const [inputValue, setValue] = useState("")

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue)
      setValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (fixed) {
    return (
      <div
        className="fixed bottom-0 z-50 pb-4 pointer-events-none"
        style={{
          left: contentContainerRef?.current ? `${contentContainerRef.current.getBoundingClientRect().left}px` : "0px",
          width: contentContainerRef?.current ? `${contentContainerRef.current.offsetWidth}px` : "100%",
          maxWidth: "100%",
        }}
      >
        <div className="pointer-events-auto">
          <div className="relative rounded-lg border border-[#EAF0FC] bg-white overflow-hidden h-[100px] shadow-lg">
            <textarea
              placeholder={placeholder}
              className="w-full h-full px-4 py-3 text-[#4e5971] focus:outline-none resize-none"
              value={inputValue}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              id="customization-button"
              className={`absolute right-4 bottom-4 h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                inputValue.trim() ? "bg-[#004ce6] text-white" : "bg-[#f2f6fe] text-[#9babc7]"
              }`}
              disabled={!inputValue.trim()}
              onClick={handleSend}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t bg-white p-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 rounded-md border border-[#EAF0FC] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004ce6]"
          />
          <button
            type="button"
            disabled={!inputValue.trim()}
            onClick={handleSend}
            className="rounded-md bg-[#004ce6] p-2 text-white hover:bg-[#0047cb] disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
