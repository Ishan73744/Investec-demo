"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestionCards = [
    { icon: "phone", title: "Transactional summary" },
    { icon: "chart", title: "Recent Industry developments" },
    { icon: "phone", title: "Transactional summary" },
    { icon: "chart", title: "Recent Industry developments" },
    { icon: "phone", title: "Transactional summary" },
    { icon: "chart", title: "Recent Industry developments" },
    { icon: "phone", title: "Transactional summary" },
    { icon: "chart", title: "Recent Industry developments" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Chat functionality would be implemented here
    // For now, just clear the input
    setInputValue("")
  }

  return (
    <div className="flex flex-col h-full items-center justify-start pt-[140px] px-6">
      <h1 className="text-3xl font-medium text-[#001742] mb-10 text-center">Discover What Moves the Business</h1>

      {/* Chat input area - styled to match Figma design with proper height */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mb-10">
        <div className="relative h-[100px] rounded-lg border border-[#dee6f5] bg-white overflow-hidden">
          <textarea
            ref={inputRef}
            placeholder="Ask anything"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="absolute inset-0 w-full h-full px-4 py-4 text-base border-0 resize-none focus:outline-none focus:ring-0 text-[#001742] placeholder:text-[#9babc7]"
          />
          <button
            type="submit"
            className={`absolute right-3 bottom-3 rounded-full h-8 w-8 flex items-center justify-center ${
              inputValue.trim() ? "bg-[#004ce6]" : "bg-[#f2f6fe]"
            }`}
            disabled={!inputValue.trim()}
          >
            <ArrowRight className={`h-4 w-4 ${inputValue.trim() ? "text-white" : "text-[#9babc7]"}`} />
          </button>
        </div>
      </form>

      {/* Suggestion cards - 2 columns grid layout */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
        {suggestionCards.map((card, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-5 rounded-lg border border-[#e1e8f6] bg-white hover:shadow-sm cursor-pointer transition-all"
            onClick={() => {
              setInputValue(card.title)
              if (inputRef.current) {
                inputRef.current.focus()
              }
            }}
          >
            <div className="mb-3">
              {card.icon === "phone" ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.5 6.5C15.2372 6.64382 15.9689 6.96892 16.5 7.5C17.0311 8.03108 17.3562 8.76284 17.5 9.5M15 3C16.5315 3.17014 17.9097 3.91107 19 5C20.0903 6.08893 20.8279 7.46869 21 9M20.9995 16.4767V19.1864C21.0037 20.2223 20.0723 21.0873 19.0265 20.9929C10.0001 21 3.00006 13.935 3.00713 4.96919C2.91294 3.92895 3.77364 3.00106 4.80817 3.00009H7.52331C7.96253 2.99577 8.38835 3.151 8.72138 3.43684C9.66819 4.24949 10.2772 7.00777 10.0429 8.10428C9.85994 8.96036 8.99696 9.55929 8.41026 10.1448C9.69864 12.4062 11.5747 14.2785 13.8405 15.5644C14.4272 14.9788 15.0274 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.858 15.6021 21.0105 16.0337 20.9995 16.4767Z"
                    stroke="#004ce6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 15L12 10L17 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#004ce6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-[#001742] font-medium text-center">{card.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
