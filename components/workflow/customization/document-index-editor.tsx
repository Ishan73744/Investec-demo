"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface DocumentIndexEditorProps {
  documentSections: Array<{ id: string; title: string; selected: boolean }>
  customSections: Array<{ id: string; title: string; description: string }>
  onUpdateSections: (sections: Array<{ id: string; title: string; selected: boolean }>) => void
  onUpdateCustomSections: (sections: Array<{ id: string; title: string; description: string }>) => void
  onSubmit: (sections: Array<{ id: string; title: string; selected: boolean }>) => void
}

export function DocumentIndexEditor({
  documentSections,
  customSections,
  onUpdateSections,
  onUpdateCustomSections,
  onSubmit,
}: DocumentIndexEditorProps) {
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [newSectionDescription, setNewSectionDescription] = useState("")
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState("")

  // Handle section selection toggle
  const toggleSection = (id: string) => {
    onUpdateSections(
      documentSections.map((section) => (section.id === id ? { ...section, selected: !section.selected } : section)),
    )
  }

  // Handle section reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(documentSections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onUpdateSections(items)
  }

  // Handle adding a new custom section
  const addCustomSection = () => {
    if (newSectionTitle.trim()) {
      onUpdateCustomSections([
        ...customSections,
        {
          id: `custom-${Date.now()}`,
          title: newSectionTitle,
          description: newSectionDescription,
        },
      ])
      setNewSectionTitle("")
      setNewSectionDescription("")
    }
  }

  // Handle removing a custom section
  const removeCustomSection = (id: string) => {
    onUpdateCustomSections(customSections.filter((section) => section.id !== id))
  }

  // Handle editing a section title
  const startEditingSection = (id: string, title: string) => {
    setEditingSectionId(id)
    setEditingTitle(title)
  }

  const saveEditingSection = () => {
    if (editingSectionId && editingTitle.trim()) {
      // Check if it's a custom section
      const customIndex = customSections.findIndex((s) => s.id === editingSectionId)

      if (customIndex >= 0) {
        const updatedCustomSections = [...customSections]
        updatedCustomSections[customIndex] = {
          ...updatedCustomSections[customIndex],
          title: editingTitle,
        }
        onUpdateCustomSections(updatedCustomSections)
      } else {
        // It's a regular section
        onUpdateSections(
          documentSections.map((section) =>
            section.id === editingSectionId ? { ...section, title: editingTitle } : section,
          ),
        )
      }

      setEditingSectionId(null)
      setEditingTitle("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#001742]">Document Index</h3>
        <p className="text-sm text-[#4e5971]">
          Rearrange, edit, or remove sections from your document index. You can also add custom sections.
        </p>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="document-sections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {documentSections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center justify-between p-3 rounded-md border ${
                          section.selected ? "border-[#004ce6] bg-[#f4f9ff]" : "border-[#e1e8f6]"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={section.selected}
                            onChange={() => toggleSection(section.id)}
                            className="h-4 w-4 rounded border-[#8098c4] text-[#004ce6] focus:ring-[#004ce6]"
                          />

                          {editingSectionId === section.id ? (
                            <div className="flex-1 flex gap-2">
                              <Input
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                size="sm"
                                onClick={saveEditingSection}
                                className="bg-[#004ce6] hover:bg-[#0047cb] text-white"
                              >
                                Save
                              </Button>
                            </div>
                          ) : (
                            <span
                              className={`text-sm ${section.selected ? "text-[#001742] font-medium" : "text-[#4e5971]"}`}
                            >
                              {section.title}
                            </span>
                          )}
                        </div>

                        {editingSectionId !== section.id && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditingSection(section.id, section.title)}
                            className="h-8 w-8 p-0 text-[#8098c4] hover:text-[#004ce6] hover:bg-[#f4f9ff]"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="pt-4">
          <h4 className="text-md font-medium text-[#001742] mb-3">Custom Sections</h4>

          <div className="space-y-3">
            {customSections.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-3 rounded-md border border-[#004ce6] bg-[#f4f9ff]"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-4 w-4 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#004ce6]"></div>
                  </div>

                  {editingSectionId === section.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={saveEditingSection}
                        className="bg-[#004ce6] hover:bg-[#0047cb] text-white"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <span className="text-sm text-[#001742] font-medium">{section.title}</span>
                      {section.description && <p className="text-xs text-[#4e5971] mt-1">{section.description}</p>}
                    </div>
                  )}
                </div>

                <div className="flex gap-1">
                  {editingSectionId !== section.id && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditingSection(section.id, section.title)}
                      className="h-8 w-8 p-0 text-[#8098c4] hover:text-[#004ce6] hover:bg-[#f4f9ff]"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeCustomSection(section.id)}
                    className="h-8 w-8 p-0 text-[#8098c4] hover:text-red-500 hover:bg-[#f4f9ff]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-3 border-dashed border-[#e1e8f6]">
            <div className="p-3 space-y-3">
              <Input
                placeholder="New section title"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                className="border-[#e1e8f6]"
              />
              <Textarea
                placeholder="Optional description"
                value={newSectionDescription}
                onChange={(e) => setNewSectionDescription(e.target.value)}
                className="border-[#e1e8f6] min-h-[60px]"
              />
              <Button
                onClick={addCustomSection}
                disabled={!newSectionTitle.trim()}
                className="w-full bg-[#004ce6] hover:bg-[#0047cb] text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Custom Section
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => onSubmit(documentSections)} className="bg-[#004ce6] hover:bg-[#0047cb] text-white px-6">
          Continue
        </Button>
      </div>
    </div>
  )
}
