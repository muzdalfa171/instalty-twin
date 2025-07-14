'use client';

import React, { FormEvent, useState } from 'react';

const ImapSetup = () => {
  const [useSSL, setUseSSL] = useState(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      imapHost: formData.get('imap-host'),
      imapPort: formData.get('imap-port'),
      smtpHost: formData.get('smtp-host'),
      smtpPort: formData.get('smtp-port'),
      useSSL
    };

    try {
      // TODO: Implement your API call here
      console.log('Connecting IMAP account:', data);
    } catch (error) {
      console.error('Error connecting IMAP account:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connect IMAP/SMTP Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Add your email account using IMAP and SMTP settings
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900">IMAP Settings</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="imap-host" className="block text-sm font-medium text-gray-700">
                    IMAP Host
                  </label>
                  <input
                    id="imap-host"
                    name="imap-host"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="imap.example.com"
                  />
                </div>
                <div>
                  <label htmlFor="imap-port" className="block text-sm font-medium text-gray-700">
                    IMAP Port
                  </label>
                  <input
                    id="imap-port"
                    name="imap-port"
                    type="number"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={useSSL ? "993" : "143"}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900">SMTP Settings</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="smtp-host" className="block text-sm font-medium text-gray-700">
                    SMTP Host
                  </label>
                  <input
                    id="smtp-host"
                    name="smtp-host"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="smtp.example.com"
                  />
                </div>
                <div>
                  <label htmlFor="smtp-port" className="block text-sm font-medium text-gray-700">
                    SMTP Port
                  </label>
                  <input
                    id="smtp-port"
                    name="smtp-port"
                    type="number"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={useSSL ? "465" : "587"}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="use-ssl"
                name="use-ssl"
                type="checkbox"
                checked={useSSL}
                onChange={(e) => setUseSSL(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="use-ssl" className="ml-2 block text-sm text-gray-900">
                Use SSL/TLS
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Connect Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImapSetup; 