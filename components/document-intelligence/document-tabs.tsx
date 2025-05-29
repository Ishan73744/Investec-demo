"use client"
import Link from "next/link"

interface DocumentTabsProps {
  activeTab: string
}

export function DocumentTabs({ activeTab }: DocumentTabsProps) {
  return (
    <div className="border-b border-[#EAF0FC] mb-3">
      {" "}
      {/* Changed mb-6 to mb-3 (12px) */}
      <div className="flex space-x-8">
        <Link
          href="/document-intelligence"
          className={`flex items-center pb-4 ${
            activeTab === "discover" ? "text-[#004ce6] border-b-4 border-[#004ce6] font-medium" : "text-[#9BABC7]"
          }`}
        >
          <svg
            className="mr-2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke={activeTab === "discover" ? "#004ce6" : "#9BABC7"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke={activeTab === "discover" ? "#004ce6" : "#9BABC7"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Discover documents
        </Link>
        <Link
          href="/document-intelligence/projects"
          className={`flex items-center pb-4 ${
            activeTab === "projects" ? "text-[#004ce6] border-b-4 border-[#004ce6] font-medium" : "text-[#9BABC7]"
          }`}
        >
          <svg
            className="mr-2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H21M3 12H21M3 18H21"
              stroke={activeTab === "projects" ? "#004ce6" : "#9BABC7"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Your projects
        </Link>
      </div>
    </div>
  )
}
