"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Table2, BarChart2, X, Check, Plus, PieChart, LineChart, ArrowRight, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface TableChartItem {
  id: string
  type: string
  title: string
  selected: boolean
  description?: string
  category?: string
}

interface TableChartSelectorProps {
  tablesAndCharts: TableChartItem[]
  onUpdateSelection: (items: TableChartItem[]) => void
  onSubmit: (items: TableChartItem[]) => void
}

export function TableChartSelector({ tablesAndCharts, onUpdateSelection, onSubmit }: TableChartSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Focus search input when modal opens
  useEffect(() => {
    if (isModalOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [isModalOpen])

  // Count selected items
  const selectedCount = tablesAndCharts.filter((item) => item.selected).length

  // Get tables and charts
  const tables = tablesAndCharts.filter((item) => item.type === "table")
  const charts = tablesAndCharts.filter((item) => item.type === "chart")

  // Count tables and charts
  const tablesCount = tables.length
  const chartsCount = charts.length

  // Get selected items for preview (limit to 3)
  const selectedItems = tablesAndCharts.filter((item) => item.selected).slice(0, 3)

  // Filter items based on search query and active tab
  const filteredItems = tablesAndCharts.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    if (activeTab === "tables") return matchesSearch && item.type === "table"
    if (activeTab === "charts") return matchesSearch && item.type === "chart"
    return matchesSearch
  })

  // Toggle selection of an item
  const toggleSelection = (id: string) => {
    onUpdateSelection(tablesAndCharts.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  // Remove an item from selection
  const removeSelection = (id: string) => {
    onUpdateSelection(tablesAndCharts.map((item) => (item.id === id ? { ...item, selected: false } : item)))
  }

  // Get chart icon based on chart type or ID
  const getChartIcon = (item: TableChartItem) => {
    if (item.type === "table") return <Table2 className="h-4 w-4 flex-shrink-0" />

    // For charts, we can vary the icon based on the chart ID or title
    if (item.title.toLowerCase().includes("pie") || item.id.includes("pie")) {
      return <PieChart className="h-4 w-4 flex-shrink-0" />
    }
    if (
      item.title.toLowerCase().includes("line") ||
      item.title.toLowerCase().includes("trend") ||
      item.id.includes("trend")
    ) {
      return <LineChart className="h-4 w-4 flex-shrink-0" />
    }

    // Default chart icon
    return <BarChart2 className="h-4 w-4 flex-shrink-0" />
  }

  // Render chart placeholder based on chart type
  const renderChartPlaceholder = (item: TableChartItem) => {
    if (item.type === "table") {
      return (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-4/5 grid grid-cols-4 gap-1">
            <div className="h-2 bg-[#004ce6] opacity-70 rounded-sm col-span-4"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
            <div className="h-2 bg-[#dee6f5] rounded-sm"></div>
          </div>
        </div>
      )
    }

    // For charts, vary the visualization based on the chart title or ID
    if (item.title.toLowerCase().includes("pie") || item.id.includes("pie")) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-8 border-[#004ce6] opacity-70 relative">
            <div className="absolute inset-0 border-8 border-transparent border-t-[#8098c4] rounded-full"></div>
          </div>
        </div>
      )
    }

    if (
      item.title.toLowerCase().includes("line") ||
      item.title.toLowerCase().includes("trend") ||
      item.id.includes("trend")
    ) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg width="80%" height="60%" viewBox="0 0 100 50" className="overflow-visible">
            <polyline
              points="0,40 20,35 40,25 60,30 80,15 100,20"
              fill="none"
              stroke="#004ce6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            />
            <circle cx="0" cy="40" r="2" fill="#004ce6" />
            <circle cx="20" cy="35" r="2" fill="#004ce6" />
            <circle cx="40" cy="25" r="2" fill="#004ce6" />
            <circle cx="60" cy="30" r="2" fill="#004ce6" />
            <circle cx="80" cy="15" r="2" fill="#004ce6" />
            <circle cx="100" cy="20" r="2" fill="#004ce6" />
          </svg>
        </div>
      )
    }

    // Default bar chart
    return (
      <div className="w-full h-full flex items-end justify-center gap-2 pb-2">
        <div className="w-1/8 h-3/5 bg-[#004ce6] opacity-70 rounded-t-sm"></div>
        <div className="w-1/8 h-4/5 bg-[#004ce6] opacity-70 rounded-t-sm"></div>
        <div className="w-1/8 h-2/5 bg-[#004ce6] opacity-70 rounded-t-sm"></div>
        <div className="w-1/8 h-full bg-[#004ce6] opacity-70 rounded-t-sm"></div>
        <div className="w-1/8 h-3/5 bg-[#004ce6] opacity-70 rounded-t-sm"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#001742]">Select Tables, Charts, and Media</h3>
          <Badge variant="outline" className="bg-[#f4f9ff] text-[#004ce6] border-[#e1e8f6]">
            {selectedCount} selected
          </Badge>
        </div>

        <p className="text-sm text-[#4e5971]">
          Choose the visual elements you want to include in your summary to help illustrate key data points and
          insights.
        </p>

        {/* Selected Items Preview */}
        <div className="space-y-4 mt-6">
          <h4 className="text-md font-medium text-[#001742]">Selected Visuals</h4>

          {selectedCount === 0 ? (
            <Card className="border-dashed border-[#e1e8f6]">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-full bg-[#f4f9ff] flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6 text-[#8098c4]" />
                </div>
                <p className="text-[#6e7b96]">No tables or charts selected yet</p>
                <p className="text-sm text-[#8098c4] mt-1">
                  Click the button below to browse and select visual elements
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedItems.map((item) => (
                <Card
                  key={item.id}
                  className={cn(
                    "border-[#e1e8f6] relative group overflow-hidden transition-all",
                    hoveredItem === item.id && "border-[#b3c9ef]",
                  )}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <CardContent className="p-4">
                    <button
                      onClick={() => removeSelection(item.id)}
                      className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      aria-label={`Remove ${item.title}`}
                    >
                      <X className="h-4 w-4 text-[#6e7b96]" />
                    </button>

                    <div className="flex items-center mb-3">
                      <span className="text-[#004ce6] mr-2">{getChartIcon(item)}</span>
                      <h5 className="text-sm font-medium text-[#001742] line-clamp-1">{item.title}</h5>
                    </div>

                    <div className="aspect-video bg-[#f4f9ff] rounded-md flex items-center justify-center mb-2 overflow-hidden">
                      {renderChartPlaceholder(item)}
                    </div>

                    {item.category && (
                      <Badge variant="outline" className="text-xs bg-[#f9fafc] text-[#6e7b96]">
                        {item.category}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}

              {selectedCount > 3 && (
                <Card
                  className={cn(
                    "border-[#e1e8f6] flex items-center justify-center cursor-pointer hover:border-[#b3c9ef] transition-colors",
                    hoveredItem === "more" && "border-[#b3c9ef] bg-[#fafbfd]",
                  )}
                  onClick={() => setIsModalOpen(true)}
                  onMouseEnter={() => setHoveredItem("more")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="h-10 w-10 rounded-full bg-[#f4f9ff] flex items-center justify-center mx-auto mb-2">
                      <Plus className="h-5 w-5 text-[#004ce6]" />
                    </div>
                    <p className="text-[#4e5971] font-medium">+{selectedCount - 3} more</p>
                    <p className="text-xs text-[#8098c4] mt-1">Click to view all</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-6 bg-[#f4f9ff] hover:bg-[#e4efff] text-[#004ce6] border border-[#e1e8f6] mt-4 group"
          >
            <span className="flex items-center">
              <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Browse Tables & Charts
            </span>
          </Button>
        </div>
      </div>

      {/* Modal for browsing all tables and charts */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col gap-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl text-[#001742]">Browse Tables, Charts & Media</DialogTitle>
          </DialogHeader>

          <div className="px-6 py-4 border-y border-[#f0f4fa] bg-[#f9fafc]">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8098c4]" />
                <Input
                  placeholder="Search by title, content, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-[#e1e8f6] bg-white"
                  ref={searchInputRef}
                  aria-label="Search tables and charts"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#8098c4]" />
                <Badge variant="outline" className="bg-white text-[#004ce6] border-[#e1e8f6]">
                  {selectedCount} selected
                </Badge>
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 overflow-hidden flex flex-col"
          >
            <div className="px-6 pt-4">
              <TabsList className="w-full bg-[#f4f9ff] p-1 h-auto">
                <TabsTrigger
                  value="all"
                  className="flex-1 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  aria-label="Show all tables and charts"
                >
                  All{" "}
                  <Badge variant="outline" className="ml-2 bg-transparent border-none">
                    {tablesAndCharts.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="tables"
                  className="flex-1 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  aria-label="Show only tables"
                >
                  <span className="flex items-center">
                    <Table2 className="h-3.5 w-3.5 mr-1.5" />
                    Tables{" "}
                    <Badge variant="outline" className="ml-2 bg-transparent border-none">
                      {tablesCount}
                    </Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="charts"
                  className="flex-1 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  aria-label="Show only charts"
                >
                  <span className="flex items-center">
                    <BarChart2 className="h-3.5 w-3.5 mr-1.5" />
                    Charts{" "}
                    <Badge variant="outline" className="ml-2 bg-transparent border-none">
                      {chartsCount}
                    </Badge>
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 px-6 py-4">
              <TabsContent value="all" className="m-0 p-0 outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className={cn(
                        "border cursor-pointer transition-all overflow-hidden",
                        item.selected
                          ? "border-[#004ce6] shadow-sm bg-[#fafcff]"
                          : "border-[#e1e8f6] hover:border-[#b3c9ef] hover:bg-[#fafbfd]",
                      )}
                      onClick={() => toggleSelection(item.id)}
                      role="checkbox"
                      aria-checked={item.selected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          toggleSelection(item.id)
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <span className="text-[#004ce6] mr-2">{getChartIcon(item)}</span>
                            <h5 className="text-sm font-medium text-[#001742] line-clamp-1">{item.title}</h5>
                          </div>
                          <div
                            className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center transition-colors",
                              item.selected ? "bg-[#004ce6]" : "border border-[#dee6f5] bg-white",
                            )}
                            aria-hidden="true"
                          >
                            {item.selected && <Check className="h-3 w-3 text-white" />}
                          </div>
                        </div>

                        <div className="aspect-video bg-[#f4f9ff] rounded-md flex items-center justify-center mb-3 overflow-hidden">
                          {renderChartPlaceholder(item)}
                        </div>

                        {item.description && (
                          <p className="text-xs text-[#6e7b96] mb-2 line-clamp-2">{item.description}</p>
                        )}

                        {item.category && (
                          <Badge variant="outline" className="text-xs bg-[#f9fafc] text-[#6e7b96]">
                            {item.category}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredItems.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-10 w-10 text-[#dee6f5] mx-auto mb-3" />
                    <p className="text-[#6e7b96] font-medium">No matching items found</p>
                    <p className="text-sm text-[#8098c4] mt-1">Try adjusting your search or filters</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tables" className="m-0 p-0 outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems
                    .filter((item) => item.type === "table")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className={cn(
                          "border cursor-pointer transition-all overflow-hidden",
                          item.selected
                            ? "border-[#004ce6] shadow-sm bg-[#fafcff]"
                            : "border-[#e1e8f6] hover:border-[#b3c9ef] hover:bg-[#fafbfd]",
                        )}
                        onClick={() => toggleSelection(item.id)}
                        role="checkbox"
                        aria-checked={item.selected}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            toggleSelection(item.id)
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Table2 className="h-4 w-4 text-[#004ce6] mr-2" />
                              <h5 className="text-sm font-medium text-[#001742] line-clamp-1">{item.title}</h5>
                            </div>
                            <div
                              className={cn(
                                "h-5 w-5 rounded-full flex items-center justify-center transition-colors",
                                item.selected ? "bg-[#004ce6]" : "border border-[#dee6f5] bg-white",
                              )}
                              aria-hidden="true"
                            >
                              {item.selected && <Check className="h-3 w-3 text-white" />}
                            </div>
                          </div>

                          <div className="aspect-video bg-[#f4f9ff] rounded-md flex items-center justify-center mb-3 overflow-hidden">
                            {renderChartPlaceholder(item)}
                          </div>

                          {item.description && (
                            <p className="text-xs text-[#6e7b96] mb-2 line-clamp-2">{item.description}</p>
                          )}

                          {item.category && (
                            <Badge variant="outline" className="text-xs bg-[#f9fafc] text-[#6e7b96]">
                              {item.category}
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {filteredItems.filter((item) => item.type === "table").length === 0 && (
                  <div className="text-center py-12">
                    <Table2 className="h-10 w-10 text-[#dee6f5] mx-auto mb-3" />
                    <p className="text-[#6e7b96] font-medium">No matching tables found</p>
                    <p className="text-sm text-[#8098c4] mt-1">Try adjusting your search</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="charts" className="m-0 p-0 outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems
                    .filter((item) => item.type === "chart")
                    .map((item) => (
                      <Card
                        key={item.id}
                        className={cn(
                          "border cursor-pointer transition-all overflow-hidden",
                          item.selected
                            ? "border-[#004ce6] shadow-sm bg-[#fafcff]"
                            : "border-[#e1e8f6] hover:border-[#b3c9ef] hover:bg-[#fafbfd]",
                        )}
                        onClick={() => toggleSelection(item.id)}
                        role="checkbox"
                        aria-checked={item.selected}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            toggleSelection(item.id)
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-[#004ce6] mr-2">{getChartIcon(item)}</span>
                              <h5 className="text-sm font-medium text-[#001742] line-clamp-1">{item.title}</h5>
                            </div>
                            <div
                              className={cn(
                                "h-5 w-5 rounded-full flex items-center justify-center transition-colors",
                                item.selected ? "bg-[#004ce6]" : "border border-[#dee6f5] bg-white",
                              )}
                              aria-hidden="true"
                            >
                              {item.selected && <Check className="h-3 w-3 text-white" />}
                            </div>
                          </div>

                          <div className="aspect-video bg-[#f4f9ff] rounded-md flex items-center justify-center mb-3 overflow-hidden">
                            {renderChartPlaceholder(item)}
                          </div>

                          {item.description && (
                            <p className="text-xs text-[#6e7b96] mb-2 line-clamp-2">{item.description}</p>
                          )}

                          {item.category && (
                            <Badge variant="outline" className="text-xs bg-[#f9fafc] text-[#6e7b96]">
                              {item.category}
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {filteredItems.filter((item) => item.type === "chart").length === 0 && (
                  <div className="text-center py-12">
                    <BarChart2 className="h-10 w-10 text-[#dee6f5] mx-auto mb-3" />
                    <p className="text-[#6e7b96] font-medium">No matching charts found</p>
                    <p className="text-sm text-[#8098c4] mt-1">Try adjusting your search</p>
                  </div>
                )}
              </TabsContent>
            </ScrollArea>

            <div className="px-6 py-4 border-t border-[#f0f4fa] flex justify-between items-center">
              <div className="text-sm text-[#6e7b96]">
                <span className="font-medium text-[#004ce6]">{selectedCount}</span> item{selectedCount !== 1 ? "s" : ""}{" "}
                selected
              </div>
              <div className="flex gap-3">
                <DialogClose asChild>
                  <Button variant="outline" className="border-[#e1e8f6] text-[#4e5971] hover:bg-[#f9fafc]">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className="bg-[#004ce6] hover:bg-[#0047cb] text-white">
                    <span className="flex items-center">
                      Apply Selection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </DialogClose>
              </div>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      <div className="flex justify-end pt-4">
        <Button onClick={() => onSubmit(tablesAndCharts)} className="bg-[#004ce6] hover:bg-[#0047cb] text-white px-6">
          Continue
        </Button>
      </div>
    </div>
  )
}
