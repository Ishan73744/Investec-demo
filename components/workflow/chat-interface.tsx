"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { ChatMessage, type MessageProps } from "@/components/workflow/chat-message"

interface ChatInterfaceProps {
  messages: MessageProps[]
  activeCustomizationId: string | null
  onEditMessage?: (id: string) => void
  children?: React.ReactNode
  contentContainerRef: React.RefObject<HTMLDivElement>
}

export function ChatInterface({
  messages,
  activeCustomizationId,
  onEditMessage,
  children,
  contentContainerRef,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Add console logs for debugging
  console.log("ChatInterface rendering with messages:", messages.length)
  console.log("Active customization ID:", activeCustomizationId)

  // Log which message has customization
  messages.forEach((msg) => {
    if (msg.customization) {
      console.log(`Message ${msg.id} has customization and isActive: ${msg.id === activeCustomizationId}`)
    }
  })

  return (
    <div className="flex-1 overflow-y-auto p-6 pb-32">
      <div className="max-w-3xl mx-auto space-y-6" ref={contentContainerRef}>
        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessage
              {...message}
              onEdit={onEditMessage}
              isActiveCustomization={message.id === activeCustomizationId}
            />
            {/* Only render customization if this message is active AND has customization */}
            {message.id === activeCustomizationId && message.customization && (
              <div className="mt-4">{message.customization}</div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {children}
    </div>
  )
}
