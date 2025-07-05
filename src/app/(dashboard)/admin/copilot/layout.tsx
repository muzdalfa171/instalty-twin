'use client';

import { SecondarySidebar } from './copilot_navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <SecondarySidebar activeIcon="search" isCollapsed={false} onToggleCollapse={() => {}} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
