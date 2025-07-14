'use client';

import React from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface EmailRowProps {
  email: string;
  emailsSent: string;
  warmUpEmails: string;
  healthScore: string;
}

const EmailRow = ({ email, emailsSent, warmUpEmails, healthScore }: EmailRowProps) => (
  <div className="flex items-center py-4 px-6 hover:bg-gray-50 rounded-lg">
    <input type="checkbox" className="mr-4 h-5 w-5 rounded border-gray-300" />
    <span className="flex-1 text-[15px] text-gray-900 font-medium">{email}</span>
    <span className="w-32 text-center text-gray-600">{emailsSent} of 30</span>
    <span className="w-32 text-center text-gray-600">{warmUpEmails}</span>
    <span className="w-32 text-center text-gray-600">{healthScore}</span>
    <div className="flex items-center space-x-2 w-20 justify-end">
      <button className="text-green-500 hover:text-green-600">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="text-gray-400 hover:text-gray-500">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
);

export default function EmailDashboard() {
  const emails = [
    { email: "julian@indirapapp.com", emailsSent: "0", warmUpEmails: "71", healthScore: "96%" },
    { email: "julian@indiraboost.com", emailsSent: "0", warmUpEmails: "69", healthScore: "100%" },
    { email: "julian@indirapco.com", emailsSent: "0", warmUpEmails: "73", healthScore: "99%" },
    { email: "julian@indiraconsult.com", emailsSent: "0", warmUpEmails: "68", healthScore: "99%" },
    { email: "julian@indiradigital.com", emailsSent: "0", warmUpEmails: "72", healthScore: "100%" },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-[280px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search.."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <span>All statuses</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link href="/admin/email/addnew" className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <span>+ Add New</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center py-4 px-6 border-b border-gray-100">
          <input type="checkbox" className="mr-4 h-5 w-5 rounded border-gray-300" />
          <span className="flex-1 text-xs font-semibold text-gray-500">EMAIL</span>
          <span className="w-32 text-center text-xs font-semibold text-gray-500">EMAILS SENT</span>
          <span className="w-32 text-center text-xs font-semibold text-gray-500">WARMUP EMAILS</span>
          <span className="w-32 text-center text-xs font-semibold text-gray-500">HEALTH SCORE</span>
          <span className="w-20"></span>
        </div>
        {emails.map((email, index) => (
          <EmailRow
            key={index}
            email={email.email}
            emailsSent={email.emailsSent}
            warmUpEmails={email.warmUpEmails}
            healthScore={email.healthScore}
          />
        ))}
      </div>
    </div>
  );
}