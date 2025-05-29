import type { ReactNode } from "react"
import type { Message, WorkflowConfig } from "@/lib/workflow/types"

export class WorkflowEngine {
  private config: WorkflowConfig
  private currentStep = 1
  private messages: Message[] = []
  private activeCustomizationId: string | null = null

  constructor(config: WorkflowConfig) {
    this.config = config
  }

  public initialize(): Message[] {
    const welcomeId = "welcome-" + Date.now()
    this.activeCustomizationId = welcomeId

    this.messages = [
      {
        id: welcomeId,
        role: "system",
        content: this.config.initialMessage,
        timestamp: new Date(),
        showCustomization: true,
        step: 1,
      },
    ]

    return this.messages
  }

  public getCurrentStep(): number {
    return this.currentStep
  }

  public getMessages(): Message[] {
    return this.messages
  }

  public getActiveCustomizationId(): string | null {
    return this.activeCustomizationId
  }

  public addMessage(
    role: "system" | "user" | "loading",
    content: string | ReactNode,
    showCustomization = false,
  ): string {
    const newId = Date.now().toString()

    // If this is a system message with customization, update the active customization ID
    if (role === "system" && showCustomization) {
      this.activeCustomizationId = newId
    }

    this.messages = [
      ...this.messages,
      {
        id: newId,
        role,
        content,
        timestamp: new Date(),
        showCustomization,
        step: this.currentStep,
      },
    ]

    return newId
  }

  public setCurrentStep(step: number): void {
    this.currentStep = step
  }

  public addLoadingMessage(content: string): void {
    this.messages = [
      ...this.messages,
      {
        id: "loading",
        role: "loading",
        content,
        timestamp: new Date(),
      },
    ]
  }

  public updateLoadingMessage(content: string): void {
    this.messages = this.messages.map((msg) => (msg.id === "loading" ? { ...msg, content } : msg))
  }

  public removeLoadingMessage(): void {
    this.messages = this.messages.filter((msg) => msg.id !== "loading")
  }

  public handleEditMessage(messageId: string): void {
    // Find the message index
    const messageIndex = this.messages.findIndex((msg) => msg.id === messageId)
    if (messageIndex >= 0) {
      const message = this.messages[messageIndex]

      // Remove all messages after this one
      this.messages = this.messages.slice(0, messageIndex + 1)

      // Reset the current step based on the message
      if (message.step) {
        this.currentStep = message.step
      }

      // Set this message as the active customization
      if (message.role === "user") {
        // Find the next system message after this user message
        const nextSystemMessage = this.messages.find((msg, idx) => idx > messageIndex && msg.role === "system")
        if (nextSystemMessage && nextSystemMessage.showCustomization) {
          this.activeCustomizationId = nextSystemMessage.id
        }
      }
    }
  }

  public clearActiveCustomization(): void {
    this.activeCustomizationId = null
  }
}
