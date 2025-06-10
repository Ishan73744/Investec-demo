"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertCircle, BarChart2, FileText, Home, LayoutDashboard, Plus, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SidebarNavigation() {
  const pathname = usePathname()

  // Define navigation items
  const navigationItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
      enabled: true,
    },
    {
      name: "Document Intelligence",
      href: "/document-intelligence",
      icon: FileText,
      enabled: true, // Now enabled
    },
    {
      name: "Report Generation",
      href: "/report-generation",
      icon: FileText,
      enabled: false,
    },
    {
      name: "Alerts",
      href: "/alerts",
      icon: AlertCircle,
      enabled: true,
    },
    {
      name: "Peer Comparison",
      href: "/peer-comparison",
      icon: BarChart2,
      enabled: false,
    },
    {
      name: "Workflows",
      href: "/",
      icon: LayoutDashboard,
      enabled: true,
    },
  ]

  return (
    <div className="w-60 flex flex-col h-full">
      {/* Logo in the sidebar */}
      <div className="flex h-14 items-center px-4">
        <Link href="/" className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WevD5CRwfUIoFQ2thWCC8TAuhncaYm.png"
            alt="Bynd Logo"
            width={80}
            height={24}
          />
        </Link>
      </div>
      <div className="p-4">
        <Button variant="outline" className="w-full justify-start gap-2 border-[#EAF0FC] text-[#004ce6]">
          <Plus className="h-4 w-4" />
          <span className="font-medium">New chat</span>
        </Button>
      </div>
      <nav className="space-y-1 px-2">
        {navigationItems.map((item) => {
          const isActive =
            (item.href === "/" && pathname === "/") || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.enabled ? item.href : "#"}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive ? "bg-white font-medium text-[#004ce6] shadow-sm" : "text-[#97abd1] hover:bg-[#f4f9ff]"
              } ${!item.enabled ? "opacity-60 cursor-not-allowed" : ""}`}
              style={isActive ? { boxShadow: "0 2px 4px rgba(0, 76, 230, 0.1)" } : {}}
              onClick={!item.enabled ? (e) => e.preventDefault() : undefined}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="mt-6 px-4 flex-1 overflow-y-auto">
        <h3 className="mb-2 text-sm font-medium text-[#4e5971]">Recent chats</h3>
        <div className="space-y-1">
          <Link href="#" className="block rounded-md px-3 py-2 text-sm text-[#97abd1] hover:bg-[#f4f9ff]">
            Global expansion feasability
          </Link>
          <Link href="#" className="block rounded-md px-3 py-2 text-sm text-[#97abd1] hover:bg-[#f4f9ff]">
            Pharma research
          </Link>
          <Link href="#" className="block rounded-md px-3 py-2 text-sm text-[#97abd1] hover:bg-[#f4f9ff]">
            Quick commerce Quarterly update
          </Link>
        </div>
      </div>

      {/* User profile at bottom */}
      <div className="border-t p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#e6edf9] overflow-hidden">
            <img src="/mystical-forest-spirit.png" alt="User avatar" />
          </div>
          <span className="text-sm font-medium text-[#4e5971]">Ishan Patel</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8098c4]">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
