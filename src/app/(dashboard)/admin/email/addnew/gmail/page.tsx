// "use client";
// import React, { useState } from "react";

// // TLD options
// const tlds = [
//   { id: ".com", label: ".com" },
//   { id: ".co", label: ".co" },
//   { id: ".org", label: ".org" },
// ];

// const DomainTabs: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"new" | "existing">("new");
//   const [searchNew, setSearchNew] = useState("");
//   const [searchExisting, setSearchExisting] = useState("");
//   const [checked, setChecked] = useState<{ [key: string]: boolean }>({
//     ".com": true,
//     ".co": true,
//     ".org": true,
//   });

//   return (
//     <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded">
//       {/* Back button */}
//       <div className="flex items-center mb-4">
//         <button
//           className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer"
//           type="button"
//         >
//           <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-1">
//             <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           <span className="text-sm">Back</span>
//         </button>
//       </div>

//       <hr className="mb-4" />

//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-4">
//         <button
//           onClick={() => setActiveTab("new")}
//           className={`mr-6 pb-2 text-lg font-semibold transition ${
//             activeTab === "new"
//               ? "text-blue-600 border-b-2 border-blue-600"
//               : "text-gray-700"
//           }`}
//           type="button"
//         >
//           New Domain
//         </button>
//         <button
//           onClick={() => setActiveTab("existing")}
//           className={`pb-2 text-lg font-semibold transition ${
//             activeTab === "existing"
//               ? "text-blue-600 border-b-2 border-blue-600"
//               : "text-gray-700"
//           }`}
//           type="button"
//         >
//           Existing Domains
//         </button>
//       </div>

//       {/* New Domain Tab */}
//       {activeTab === "new" && (
//         <div>
//           {/* Input */}
//           <div className="mb-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchNew}
//                 onChange={(e) => setSearchNew(e.target.value)}
//                 placeholder="Type your domain name to start"
//                 className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
//               />
//               {searchNew && (
//                 <button
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   onClick={() => setSearchNew("")}
//                   aria-label="Clear"
//                   type="button"
//                 >
//                   &#10006;
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* TLD checkboxes */}
//           <div className="flex space-x-6 mb-6">
//             {tlds.map((tld) => (
//               <label key={tld.id} className="flex items-center space-x-1">
//                 <input
//                   type="checkbox"
//                   checked={checked[tld.id]}
//                   onChange={() =>
//                     setChecked((prev) => ({
//                       ...prev,
//                       [tld.id]: !prev[tld.id],
//                     }))
//                   }
//                   className="accent-blue-600 w-4 h-4"
//                 />
//                 <span className="text-lg font-medium">{tld.label}</span>
//               </label>
//             ))}
//           </div>

//           {/* CSV upload */}
//           <div className="mb-2">
//             <a
//               href="#"
//               className="text-blue-600 font-medium hover:underline text-base"
//             >
//               Or upload a CSV
//             </a>
//           </div>
//           <div className="flex items-center text-gray-500 text-sm">
//             <svg
//               className="w-5 h-5 mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 4v16m8-8H4"
//               />
//             </svg>
//             <span>
//               Click here to download a CSV template
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Existing Domains Tab */}
//       {activeTab === "existing" && (
//         <div>
//           {/* Search box */}
//           <div className="mb-6">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchExisting}
//                 onChange={(e) => setSearchExisting(e.target.value)}
//                 placeholder="Search from existing domains"
//                 className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
//               />
//               {searchExisting && (
//                 <button
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   onClick={() => setSearchExisting("")}
//                   aria-label="Clear"
//                   type="button"
//                 >
//                   &#10006;
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Table header */}
//           <div className="flex items-center px-2 text-gray-500 font-semibold text-sm uppercase mb-2">
//             <div className="flex-1">Date</div>
//             <div className="flex-1">Domain</div>
//             <div className="flex-1">Account Type</div>
//           </div>
//           {/* No results */}
//           <div className="w-full text-center text-gray-400 mt-4 text-base font-medium">
//             No more results
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DomainTabs;



"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

// TLD options
const tlds = [
  { id: ".com", label: ".com" },
  { id: ".co", label: ".co" },
  { id: ".org", label: ".org" },
];

type DomainRecord = {
  id: string;
  domain: string;
  tld: string;
  date: Timestamp;
  accountType: string;
};

const DomainTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new");
  const [searchNew, setSearchNew] = useState("");
  const [searchExisting, setSearchExisting] = useState("");
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({
    ".com": true,
    ".co": true,
    ".org": true,
  });

  const [existingDomains, setExistingDomains] = useState<DomainRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch and listen to domains in Firestore
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "domains"),
      orderBy("date", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setExistingDomains(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<DomainRecord, "id">),
        }))
      );
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Handle add new domains (one for each checked TLD)
  const handleAddDomains = async () => {
    if (!searchNew.trim()) return;
    const toAdd = tlds.filter((t) => checked[t.id]);
    for (const tldObj of toAdd) {
      const domain = `${searchNew.trim()}${tldObj.id}`;
      // You can add more sophisticated uniqueness checks here if needed
      await addDoc(collection(db, "domains"), {
        domain,
        tld: tldObj.id,
        date: Timestamp.now(),
        accountType: "Default", // or ask user/type logic
      });
    }
    setSearchNew("");
  };

  // Filter existing domains
  const filteredDomains = existingDomains.filter((d) =>
    d.domain.toLowerCase().includes(searchExisting.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded">
      {/* Back button */}
      <div className="flex items-center mb-4">
        <button className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-1">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm">Back</span>
        </button>
      </div>

      <hr className="mb-4" />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("new")}
          className={`mr-6 pb-2 text-lg font-semibold transition ${
            activeTab === "new"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-700"
          }`}
          type="button"
        >
          New Domain
        </button>
        <button
          onClick={() => setActiveTab("existing")}
          className={`pb-2 text-lg font-semibold transition ${
            activeTab === "existing"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-700"
          }`}
          type="button"
        >
          Existing Domains
        </button>
      </div>

      {/* New Domain Tab */}
      {activeTab === "new" && (
        <div>
          {/* Input */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchNew}
                onChange={(e) => setSearchNew(e.target.value)}
                placeholder="Type your domain name to start"
                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
                onKeyDown={e => {
                  if (e.key === "Enter") handleAddDomains();
                }}
              />
              {searchNew && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setSearchNew("")}
                  aria-label="Clear"
                  type="button"
                >
                  &#10006;
                </button>
              )}
            </div>
          </div>

          {/* TLD checkboxes */}
          <div className="flex space-x-6 mb-6">
            {tlds.map((tld) => (
              <label key={tld.id} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={checked[tld.id]}
                  onChange={() =>
                    setChecked((prev) => ({
                      ...prev,
                      [tld.id]: !prev[tld.id],
                    }))
                  }
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-lg font-medium">{tld.label}</span>
              </label>
            ))}
          </div>

          {/* Add Button */}
          <button
            className="mb-4 px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
            onClick={handleAddDomains}
            disabled={!searchNew.trim() || !Object.values(checked).some(Boolean)}
          >
            Add Domain(s)
          </button>

          {/* CSV upload and download */}
          <div className="mb-2">
            <a
              href="#"
              className="text-blue-600 font-medium hover:underline text-base"
            >
              Or upload a CSV
            </a>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>
              Click here to download a CSV template
            </span>
          </div>
        </div>
      )}

      {/* Existing Domains Tab */}
      {activeTab === "existing" && (
        <div>
          {/* Search box */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchExisting}
                onChange={(e) => setSearchExisting(e.target.value)}
                placeholder="Search from existing domains"
                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
              />
              {searchExisting && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setSearchExisting("")}
                  aria-label="Clear"
                  type="button"
                >
                  &#10006;
                </button>
              )}
            </div>
          </div>

          {/* Table header */}
          <div className="flex items-center px-2 text-gray-500 font-semibold text-sm uppercase mb-2">
            <div className="flex-1">Date</div>
            <div className="flex-1">Domain</div>
            <div className="flex-1">Account Type</div>
          </div>
          {/* Table body */}
          {loading ? (
            <div className="w-full text-center text-gray-400 mt-4 text-base font-medium">
              Loading...
            </div>
          ) : filteredDomains.length === 0 ? (
            <div className="w-full text-center text-gray-400 mt-4 text-base font-medium">
              No more results
            </div>
          ) : (
            filteredDomains.map((d) => (
              <div
                key={d.id}
                className="flex items-center px-2 py-2 border-b text-gray-700 text-base"
              >
                <div className="flex-1">
                  {d.date.toDate().toLocaleDateString()}{" "}
                  {d.date.toDate().toLocaleTimeString()}
                </div>
                <div className="flex-1">{d.domain}</div>
                <div className="flex-1">{d.accountType}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DomainTabs;
