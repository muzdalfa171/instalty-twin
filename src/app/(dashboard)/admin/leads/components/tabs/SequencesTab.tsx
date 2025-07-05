'use client';

import React, { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface Step {
  id: number;
  subject: string;
  content: string;
  variants?: Step[];
}

const SequencesTab: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, subject: '', content: '', variants: [] }
  ]);

  const addStep = useCallback(() => {
    const newStep = {
      id: steps.length + 1,
      subject: '',
      content: '',
      variants: []
    };
    setSteps(prev => [...prev, newStep]);
  }, [steps.length]);

  const addVariant = useCallback((stepId: number) => {
    setSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          variants: [...(step.variants || []), {
            id: (step.variants?.length || 0) + 1,
            subject: '',
            content: ''
          }]
        };
      }
      return step;
    }));
  }, []);

  const updateStep = useCallback((stepId: number, field: keyof Step, value: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, [field]: value } : step
    ));
  }, []);

  const handleSave = useCallback(() => {
    // Validate steps
    const hasEmptyFields = steps.some(step => !step.subject || !step.content);
    if (hasEmptyFields) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Sequence saved successfully');
    // Add API call here to save sequence
  }, [steps]);

  return (
    <div className="p-6">
      {steps.map((step, index) => (
        <div key={step.id} className="mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4 transition-shadow hover:shadow-md">
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                <span>Step {step.id}</span>
                {step.variants?.length ? (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {step.variants.length} variant{step.variants.length !== 1 ? 's' : ''}
                  </span>
                ) : null}
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-600">Subject</label>
                    <div className="text-gray-400 text-sm">
                      {step.subject ? `${step.subject.length}/100` : 'Your subject'}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={step.subject}
                    onChange={(e) => updateStep(step.id, 'subject', e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email subject..."
                    maxLength={100}
                  />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <textarea
                      value={step.content}
                      onChange={(e) => updateStep(step.id, 'content', e.target.value)}
                      placeholder="Start typing your message here..."
                      className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {step.variants?.map((variant) => (
              <div key={variant.id} className="ml-6 mt-4 p-4 border-l-2 border-blue-200">
                <div className="text-sm text-gray-500 mb-2">Variant {variant.id}</div>
                {/* Variant fields here */}
              </div>
            ))}

            <button
              onClick={() => addVariant(step.id)}
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
              </svg>
              Add variant
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addStep}
        className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 hover:text-blue-700 hover:border-blue-500 transition-all hover:bg-blue-50"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
        </svg>
        Add step
      </button>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Save
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <button className="tool-button group">
                <svg className="w-5 h-5 group-hover:text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="ml-2">AI Tools</span>
              </button>
              <button className="tool-button group">
                <svg className="w-5 h-5 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span className="ml-2">Templates</span>
              </button>
              <button className="tool-button group">
                <svg className="w-5 h-5 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="ml-2">Variables</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="tool-button group">
              <svg className="w-5 h-5 group-hover:text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="ml-2">Preview</span>
            </button>
            <button className="tool-button group">
              <svg className="w-5 h-5 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tool-button {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          color: #4B5563;
          border-radius: 0.375rem;
          transition: all 0.2s;
        }
        .tool-button:hover {
          background-color: #F3F4F6;
          color: #1F2937;
        }
      `}</style>
    </div>
  );
};

export default SequencesTab;
