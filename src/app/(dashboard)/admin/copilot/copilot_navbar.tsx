'use client';

import { ChevronDown, ChevronRight, PanelLeftClose } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MenuItem {
  id: string
  label: string
  hasSubmenu?: boolean
  submenuItems?: string[]
  path?: string
}

interface SecondarySidebarProps {
  activeIcon: string | null
  isCollapsed: boolean
  onToggleCollapse: () => void
}
const searchMenuItems: MenuItem[] = [
  { 
    id: "new-chat", 
    label: "New chat",
    path: "/admin/copilot/newchat"
  },
  { 
    id: "memory",
    label: "Memory",
    path: "/admin/copilot/memory"
  },
  { 
    id: "tasks", 
    label: "Tasks", 
    path: "/admin/copilot/tasks" 
  },
  { 
    id: "settings", 
    label: "Settings", 
    path: "/admin/copilot/settings" 
  }
]

const industryMenuItems: MenuItem[] = [
  { 
    id: "technology", 
    label: "Technology",
    hasSubmenu: true,
    submenuItems: ["Software Development", "Data Science", "Machine Learning"],
    path: "/admin/copilot/industry/technology"
  },
  { id: "healthcare", label: "Healthcare", path: "/admin/copilot/industry/healthcare" },
  { id: "finance", label: "Finance", path: "/admin/copilot/industry/finance" },
  { id: "retail", label: "Retail", path: "/admin/copilot/industry/retail" },
  { id: "manufacturing", label: "Manufacturing", path: "/admin/copilot/industry/manufacturing" },
]

export function SecondarySidebar({ activeIcon, isCollapsed, onToggleCollapse }: SecondarySidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const router = useRouter()

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => 
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  const handleItemClick = (item: MenuItem) => {
    if (item.id === "new-chat") {
      router.push(item.path || '')
      return
    }
    if (item.path) {
      router.push(item.path)
    }
    if (item.hasSubmenu) {
      toggleExpanded(item.id)
    }
  }

  const handleSubmenuClick = (parentPath: string, submenuItem: string) => {
    const path = `${parentPath}/${submenuItem.toLowerCase().replace(/\s+/g, '-')}`
    router.push(path)
  }

  const menuItems = activeIcon === "search" ? searchMenuItems : industryMenuItems

  if (isCollapsed) {
    return null
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">
          {activeIcon === "search" ? "Search Filters" : "Industry Categories"}
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse} 
          className="h-8 w-8" 
          title="Collapse sidebar"
        >
          <PanelLeftClose className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                  item.id === "new-chat" 
                    ? "bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                <span>{item.label}</span>
                {item.hasSubmenu && (
                  expandedItems.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )
                )}
              </button>

              {item.hasSubmenu && expandedItems.includes(item.id) && item.submenuItems && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenuItems.map((submenuItem) => (
                    <div 
                      key={submenuItem}
                      onClick={() => handleSubmenuClick(item.path || '', submenuItem)}
                      className="px-3 py-1 text-xs text-gray-500 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      {submenuItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
