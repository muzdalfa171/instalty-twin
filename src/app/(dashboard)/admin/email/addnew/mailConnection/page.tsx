"use client";

import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

type ConnectionOption = "oauth" | "app_password";

export default function ConnectGoogleAccount() {
  const [selected, setSelected] = useState<ConnectionOption | null>("oauth");

  // Use these handlers to trigger real oAuth/App Password logic!
  const handleSelect = (option: ConnectionOption) => {
    setSelected(option);
    // Implement real connection logic here (e.g., redirect, popup, etc.)
    // Example: if (option === "oauth") startOAuthFlow();
  };

  return (
    <div className="max-w-3xl mx-auto min-h-[80vh] flex flex-col justify-center">
      {/* Back */}
      <div className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer mb-6 w-fit">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-2">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Select another provider</span>
      </div>

      <div className="mb-2 flex items-center">
        <img
          src="https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_48dp.png"
          alt="Gmail"
          className="w-8 h-8 mr-2"
        />
        <span className="text-2xl font-bold text-gray-800">Connect Your Google Account</span>
      </div>
      <div className="text-gray-400 font-semibold text-lg mb-10">Gmail / G-Suite</div>

      <h2 className="text-lg font-bold mb-4 text-center text-blue-600">Select a connection option</h2>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {/* Option 1: OAuth */}
        <button
          className={`flex-1 rounded-xl shadow transition border-2 ${
            selected === "oauth"
              ? "bg-blue-600 border-blue-600"
              : "bg-white border-gray-200 hover:border-blue-500"
          } flex flex-col items-start px-8 py-8 min-w-[260px] max-w-[340px] relative`}
          onClick={() => handleSelect("oauth")}
        >
          <div className="text-white text-lg font-bold mb-4">Option 1: oAuth</div>
          <ul className="space-y-4 mb-2">
            <li className="flex items-center">
              <FaCheckCircle className="mr-2 text-white text-xl" />
              <span className="text-white text-base font-medium">Easier to setup</span>
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="mr-2 text-white text-xl" />
              <span className="text-white text-base font-medium">More stable and less disconnects</span>
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="mr-2 text-white text-xl" />
              <span className="text-white text-base font-medium">Available for GSuite accounts</span>
            </li>
          </ul>
          <span className="absolute top-4 right-4 bg-white text-blue-600 text-xs px-3 py-1 rounded font-semibold">
            Recommended
          </span>
        </button>

        {/* Option 2: App Password */}
        <button
          className={`flex-1 rounded-xl shadow transition border-2 ${
            selected === "app_password"
              ? "bg-blue-100 border-blue-400"
              : "bg-white border-gray-200 hover:border-blue-500"
          } flex flex-col items-start px-8 py-8 min-w-[260px] max-w-[340px]`}
          onClick={() => handleSelect("app_password")}
        >
          <div className="text-blue-600 text-lg font-bold mb-4">Option 2: App Password</div>
          <ul className="space-y-4 mb-2">
            <li className="flex items-center">
              <FaCheckCircle className="mr-2 text-blue-600 text-xl" />
              <span className="text-blue-600 text-base font-medium">
                Available for personal accounts
              </span>
            </li>
            <li className="flex items-center">
              <FaExclamationCircle className="mr-2 text-yellow-400 text-xl" />
              <span className="text-blue-600 text-base font-medium">
                Requires 2-factor authentication
              </span>
            </li>
            <li className="flex items-center">
              <FaExclamationCircle className="mr-2 text-yellow-400 text-xl" />
              <span className="text-blue-600 text-base font-medium">
                More prone to disconnects
              </span>
            </li>
          </ul>
        </button>
      </div>

      {/* Example: You can show the selected option below */}
      <div className="mt-10 text-center">
        {selected === "oauth" && (
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => alert("Start OAuth Flow!")}
          >
            Connect with oAuth
          </button>
        )}
        {selected === "app_password" && (
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => alert("Start App Password Flow!")}
          >
            Connect with App Password
          </button>
        )}
      </div>
    </div>
  );
}
