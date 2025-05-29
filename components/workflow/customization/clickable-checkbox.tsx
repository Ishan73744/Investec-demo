"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface ClickableCheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export function ClickableCheckbox({ id, label, checked, onChange, className }: ClickableCheckboxProps) {
  return (
    <div
      className={cn(
        "flex items-center border rounded-md p-3 cursor-pointer transition-all",
        checked
          ? "bg-blue-50/50 border-blue-200 shadow-sm"
          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50",
        className,
      )}
      onClick={() => onChange(!checked)}
    >
      <div className="flex items-center flex-1">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(checked) => onChange(checked === true)}
          className="border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
        <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer flex-1">
          {label}
        </label>
      </div>
    </div>
  )
}
