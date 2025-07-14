import React from "react";

export default function AiDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Centered Content */}
      <div className="w-full flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-800">
          What can I help with?
        </h1>

        {/* Main Input Box */}
        <div className="w-full max-w-xl bg-white rounded-xl shadow-md border border-gray-100 flex flex-col items-stretch mb-4">
          <div className="p-6 flex flex-col">
            <input
              className="bg-transparent text-gray-700 text-base placeholder-gray-400 outline-none"
              placeholder="Ask Instantly AI or type / to see prompts..."
              disabled
            />
          </div>
          <div className="flex items-center justify-between px-6 pb-6">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs rounded bg-gray-50 border border-gray-200 text-slate-500 hover:bg-gray-100 transition">
              <span role="img" aria-label="rocket">🚀</span> WARP Mode
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded hover:bg-gray-100 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405M19 13V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h5"></path></svg>
              </button>
              <button className="p-2 rounded bg-gradient-to-br from-[#9058ff] to-[#7fdbff] text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Prompt Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <PromptBtn icon="🕵️‍♂️" text="Find Ideal Prospects" />
          <PromptBtn icon="📊" text="Generate a Full Campaign" />
          <PromptBtn icon="✏️" text="Write a Sequence" />
          <PromptBtn icon="💡" text="Campaign Ideas" />
          <PromptBtn icon="📅" text="Weekly Analytics" />
          <PromptBtn icon="🏆" text="Best Performing Campaigns" />
          <PromptBtn icon="💬" text="Get Advice" />
          <PromptBtn icon="🧾" text="Audit My Workspace" />
        </div>
      </div>
    </div>
  );
}

// Helper for Prompt Buttons
function PromptBtn({ icon, text }: { icon: string; text: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-blue-50 transition text-slate-600 text-sm shadow-sm">
      <span className="text-lg">{icon}</span> {text}
    </button>
  );
}
