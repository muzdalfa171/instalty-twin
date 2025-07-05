'use client';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
   
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
