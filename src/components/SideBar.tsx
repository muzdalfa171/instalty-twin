'use client';

import React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Bot,
  MessageSquare,
  Users,
  Mail,
  Send as SendIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MainSidebarProps {
  activeIcon: string | null
  onIconClick: (icon: string) => void
}

const sidebarItems = [
  { id: "search", icon: Search, label: "Search", href: "/dashboard" },
  { id: "copilot", icon: Bot, label: "Copilot", href: "/admin/copilot" },
  { id: "campaign", icon: MessageSquare, label: "Campaign", href: "/admin/campaign" },
  { id: "leads", icon: Users, label: "Leads", href: "/admin/leads" },
  { id: "email", icon: Mail, label: "Email", href: "/admin/email" },
]

function MainSidebar({ activeIcon, onIconClick }: MainSidebarProps) {
  const router = useRouter();

  const handleClick = (item: typeof sidebarItems[0]) => {
    onIconClick(activeIcon === item.id ? "" : item.id);
    router.push(item.href);
  };

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon
        const isActive = activeIcon === item.id

        return (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              "hover:bg-gray-100",
              isActive && (item.id === "search" || item.id === "copilot")
                ? "bg-blue-100 text-blue-600"
                : isActive
                  ? "bg-gray-100 text-gray-700"
                  : "text-gray-500",
            )}
            title={item.label}
          >
            <Icon className="w-5 h-5" />
          </button>
        )
      })}
    </div>
  )
}

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeIcon, setActiveIcon] = React.useState<string | null>(null);

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 bg-white border-r fixed top-0 left-0 h-full flex flex-col items-center py-4 space-y-6 z-50">
        {/* Logo */}
        <div className="bg-blue-500 rounded-full p-2">
          <SendIcon className="w-6 h-6 text-white" />
        </div>

        <MainSidebar activeIcon={activeIcon} onIconClick={handleIconClick} />

        {/* Bottom User Icon */}
        <div className="mt-auto mb-4">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full text-sm font-bold">
            J
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="ml-16 flex-1 bg-gray-50">{children}</main>
    </div>
  );
};

export default SidebarLayout;
