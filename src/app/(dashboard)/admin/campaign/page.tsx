'use client';

import React from 'react';
import { ChevronDown, MoreVertical, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation'; // ✅ Correct import for App Router

const CampaignsPage = () => {
  const router = useRouter();

  const campaigns = [
    {
      id: 1,
      name: "INDIRAP | Sales Teams",
      status: "Draft",
      progress: "-",
      sent: "-",
      click: "-",
      replied: "-",
      opportunities: "-"
    },
    {
      id: 2,
      name: "Tech Startups | Q4 2023",
      status: "Active",
      progress: "75%",
      sent: "450",
      click: "123",
      replied: "45",
      opportunities: "12"
    },
    {
      id: 3,
      name: "Enterprise | Decision Makers",
      status: "Paused",
      progress: "30%",
      sent: "200",
      click: "45",
      replied: "15",
      opportunities: "3"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black px-8 py-6">
      <h1 className="text-xl font-semibold mb-6">Campaigns</h1>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-3 py-2 text-sm w-60 shadow-sm"
          />

          <button className="flex items-center gap-1 border px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50">
            All statuses <ChevronDown size={16} />
          </button>

          <button className="flex items-center gap-1 border px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50">
            Newest first <ChevronDown size={16} />
          </button>
        </div>

        <button
          onClick={() => router.push('/admin/campaign/create')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          <Plus size={16} />
          Add New
        </button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white overflow-hidden">
        <div className="grid grid-cols-8 items-center gap-2 px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-600">
          <div className="flex items-center col-span-2">
            <input type="checkbox" className="mr-2" /> NAME
          </div>
          <div>STATUS</div>
          <div>PROGRESS</div>
          <div>SENT</div>
          <div>CLICK</div>
          <div>REPLIED</div>
          <div>OPPORTUNITIES</div>
        </div>

        {campaigns.map((campaign) => (
          <div key={campaign.id} className="grid grid-cols-8 items-center gap-2 px-4 py-4 hover:bg-gray-50 text-sm border-t">
            <div className="flex items-center font-medium text-gray-800 col-span-2">
              <input type="checkbox" className="mr-2" />
              {campaign.name}
            </div>
            <div>
              <span className={`text-white text-xs px-2 py-1 rounded-full ${
                campaign.status === 'Active' ? 'bg-green-600' :
                campaign.status === 'Paused' ? 'bg-yellow-600' :
                'bg-gray-800'
              }`}>
                {campaign.status}
              </span>
            </div>
            <div className="text-center">{campaign.progress}</div>
            <div className="text-center">{campaign.sent}</div>
            <div className="text-center">{campaign.click}</div>
            <div className="text-center">{campaign.replied}</div>
            <div className="text-center relative">
              {campaign.opportunities}
              <MoreVertical className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignsPage;
