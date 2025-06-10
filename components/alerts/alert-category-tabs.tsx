"use client"

interface AlertCategoryTabsProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function AlertCategoryTabs({ categories, selectedCategory, onSelectCategory }: AlertCategoryTabsProps) {
  return (
    <div className="mb-8">
      <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`whitespace-nowrap py-2 px-1 font-medium text-base transition-colors duration-150 ${
              selectedCategory === category ? "text-[#001742]" : "text-[#9babc7] hover:text-[#001742]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
