'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { addSingleLead, type Lead } from '@/lib/leads';
import { toast } from 'sonner';

const ManualLeadEntry: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to add leads');
      return;
    }

    try {
      setIsLoading(true);
      const lead: Lead = {
        ...formData,
        source: 'manual',
        createdAt: new Date(),
      };

      await addSingleLead(lead, user.uid);
      toast.success('Lead added successfully');
      router.push('/admin/leads');
    } catch (error) {
      console.error('Error adding lead:', error);
      toast.error('Failed to add lead');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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
            <span className="text-sm font-medium">Manual Lead Entry</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Enter Lead Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Acme Inc."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.email}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isLoading || !formData.email
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Adding Lead...' : 'Add Lead'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManualLeadEntry; 