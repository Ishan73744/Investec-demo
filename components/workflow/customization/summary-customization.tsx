"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SummaryCustomizationProps {
  documentSections: Array<{ id: string; title: string; selected: boolean }>
  customSections: Array<{ id: string; title: string; description: string }>
  summaryOptions: {
    length: string
    tone: string
    includeKeyQuotes: boolean
    includeVisualElements: boolean
  }
  onUpdateSections: (sections: Array<{ id: string; title: string; selected: boolean }>) => void
  onUpdateCustomSections: (sections: Array<{ id: string; title: string; description: string }>) => void
  onUpdateOptions: (options: {
    length: string
    tone: string
    includeKeyQuotes: boolean
    includeVisualElements: boolean
  }) => void
  onSubmit: (
    sections: Array<{ id: string; title: string; selected: boolean }>,
    customSections: Array<{ id: string; title: string; description: string }>,
    options: {
      length: string
      tone: string
      includeKeyQuotes: boolean
      includeVisualElements: boolean
    },
  ) => void
}

export function SummaryCustomization({
  documentSections,
  customSections,
  summaryOptions,
  onUpdateSections,
  onUpdateCustomSections,
  onUpdateOptions,
  onSubmit,
}: SummaryCustomizationProps) {
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [newSectionDescription, setNewSectionDescription] = useState("")
  const [activeTab, setActiveTab] = useState("sections")

  const handleSectionToggle = (id: string, checked: boolean) => {
    const updatedSections = documentSections.map((section) =>
      section.id === id ? { ...section, selected: checked } : section,
    )
    onUpdateSections(updatedSections)
  }

  const handleAddCustomSection = () => {
    if (newSectionTitle.trim()) {
      const newSection = {
        id: `custom-${Date.now()}`,
        title: newSectionTitle,
        description: newSectionDescription,
      }
      onUpdateCustomSections([...customSections, newSection])
      setNewSectionTitle("")
      setNewSectionDescription("")
    }
  }

  const handleRemoveCustomSection = (id: string) => {
    const updatedSections = customSections.filter((section) => section.id !== id)
    onUpdateCustomSections(updatedSections)
  }

  const handleOptionChange = (option: string, value: any) => {
    onUpdateOptions({
      ...summaryOptions,
      [option]: value,
    })
  }

  const handleSubmit = () => {
    onSubmit(documentSections, customSections, summaryOptions)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#f4f7ff]">
          <TabsTrigger value="sections" className="data-[state=active]:bg-white data-[state=active]:text-[#001742]">
            Document Sections
          </TabsTrigger>
          <TabsTrigger value="options" className="data-[state=active]:bg-white data-[state=active]:text-[#001742]">
            Summary Options
          </TabsTrigger>
        </TabsList>

        {/* Document Sections Tab */}
        <TabsContent value="sections" className="pt-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-[#001742]">Select sections to include:</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {documentSections.map((section) => (
                <div key={section.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`section-${section.id}`}
                    checked={section.selected}
                    onCheckedChange={(checked) => handleSectionToggle(section.id, checked === true)}
                    className="border-[#dee6f5] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
                  />
                  <Label htmlFor={`section-${section.id}`} className="text-sm text-[#001742]">
                    {section.title}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#dee6f5]">
            <h3 className="text-sm font-medium text-[#001742]">Add custom sections:</h3>
            <div className="space-y-2">
              <Input
                placeholder="Section title"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                className="border-[#dee6f5] focus-visible:ring-[#004ce6]"
              />
              <Textarea
                placeholder="Describe what you want in this section..."
                value={newSectionDescription}
                onChange={(e) => setNewSectionDescription(e.target.value)}
                className="border-[#dee6f5] focus-visible:ring-[#004ce6] min-h-[80px]"
              />
              <Button
                onClick={handleAddCustomSection}
                disabled={!newSectionTitle.trim()}
                className="w-full gap-1 bg-[#eaf0fc] text-[#004ce6] hover:bg-[#d9e4f7] border-[#d9e4f7]"
              >
                <Plus className="h-4 w-4" />
                Add Custom Section
              </Button>
            </div>

            {customSections.length > 0 && (
              <div className="space-y-2 mt-4">
                <h4 className="text-xs font-medium text-[#6e7b96]">Custom sections:</h4>
                {customSections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between rounded-md border border-[#e1e8f6] bg-white p-2"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#001742]">{section.title}</div>
                      {section.description && (
                        <div className="text-xs text-[#6e7b96] line-clamp-1">{section.description}</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-[#8098c4] hover:text-[#004ce6] hover:bg-transparent"
                      onClick={() => handleRemoveCustomSection(section.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Summary Options Tab */}
        <TabsContent value="options" className="pt-4 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#001742]">Summary Length:</Label>
            <RadioGroup
              value={summaryOptions.length}
              onValueChange={(value) => handleOptionChange("length", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short" id="length-short" className="border-[#dee6f5] text-[#004ce6]" />
                <Label htmlFor="length-short" className="text-sm text-[#001742]">
                  Short (concise overview)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="length-medium" className="border-[#dee6f5] text-[#004ce6]" />
                <Label htmlFor="length-medium" className="text-sm text-[#001742]">
                  Medium (balanced summary)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="detailed" id="length-detailed" className="border-[#dee6f5] text-[#004ce6]" />
                <Label htmlFor="length-detailed" className="text-sm text-[#001742]">
                  Detailed (comprehensive analysis)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#001742]">Tone:</Label>
            <RadioGroup
              value={summaryOptions.tone}
              onValueChange={(value) => handleOptionChange("tone", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="professional"
                  id="tone-professional"
                  className="border-[#dee6f5] text-[#004ce6]"
                />
                <Label htmlFor="tone-professional" className="text-sm text-[#001742]">
                  Professional (formal, business-oriented)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casual" id="tone-casual" className="border-[#dee6f5] text-[#004ce6]" />
                <Label htmlFor="tone-casual" className="text-sm text-[#001742]">
                  Casual (conversational, accessible)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="academic" id="tone-academic" className="border-[#dee6f5] text-[#004ce6]" />
                <Label htmlFor="tone-academic" className="text-sm text-[#001742]">
                  Academic (scholarly, technical)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#001742]">Additional Features:</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-quotes"
                  checked={summaryOptions.includeKeyQuotes}
                  onCheckedChange={(checked) => handleOptionChange("includeKeyQuotes", checked === true)}
                  className="border-[#dee6f5] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
                />
                <Label htmlFor="include-quotes" className="text-sm text-[#001742]">
                  Include key quotes from the document
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-visuals"
                  checked={summaryOptions.includeVisualElements}
                  onCheckedChange={(checked) => handleOptionChange("includeVisualElements", checked === true)}
                  className="border-[#dee6f5] data-[state=checked]:bg-[#004ce6] data-[state=checked]:border-[#004ce6]"
                />
                <Label htmlFor="include-visuals" className="text-sm text-[#001742]">
                  Include visual elements (charts, tables, etc.)
                </Label>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button
        onClick={handleSubmit}
        className="mt-4 bg-[#004ce6] hover:bg-[#0047cb] text-white px-4 py-1.5 h-auto text-sm"
      >
        Generate Summary
      </Button>
    </div>
  )
}
