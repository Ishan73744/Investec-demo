import { AlertCircle } from "lucide-react"

export default function PeerComparisonPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="flex flex-col items-center justify-center max-w-md text-center">
        <AlertCircle className="h-12 w-12 text-[#004ce6] mb-4" />
        <h1 className="text-2xl font-bold text-[#1a2b4b] mb-2">Peer Comparison Coming Soon</h1>
        <p className="text-[#4e5971] mb-6">
          We're working on building powerful peer comparison tools to help you analyze and benchmark against industry
          competitors.
        </p>
        <div className="w-full h-2 bg-[#e6edf9] rounded-full overflow-hidden">
          <div className="h-full bg-[#004ce6] rounded-full w-3/4"></div>
        </div>
        <p className="text-sm text-[#97abd1] mt-2">Development in progress: 75%</p>
      </div>
    </div>
  )
}
