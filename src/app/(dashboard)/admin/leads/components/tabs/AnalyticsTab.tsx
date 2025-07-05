'use client';

import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  tooltip?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, suffix = '', tooltip }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm">{title}</span>
        {tooltip && (
          <button className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-semibold">{value}</span>
        {suffix && <span className="ml-2 text-gray-500 text-sm">{suffix}</span>}
      </div>
    </div>
  );
};

const AnalyticsTab: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">Draft</div>
          <div className="bg-green-100 w-24 h-2 rounded-full">
            <div className="bg-green-500 w-full h-full rounded-full"></div>
          </div>
          <span className="text-sm text-gray-600">100%</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
          <select className="border rounded-md px-3 py-1.5 text-sm text-gray-600">
            <option>Last 4 weeks</option>
            <option>Last week</option>
            <option>Last month</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        <MetricCard title="Sequence started" value="-" tooltip="Help text" />
        <MetricCard title="Open rate" value="0" suffix="-" tooltip="Help text" />
        <MetricCard title="Click rate" value="0" suffix="-" tooltip="Help text" />
        <MetricCard title="Opportunities" value="0" suffix="$0" tooltip="Help text" />
        <MetricCard title="Conversions" value="0" suffix="$0" tooltip="Help text" />
      </div>

      <div className="bg-white rounded-lg p-8 text-center text-gray-500">
        No data available for specified time
      </div>
    </div>
  );
};

export default AnalyticsTab;
