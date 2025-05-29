"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit2, ChevronDown, ChevronRight, X, Tag } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface Section {
  id: string
  title: string
  selected: boolean
  tags: string[]
  description: string
}

interface DocumentIndexWithTagsProps {
  documentSections: Section[]
  customSections: Section[]
  onUpdateSections: (sections: Section[]) => void
  onUpdateCustomSections: (sections: Section[]) => void
  onSubmit: (sections: Section[], customSections: Section[]) => void
}

export function DocumentIndexWithTags({
  documentSections,
  customSections,
  onUpdateSections,
  onUpdateCustomSections,
  onSubmit,
}: DocumentIndexWithTagsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState("")
  const [newTag, setNewTag] = useState("")
  const [activeTagSectionId, setActiveTagSectionId] = useState<string | null>(null)

  // Initialize with first section expanded
  useEffect(() => {
    if (documentSections.length > 0 && expandedSections.length === 0) {
      setExpandedSections([documentSections[0].id])
    }
  }, [documentSections])

  // Toggle section expansion
  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      if (prev.includes(id)) {
        return prev.filter((sectionId) => sectionId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Toggle section selection
  const toggleSectionSelection = (id: string, isCustom = false) => {
    if (isCustom) {
      onUpdateCustomSections(
        customSections.map((section) => (section.id === id ? { ...section, selected: !section.selected } : section)),
      )
    } else {
      onUpdateSections(
        documentSections.map((section) => (section.id === id ? { ...section, selected: !section.selected } : section)),
      )
    }
  }

  // Handle section reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const sourceId = result.source.droppableId
    const destId = result.destination.droppableId

    if (sourceId === "document-sections" && destId === "document-sections") {
      const items = Array.from(documentSections)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)
      onUpdateSections(items)
    } else if (sourceId === "custom-sections" && destId === "custom-sections") {
      const items = Array.from(customSections)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)
      onUpdateCustomSections(items)
    }
  }

  // Handle adding a new custom section
  const addCustomSection = () => {
    if (newSectionTitle.trim()) {
      const newSection = {
        id: `custom-${Date.now()}`,
        title: newSectionTitle,
        selected: true,
        tags: [],
        description: "No focus areas specified yet",
      }
      onUpdateCustomSections([...customSections, newSection])
      setNewSectionTitle("")

      // Expand the newly added section
      setExpandedSections((prev) => [...prev, newSection.id])
    }
  }

  // Handle removing a custom section
  const removeCustomSection = (id: string) => {
    onUpdateCustomSections(customSections.filter((section) => section.id !== id))
    setExpandedSections((prev) => prev.filter((sectionId) => sectionId !== id))
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

  // Handle adding a tag
  const addTag = (sectionId: string, isCustom = false) => {
    if (newTag.trim()) {
      if (isCustom) {
        onUpdateCustomSections(
          customSections.map((section) => {
            if (section.id === sectionId) {
              const updatedTags = [...section.tags, newTag.trim()]
              return {
                ...section,
                tags: updatedTags,
                description: updatedTags.join(", "),
              }
            }
            return section
          }),
        )
      } else {
        onUpdateSections(
          documentSections.map((section) => {
            if (section.id === sectionId) {
              const updatedTags = [...section.tags, newTag.trim()]
              return {
                ...section,
                tags: updatedTags,
                description: updatedTags.join(", "),
              }
            }
            return section
          }),
        )
      }
      setNewTag("")
    }
  }

  // Handle removing a tag
  const removeTag = (sectionId: string, tagToRemove: string, isCustom = false) => {
    if (isCustom) {
      onUpdateCustomSections(
        customSections.map((section) => {
          if (section.id === sectionId) {
            const updatedTags = section.tags.filter((tag) => tag !== tagToRemove)
            return {
              ...section,
              tags: updatedTags,
              description: updatedTags.join(", ") || "No focus areas specified yet",
            }
          }
          return section
        }),
      )
    } else {
      onUpdateSections(
        documentSections.map((section) => {
          if (section.id === sectionId) {
            const updatedTags = section.tags.filter((tag) => tag !== tagToRemove)
            return {
              ...section,
              tags: updatedTags,
              description: updatedTags.join(", ") || "No focus areas specified yet",
            }
          }
          return section
        }),
      )
    }
  }

  // Render a section
  const renderSection = (section: Section, index: number, isCustom = false) => {
    const isExpanded = expandedSections.includes(section.id)
    const isTagActive = activeTagSectionId === section.id

    return (
      <Draggable key={section.id} draggableId={section.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`mb-3 rounded-md border ${
              section.selected ? "border-[#004ce626] bg-[#f4f9ff]" : "border-[#e1e8f6]"
            }`}
          >
            <div className="p-3">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={section.selected}
                    onChange={() => toggleSectionSelection(section.id, isCustom)}
                    className="h-4 w-4 rounded border-[#8098c4] text-[#004ce6] focus:ring-[#004ce6]"
                  />

                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center gap-2 flex-1 text-left"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-[#004ce6]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[#6e7b96]" />
                    )}

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
                      <span className={`text-sm font-medium ${section.selected ? "text-[#001742]" : "text-[#4e5971]"}`}>
                        {section.title}
                      </span>
                    )}
                  </button>
                </div>

                {editingSectionId !== section.id && (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditingSection(section.id, section.title)}
                      className="h-8 w-8 p-0 text-[#8098c4] hover:text-[#004ce6] hover:bg-[#f4f9ff]"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    {isCustom && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeCustomSection(section.id)}
                        className="h-8 w-8 p-0 text-[#8098c4] hover:text-red-500 hover:bg-[#f4f9ff]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Section Description (when collapsed) */}
              {!isExpanded && section.description && (
                <div className="mt-2 ml-10 text-sm text-[#6e7b96]">
                  <p className="line-clamp-1">{section.description}</p>
                </div>
              )}

              {/* Section Content (when expanded) */}
              {isExpanded && (
                <div className="mt-3 ml-10 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {section.tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 px-2 py-1 bg-[#EAF0FC] text-[#004ce6] rounded-md text-xs"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(section.id, tag, isCustom)}
                          className="text-[#6e7b96] hover:text-[#004ce6]"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Add a focus area..."
                        value={isTagActive ? newTag : ""}
                        onChange={(e) => setNewTag(e.target.value)}
                        onFocus={() => setActiveTagSectionId(section.id)}
                        className="pl-8 border-[#e1e8f6] text-sm"
                      />
                      <Tag className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8098c4]" />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addTag(section.id, isCustom)}
                      disabled={!newTag.trim() || activeTagSectionId !== section.id}
                      className="bg-[#004ce6] hover:bg-[#0047cb] text-white"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#001742]">Document Index & Focus Areas</h3>
        <p className="text-sm text-[#4e5971]">
          Customize your document index and specify focus areas for each section. Click on a section to expand it and
          edit its focus areas.
        </p>

        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Document Sections */}
          <Droppable droppableId="document-sections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {documentSections.map((section, index) => renderSection(section, index))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Custom Sections */}
          {customSections.length > 0 && (
            <div className="mt-6">
              <h4 className="text-md font-medium text-[#001742] mb-3">Custom Sections</h4>
              <Droppable droppableId="custom-sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {customSections.map((section, index) => renderSection(section, index, true))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </DragDropContext>

        {/* Add Custom Section */}
        <Card className="mt-6 border-dashed border-[#e1e8f6]">
          <div className="p-3 space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="New section title"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                className="border-[#e1e8f6]"
              />
              <Button
                onClick={addCustomSection}
                disabled={!newSectionTitle.trim()}
                className="bg-[#004ce6] hover:bg-[#0047cb] text-white whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Section
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={() => onSubmit(documentSections, customSections)}
          className="bg-[#004ce6] hover:bg-[#0047cb] text-white px-6"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
