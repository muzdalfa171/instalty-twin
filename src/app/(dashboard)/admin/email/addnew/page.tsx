import React from "react";
import Link from "next/link";

const GoogleIcon = () => (
  // Google "G" logo SVG
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <g>
      <path d="M44.5 20H24v8.5h11.7C34.6 33.4 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l6.5-6.5C34.3 6 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.8-8 19.8-20 0-1.3-.1-2.7-.3-4z" fill="#FFC107"/>
      <path d="M6.3 14.7l7 5.1C15.6 16.6 19.5 14 24 14c3 0 5.7 1.1 7.8 2.9l6.5-6.5C34.3 6 29.4 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z" fill="#FF3D00"/>
      <path d="M24 44c5.3 0 10.1-1.8 13.8-5.1l-6.4-5.3C29.8 36 27.1 37 24 37c-5.8 0-10.6-3.6-12.4-8.5l-7 5.4C6.4 39.6 14.3 44 24 44z" fill="#4CAF50"/>
      <path d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 6.5-11.7 6.5-5.8 0-10.7-4.7-10.7-10.5S18.2 14 24 14c3 0 5.6 1 7.8 2.8l6.5-6.5C34.3 6 29.4 4 24 4c-7.7 0-14.3 4.3-17.7 10.7l7 5.1C15.6 16.6 19.5 14 24 14c3 0 5.7 1.1 7.8 2.9l6.5-6.5C34.3 6 29.4 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z" fill="none"/>
    </g>
  </svg>
);

const OutlookIcon = () => (
  // Microsoft Outlook/Office "O" logo SVG (blue grid)
  <svg className="w-5 h-5 mr-2" viewBox="0 0 32 32">
    <rect x="2" y="6" width="10" height="10" fill="#F25022"/>
    <rect x="2" y="16" width="10" height="10" fill="#7FBA00"/>
    <rect x="12" y="6" width="10" height="10" fill="#00A4EF"/>
    <rect x="12" y="16" width="10" height="10" fill="#FFB900"/>
  </svg>
);

const EnvelopeIcon = () => (
  // Simple envelope SVG for IMAP/SMTP
  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" />
    <path d="M3 7l9 6 9-6" stroke="currentColor" />
  </svg>
);

const ProBadge = () => (
  <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">Pro</span>
);

const AccountOptions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      {/* Cards container */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center">
        {/* Pre-warmed accounts */}
        <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 shadow p-8 flex flex-col">
          <h3 className="text-xl text-black font-semibold mb-4">Pre-warmed accounts</h3>
          <ul className="space-y-2 text-gray-700 flex-1">
            <li>✔️ Pre-Made Accounts &amp; Domains</li>
            <li>✔️ Start Sending Right away</li>
            <li>✔️ No Setup Required</li>
            <li>✔️ Scale existing campaigns Instantly</li>
            <li>✔️ High-quality US IP Accounts</li>
            <li>✔️ Deliverability Optimized</li>
            <li className="flex items-center">
              ✔️ Added to the premium warmup pool
              <ProBadge />
            </li>
          </ul>
          <div className="mt-8 text-gray-500 text-sm">21 days until next batch drop</div>
          <button
            className="mt-4 bg-blue-500 text-white font-semibold py-2 rounded-lg w-full cursor-not-allowed opacity-70"
            disabled
          >
            Sold Out
          </button>
        </div>

        {/* Done-for-you Email Setup */}
        <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 shadow p-8 flex flex-col">
          <h3 className="text-xl text-black font-semibold mb-4">Done-for-you Email Setup</h3>
          <ul className="space-y-2 text-gray-700 flex-1">
            <li>✔️ We Set Up Your Accounts</li>
            <li>✔️ You Choose The Domain &amp; Account Names</li>
            <li>✔️ Automatic reconnects</li>
            <li>✔️ Save time and money</li>
            <li>✔️ High-quality US IP accounts</li>
            <li>✔️ Deliverability Optimized</li>
            <li className="flex items-center">
              ✔️ Added to the premium warmup pool
              <ProBadge />
            </li>
          </ul>
          <div className="mt-8">
            <Link href="/admin/email/addnew/gmail" className="flex items-center bg-gray-100 rounded px-3 py-2 w-max">
              <GoogleIcon />
              <span className="font-semibold text-gray-700">Gmail / G-Suite</span>
            </Link>
          </div>
        </div>

        {/* Connect existing accounts */}
        <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 shadow p-8 flex flex-col">
          <h3 className="text-xl text-black font-semibold mb-4">Connect existing accounts</h3>
          <ul className="space-y-2 text-gray-700 mb-6 flex-1">
            <li>✔️ Connect any IMAP or SMTP email provider</li>
            <li>✔️ Sync up replies in the Unibox</li>
          </ul>
          <div className="space-y-3 mt-auto">
            <Link href="/admin/email/addnew/mailConnection" className="flex items-center bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded px-3 py-2 w-full">
              <GoogleIcon />
              <span className="font-semibold text-gray-700">Gmail / G-Suite</span>
            </Link>
            <Link href="/admin/email/addnew/outlook" className="flex items-center bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded px-3 py-2 w-full">
              <OutlookIcon />
              <span className="font-semibold text-gray-700">Office 365 / Outlook</span>
            </Link>
            <Link href="/admin/email/addnew/imap" className="flex items-center bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded px-3 py-2 w-full">
              <EnvelopeIcon />
              <span className="font-semibold text-gray-700">IMAP / SMTP</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOptions;
