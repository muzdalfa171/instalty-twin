'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { createCampaign } from '@/lib/campaign';
import toast from 'react-hot-toast';

const CreateCampaign = () => {
  const router = useRouter();
  const [campaignName, setCampaignName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!campaignName.trim()) {
      setError('Please enter a campaign name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await createCampaign({
        name: campaignName.trim(),
        status: 'draft',
      });

      if (result.success) {
        toast.success('Campaign created successfully!', {
          duration: 3000,
          position: 'top-center',
        });
        return result;
      }
    } catch (err) {
      setError('Failed to create campaign. Please try again.');
      toast.error('Failed to create campaign. Please try again.');
      console.error('Error creating campaign:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 sm:p-10 bg-white text-black">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => router.back()}>
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">Back</span>
      </div>

      {/* Centered Form */}
      <div className="max-w-xl w-full mx-auto text-center">
        <h1 className="text-2xl font-semibold mb-2">Let&apos;s create a new campaign</h1>
        <p className="text-sm text-gray-500 mb-10">What would you like to name it?</p>

        <div className="text-left mb-6">
          <label htmlFor="campaign-name" className="text-sm font-medium text-gray-700 block mb-2">
            Campaign Name
          </label>
          <input
            id="campaign-name"
            type="text"
            value={campaignName}
            onChange={(e) => {
              setCampaignName(e.target.value);
              setError(null);
            }}
            placeholder="Enter campaign name"
            className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm`}
            disabled={isLoading}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 text-sm font-medium hover:underline"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              const result = await handleContinue();
              if (result?.success) {
                router.push(`/admin/leads?name=${encodeURIComponent(campaignName)}`);
              }
            }}
            disabled={isLoading}
            className={`${
              isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white text-sm font-medium px-6 py-2 rounded shadow flex items-center gap-2`}
          >
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating...
              </>
            ) : (
              'Continue >'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
