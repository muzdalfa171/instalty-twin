import React from "react";

const DashboardPage = () => {
  return (
    <div className=" p-6 bg-white min-h-screen">
      {/* Top Navbar Controls */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <div className="relative w-64">
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Filter Dropdown */}
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
            </svg>
            All statuses
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Add New Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold">
            + Add New
          </button>
        </div>
      </div>

      {/* Table Headings */}
      <div className="w-full">
        <div className="grid grid-cols-5 items-center text-xs font-semibold text-gray-600 uppercase px-2 py-3 border-b">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>Email</span>
          </div>
          <div>Emails Sent</div>
          <div>Warmup Emails</div>
          <div className="flex items-center gap-1">
            Health Score
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <div></div> {/* spacer for possible action buttons */}
        </div>

        {/* No Results Message */}
        <div className="text-center text-gray-300 text-lg font-semibold py-20">
          No results found
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
