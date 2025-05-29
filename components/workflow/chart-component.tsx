"use client"

interface ChartProps {
  type: string
  title: string
  data?: any[]
}

export function Chart({ type, title, data }: ChartProps) {
  console.log("Chart component rendering:", { type, title, data })

  // Fallback for when no data is provided
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-[#6e7b96]">No data available for this chart</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {type === "line" && (
        <div className="relative w-full h-full flex flex-col">
          <div className="text-sm font-medium text-[#001742] mb-2">{title}</div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 flex items-end">
                {data &&
                  data.map((item, i) => {
                    // Calculate height percentage based on the maximum value in the data
                    const maxValue = Math.max(...data.map((d) => d.value || d.industry || 0))
                    const heightPercent = ((item.value || item.industry || 0) / maxValue) * 80

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="relative h-full w-full flex items-end justify-center">
                          <div
                            className="w-[60%] bg-[#004ce6]/20 rounded-t-sm relative"
                            style={{ height: `${heightPercent}%` }}
                          >
                            <div
                              className="absolute bottom-0 left-0 right-0 bg-[#004ce6] rounded-t-sm"
                              style={{ height: "3px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className="h-6 flex">
                {data &&
                  data.map((item, i) => (
                    <div key={i} className="flex-1 text-center">
                      <div className="text-xs text-[#6e7b96] mt-1 truncate w-full">{item.year || i + 2020}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {type === "pie" && (
        <div className="w-full h-full flex flex-col">
          <div className="text-sm font-medium text-[#001742] mb-2">{title}</div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#eaf0fc" />
                <circle cx="50" cy="50" r="20" fill="white" />

                {/* Zepto slice - 28% */}
                <path d="M50,50 L50,5 A45,45 0 0,1 93.3,71.7 Z" fill="#004ce6" />

                {/* Swiggy Instamart slice - 25% */}
                <path d="M50,50 L93.3,71.7 A45,45 0 0,1 27.9,93.3 Z" fill="#21a265" />

                {/* Blinkit slice - 22% */}
                <path d="M50,50 L27.9,93.3 A45,45 0 0,1 6.7,28.3 Z" fill="#f59e0b" />

                {/* BigBasket Now slice - 13% */}
                <path d="M50,50 L6.7,28.3 A45,45 0 0,1 50,5 Z" fill="#8098c4" />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
            {data &&
              data.map((item, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: i === 0 ? "#004ce6" : i === 1 ? "#21a265" : i === 2 ? "#f59e0b" : "#8098c4",
                    }}
                  ></div>
                  <span className="text-xs text-[#001742]">
                    {item.company || `Category ${i + 1}`}: {item.share || item.capacity || 25 - i * 5}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {type === "bar" && (
        <div className="w-full h-full flex flex-col">
          <div className="text-sm font-medium text-[#001742] mb-2">{title}</div>
          <div className="flex-1 flex items-end justify-around pt-4">
            {data &&
              data.map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-16 bg-[#004ce6] rounded-t-sm"
                    style={{ height: `${Math.max(40, item.retention || 40 + i * 5)}px` }}
                  ></div>
                  <div className="text-xs text-[#6e7b96] mt-1">{item.delivery || `Group ${i + 1}`}</div>
                  <div className="text-xs font-medium text-[#001742] mt-0.5">{item.retention || 50 - i * 5}%</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
