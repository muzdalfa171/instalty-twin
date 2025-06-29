'use client';

import SidebarLayout from '@/components/SideBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarLayout>
        {/* Main Content */}
        <main className="min-h-screen">
          {/* Header */}
          <header className="fixed z-10 w-full h-16 bg-white shadow-sm flex items-center px-6">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </header>
          
          {/* Page Content */}
          <div className="pt-16">
            {children}
          </div>
        </main>
      </SidebarLayout>
    </div>
  );
} 
