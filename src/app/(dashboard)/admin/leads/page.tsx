'use client';

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import LeadsTab from "./components/tabs/LeadsTab";
import AnalyticsTab from "./components/tabs/AnalyticsTab";
import SequencesTab from "./components/tabs/SequencesTab";
import ScheduleTab from "./components/tabs/ScheduleTab";
import OptionsTab from "./components/tabs/OptionsTab";
import Tabs from "./components/Tabs";

const tabLabels = ["Analytics", "Leads", "Sequences", "Schedule", "Options"];

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

const DashboardContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignName = searchParams.get('name') || 'Untitled Campaign';
  const [activeTab, setActiveTab] = useState("Leads");

  const renderTab = () => {
    switch (activeTab) {
      case "Analytics":
        return <AnalyticsTab />;
      case "Leads":
        return <LeadsTab />;
      case "Sequences":
        return <SequencesTab />;
      case "Schedule":
        return <ScheduleTab />;
      case "Options":
        return <OptionsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with campaign name */}
      <div className="border-b">
        <div className="px-8 py-4">
          <div className="flex items-center gap-2 mb-2 cursor-pointer" onClick={() => router.back()}>
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">{campaignName}</span>
          </div>
          <div className="flex justify-between items-center">
            <Tabs tabs={tabLabels} activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex items-center gap-4">
           
              <button 
                onClick={() => {
                  // Add resume campaign logic here
                  console.log('Resuming campaign...');
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 transition"
              >
                <span className="text-base">▶</span>
                Resume campaign
              </button>
           
              <div className="relative">
                <button 
                  onClick={() => {
                    const menu = document.getElementById('campaign-menu');
                    menu?.classList.toggle('hidden');
                  }}
                  className="p-2 text-gray-600 hover:text-gray-800 rounded-md"
                >
                  <span className="text-xl">⋯</span>
                </button>
                <div 
                  id="campaign-menu"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10"
                >
                  <div className="py-1">
                    <button 
                      onClick={() => {
                        // Add share campaign logic here
                        console.log('Sharing campaign...');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Share Campaign
                    </button>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-8 py-6">
        {renderTab()}
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardContent />
    </Suspense>
  );
};

export default DashboardPage;
