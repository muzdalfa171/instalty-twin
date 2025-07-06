'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { processCSVUpload, processSheetsImport } from '@/lib/leads';
import { toast } from 'sonner';

const AddLeadsPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleCSVUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length || !user) return;
    
    try {
      setIsLoading(true);
      const file = event.target.files[0];
      await processCSVUpload(file, user.uid, (progress) => setUploadProgress(progress));
      toast.success('CSV file processed successfully');
      router.push('/admin/leads');
    } catch (error) {
      console.error('Error processing CSV:', error);
      toast.error('Failed to process CSV file');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  }, [user, router]);

  const handleOptionClick = async (option: string) => {
    if (!user) {
      toast.error('Please sign in to add leads');
      return;
    }

    switch (option) {
      case 'csv':
        // Trigger file input click
        document.getElementById('csvFileInput')?.click();
        break;
      
      case 'supersearch':
        router.push('/admin/leads/supersearch');
        break;
      
      case 'manual':
        router.push('/admin/leads/manual');
        break;
      
      case 'sheets':
        try {
          setIsLoading(true);
          // This is a placeholder - you'll need to implement Google Sheets OAuth flow
          await processSheetsImport('sheet_id', user.uid);
          toast.success('Google Sheets import completed');
          router.push('/admin/leads');
        } catch (error) {
          console.error('Error importing from sheets:', error);
          toast.error('Failed to import from Google Sheets');
        } finally {
          setIsLoading(false);
        }
        break;
    }
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
            <span className="text-sm font-medium">Add Leads</span>
          </div>
        </div>
      </div>

      {/* Hidden file input for CSV upload */}
      <input
        type="file"
        id="csvFileInput"
        accept=".csv"
        className="hidden"
        onChange={handleCSVUpload}
      />

      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Choose how you want to add leads
        </h1>

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center gap-3">
                <Loader2 className="animate-spin" />
                <span>Processing... {uploadProgress > 0 ? `${uploadProgress}%` : ''}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* CSV Upload Option */}
          <div 
            onClick={() => handleOptionClick('csv')}
            className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Upload CSV</h3>
                <p className="text-gray-500">Import leads from a CSV file</p>
              </div>
            </div>
          </div>

          {/* Supersearch Option */}
          <div 
            onClick={() => handleOptionClick('supersearch')}
            className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">From Supersearch</h3>
                <p className="text-gray-500">Find leads using our advanced search</p>
              </div>
            </div>
          </div>

          {/* Manual Entry Option */}
          <div 
            onClick={() => handleOptionClick('manual')}
            className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Enter Manually</h3>
                <p className="text-gray-500">Add leads one by one</p>
              </div>
            </div>
          </div>

          {/* Google Sheets Option */}
          <div 
            onClick={() => handleOptionClick('sheets')}
            className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Use Google Sheets</h3>
                <p className="text-gray-500">Import leads from Google Sheets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeadsPage; 