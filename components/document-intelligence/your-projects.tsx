"use client"

import { useState } from "react"
import Image from "next/image"
import { DocumentPreviewModal } from "./document-preview-modal"

// Project interface
interface Project {
  id: string
  name: string
  description: string
  documents: number
  lastUpdated: string
  coverImage: string
}

// Sample projects data
const projects: Project[] = [
  {
    id: "1",
    name: "Quick Commerce Research",
    description: "Research on the quick commerce industry in India",
    documents: 12,
    lastUpdated: "2 days ago",
    coverImage: "/document-covers/zomato-annual-report.png",
  },
  {
    id: "2",
    name: "Pharmaceutical Industry Analysis",
    description: "Analysis of the pharmaceutical industry in India",
    documents: 8,
    lastUpdated: "1 week ago",
    coverImage: "/pharma-research-lab.png",
  },
  {
    id: "3",
    name: "Financial Markets Overview",
    description: "Overview of the financial markets in India",
    documents: 15,
    lastUpdated: "3 days ago",
    coverImage: "/banking-presentation-cover.png",
  },
  {
    id: "4",
    name: "Real Estate Market Research",
    description: "Research on the real estate market in India",
    documents: 6,
    lastUpdated: "2 weeks ago",
    coverImage: "/healthcare-abstract.png",
  },
]

export function YourProjects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [previewDocument, setPreviewDocument] = useState<{
    id: string
    title: string
    imageUrl: string
  } | null>(null)

  // Filter projects based on search query
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full p-6">
      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 rounded-lg border border-[#EAF0FC] focus:outline-none focus:ring-2 focus:ring-[#004ce6]"
        />
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* New project card */}
        <div className="bg-white border border-dashed border-[#EAF0FC] rounded-lg p-6 flex flex-col items-center justify-center h-64 hover:border-[#004ce6] transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-[#EAF0FC] flex items-center justify-center mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#004ce6]"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[#001742] mb-2">Create new project</h3>
          <p className="text-sm text-gray-500 text-center">Start a new research project</p>
        </div>

        {/* Project cards */}
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-[#EAF0FC] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-32 relative">
              <Image src={project.coverImage || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-[#001742] mb-1">{project.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{project.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{project.documents} documents</span>
                <span>Updated {project.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={previewDocument !== null}
        onClose={() => setPreviewDocument(null)}
        document={previewDocument}
      />
    </div>
  )
}
