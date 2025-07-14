// pages/MemoryPage.js
import { Globe, FileText } from 'lucide-react';
import Link from 'next/link';

export default function MemoryPage() {
  return (
    <div className="flex flex-col h-full p-10 bg-gray-50 w-full">
      <h2 className="text-2xl font-semibold mb-6">Memory</h2>
      <p className="text-gray-600 mb-10 max-w-xl">
        Instantly Copilot can use your business details to provide context-aware responses.
      </p>

      <div className="flex gap-6 flex-wrap">
        <Card
          icon={<Globe className="w-6 h-6 text-blue-500" />}
          title="Read my website"
          description="We can pre-fill your business details with the content of your website."
        />
        <Card
          icon={<FileText className="w-6 h-6 text-blue-500" />}
          title="Read a PDF or text file"
          description="We can pre-fill your business details with the content of your text file or PDF."
        />
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Link href="/edit-manually" className="text-sm text-blue-600 hover:underline">
          Edit manually
        </Link>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
          Skip to chat
        </button>
      </div>
    </div>
  );
}

function Card({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white shadow-sm border rounded-lg p-6 w-80 space-y-3">
      {icon}
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
