import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CustomizationBoxProps {
  children: React.ReactNode
}

export function CustomizationBox({ children }: CustomizationBoxProps) {
  return (
    <Card className="mt-4 border-[#EAF0FC]">
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  )
}
