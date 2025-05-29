import React from "react"
import Link from "next/link"

interface WorkflowHeaderProps {
  title: string
  breadcrumbs?: { label: string; href: string }[]
}

export function WorkflowHeader({ title, breadcrumbs = [] }: WorkflowHeaderProps) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-start">
        {breadcrumbs.length > 0 ? (
          <>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="mx-2 text-[#8098c4]">/</div>}
                <Link href={crumb.href} className="text-[#8098c4] hover:text-[#004ce6]">
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
            <div className="mx-2 text-[#8098c4]">/</div>
          </>
        ) : (
          <>
            <Link href="/" className="text-[#8098c4] hover:text-[#004ce6]">
              Workflows
            </Link>
            <div className="mx-2 text-[#8098c4]">/</div>
          </>
        )}
        <h1 className="text-lg font-semibold text-[#001742]">{title}</h1>
      </div>
    </div>
  )
}
