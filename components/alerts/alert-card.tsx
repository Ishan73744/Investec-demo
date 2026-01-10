interface AlertCardProps {
  title: string
  description: string
  requiredInputs: string
}

export function AlertCard({ title, description, requiredInputs }: AlertCardProps) {
  const formatDescription = (desc: string) => {
    return desc.split("**").map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part))
  }

  return (
    <div className="border border-[#e1e8f6] rounded-lg p-6 hover:shadow-sm transition-shadow duration-200 bg-white">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#001742] mb-3 leading-tight">{title}</h3>
        <p className="text-[#9babc7] text-sm leading-relaxed">{formatDescription(description)}</p>
      </div>

      <div className="flex items-center gap-2 text-[#9babc7] text-sm">
        <span>Required inputs:</span>
        <span className="text-[#001742]">
          {requiredInputs.startsWith("• ") ? requiredInputs.substring(2) : requiredInputs}
        </span>
      </div>
    </div>
  )
}
