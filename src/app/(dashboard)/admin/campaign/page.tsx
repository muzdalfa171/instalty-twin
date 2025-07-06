'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, MoreVertical, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Campaign {
  id: string;
  name: string;
  status: string;
  progress: string;
  sent: string | number;
  click: string | number;
  replied: string | number;
  opportunities: string | number;
  createdAt: Date;
}

const CampaignsPage = () => {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsRef = collection(db, 'campaigns');
        const q = query(campaignsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const campaignsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Ensure all fields have values even if they're missing in Firestore
          status: doc.data().status || 'Draft',
          progress: doc.data().progress || '0%',
          sent: doc.data().sent || '-',
          click: doc.data().click || '-',
          replied: doc.data().replied || '-',
          opportunities: doc.data().opportunities || '-'
        })) as Campaign[];

        setCampaigns(campaignsData);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

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

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No campaigns found</div>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="grid grid-cols-8 items-center gap-2 px-4 py-4 hover:bg-gray-50 text-sm border-t">
              <div className="flex items-center font-medium text-gray-800 col-span-2">
                <input type="checkbox" className="mr-2" />
                <span 
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => router.push(`/admin/leads?name=${encodeURIComponent(campaign.name)}`)}
                >
                  {campaign.name}
                </span>
              </div>
              <div>
                <span className={`text-white text-xs px-2 py-1 rounded-full ${
                  campaign.status.toLowerCase() === 'active' ? 'bg-green-600' :
                  campaign.status.toLowerCase() === 'paused' ? 'bg-yellow-600' :
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
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
