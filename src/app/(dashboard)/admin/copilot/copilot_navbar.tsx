'use client';

import { ChevronDown, ChevronRight, PanelLeftClose } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MenuItem {
  id: string
  label: string
  hasSubmenu?: boolean
}

interface SecondarySidebarProps {
  activeIcon: string | null
  onClose?: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const searchMenuItems: MenuItem[] = [
  { id: "new-chat", label: "New chat", hasSubmenu: false },
  { id: "memory", label: "Memory" },
  { id: "tasks", label: "Tasks" },
  { id: "settings", label: "Settings" },
]

const industryMenuItems: MenuItem[] = [
  { id: "technology", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finance", label: "Finance" },
  { id: "retail", label: "Retail" },
  { id: "manufacturing", label: "Manufacturing" },
]

export function SecondarySidebar({ activeIcon, onClose, isCollapsed, onToggleCollapse }: SecondarySidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["industry-keywords"])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const menuItems = activeIcon === "search" ? searchMenuItems : industryMenuItems

  // Don't render the sidebar at all when collapsed
  if (isCollapsed) {
    return null
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">
          {activeIcon === "search" ? "Search Filters" : "Industry Categories"}
        </h2>
        <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-8 w-8" title="Collapse sidebar">
          <PanelLeftClose className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => item.hasSubmenu && toggleExpanded(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-gray-100 text-gray-700",
                )}
              >
                <span>{item.label}</span>
                {item.hasSubmenu &&
                  (expandedItems.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  ))}
              </button>

              {item.hasSubmenu && expandedItems.includes(item.id) && (
                <div className="ml-4 mt-1 space-y-1">
                  <div className="px-3 py-1 text-xs text-gray-500 rounded-md hover:bg-gray-50 cursor-pointer">
                    Software Development
                  </div>
                  <div className="px-3 py-1 text-xs text-gray-500 rounded-md hover:bg-gray-50 cursor-pointer">
                    Data Science
                  </div>
                  <div className="px-3 py-1 text-xs text-gray-500 rounded-md hover:bg-gray-50 cursor-pointer">
                    Machine Learning
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
