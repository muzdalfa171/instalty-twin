'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Search, Filter, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { addLeadBatch, type Lead, type SupersearchMetadata } from '@/lib/leads';
import { toast } from 'sonner';

interface SearchFilters {
  industry?: string;
  location?: string;
  companySize?: string;
  role?: string;
}

const SupersearchPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    try {
      setIsLoading(true);
      // This is where you'd integrate with your actual search API
      const results = await mockSearchAPI(searchQuery, filters);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to perform search');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportSelected = async () => {
    if (!user) {
      toast.error('Please sign in to import leads');
      return;
    }

    if (selectedLeads.size === 0) {
      toast.error('Please select leads to import');
      return;
    }

    try {
      setIsLoading(true);
      const selectedResults = searchResults.filter(result => 
        selectedLeads.has(result.email)
      );

      const leads: Lead[] = selectedResults.map(result => ({
        email: result.email,
        name: result.name,
        company: result.company,
        source: 'supersearch',
        createdAt: new Date(),
        metadata: {
          searchQuery,
          filters,
        } as SupersearchMetadata,
      }));

      await addLeadBatch(leads, user.uid);
      toast.success(`${leads.length} leads imported successfully`);
      router.push('/admin/leads');
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import leads');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLeadSelection = (email: string) => {
    setSelectedLeads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(email)) {
        newSet.delete(email);
      } else {
        newSet.add(email);
      }
      return newSet;
    });
  };

  // Mock function - replace with actual API integration
  const mockSearchAPI = async (query: string, filters: SearchFilters) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return [
      {
        email: 'john@techcorp.com',
        name: 'John Tech',
        company: 'TechCorp',
        role: 'CTO',
        industry: 'Technology',
      },
      {
        email: 'sarah@innovate.io',
        name: 'Sarah Innovation',
        company: 'Innovate.io',
        role: 'CEO',
        industry: 'Startup',
      },
      // Add more mock results as needed
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="px-8 py-4">
          <div 
            className="flex items-center gap-2 mb-2 cursor-pointer" 
            onClick={() => router.back()}
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Supersearch</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company, role, or location..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
            >
              <Search size={20} />
              Search
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            <select
              value={filters.industry || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
              className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Industries</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
            </select>

            <select
              value={filters.companySize || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, companySize: e.target.value }))}
              className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201+">201+ employees</option>
            </select>

            <select
              value={filters.role || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
              className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Role</option>
              <option value="c-level">C-Level</option>
              <option value="vp">VP</option>
              <option value="director">Director</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Search Results ({searchResults.length})
              </h2>
              <button
                onClick={handleImportSelected}
                disabled={selectedLeads.size === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
              >
                Import Selected ({selectedLeads.size})
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedLeads.size === searchResults.length}
                        onChange={() => {
                          if (selectedLeads.size === searchResults.length) {
                            setSelectedLeads(new Set());
                          } else {
                            setSelectedLeads(new Set(searchResults.map(r => r.email)));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((result) => (
                    <tr key={result.email} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedLeads.has(result.email)}
                          onChange={() => toggleLeadSelection(result.email)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.name}</div>
                        <div className="text-sm text-gray-500">{result.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.industry}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : searchQuery && (
          <div className="text-center py-12 text-gray-500">
            No results found for your search
          </div>
        )}
      </div>
    </div>
  );
};

export default SupersearchPage; 