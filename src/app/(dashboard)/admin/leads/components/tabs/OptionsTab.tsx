
import React, { useState } from "react";

// Reusable toggle buttons
function ToggleGroup({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-4 py-1.5 text-sm font-medium rounded-md ${
          enabled
            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }`}
      >
        Disable
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-4 py-1.5 text-sm font-medium rounded-md ${
          enabled
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Enable
      </button>
    </div>
  );
}

export default function CampaignSettings() {
  const [showAdvanced, setShowAdvanced] = useState(true);

  // Example state for toggles
  const [stopOnReply, setStopOnReply] = useState(true);
  const [openTracking, setOpenTracking] = useState(false);
  const [prioritizeNewLeads, setPrioritizeNewLeads] = useState(true);
  const [providerMatching, setProviderMatching] = useState(false);
  const [stopCompanyOnReply, setStopCompanyOnReply] = useState(true);

  // Example states for checkboxes/inputs (expand as needed)
  const [linkTracking, setLinkTracking] = useState(false);
  const [sendAsTextOnly, setSendAsTextOnly] = useState(false);
  const [sendFirstEmailText, setSendFirstEmailText] = useState(false);
  const [stopOnAutoReply, setStopOnAutoReply] = useState(false);
  const [unsubscribeHeader, setUnsubscribeHeader] = useState(false);
  const [enableRisky, setEnableRisky] = useState(false);
  const [disableBounce, setDisableBounce] = useState(false);

  // Example controlled input for daily limit
  const [dailyLimit, setDailyLimit] = useState(30);

  // Utility for advanced section toggle
  function handleToggleAdvanced() {
    setShowAdvanced((v) => !v);
  }

  return (
    <form className="w-full max-w-6xl mx-auto py-6">
      {/* Accounts to use */}
      <div className="mb-6 bg-white rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[15px] font-medium text-gray-900 mb-1">Accounts to use</h3>
            <p className="text-sm text-gray-500">Select one or more accounts to send emails from</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <select className="w-64 h-10 px-3 text-gray-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>Select...</option>
          </select>
          <a href="#" className="text-blue-500 text-sm hover:underline">
            Connect new email account
          </a>
        </div>
      </div>

      {/* Stop sending emails on reply */}
      <div className="mb-6 bg-white rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[15px] font-medium text-gray-900 mb-1">Stop sending emails on reply</h3>
            <p className="text-sm text-gray-500">Stop sending emails to a lead if a response has been received</p>
          </div>
          <ToggleGroup enabled={stopOnReply} onChange={setStopOnReply} />
        </div>
      </div>

      {/* Open Tracking */}
      <div className="mb-6 bg-white rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[15px] font-medium text-gray-900 mb-1">Open Tracking</h3>
            <p className="text-sm text-gray-500">Track email opens</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                id="linkTracking"
                checked={linkTracking}
                onChange={() => setLinkTracking((v) => !v)}
              />
              <label htmlFor="linkTracking" className="ml-2 text-sm text-gray-600">Link tracking</label>
            </div>
            <ToggleGroup enabled={openTracking} onChange={setOpenTracking} />
          </div>
        </div>
      </div>

      {/* Delivery Optimization */}
      <div className="mb-6 bg-white rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center mb-1">
              <h3 className="text-[15px] font-medium text-gray-900">Delivery Optimization</h3>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded">Recommended</span>
            </div>
            <p className="text-sm text-gray-500">Disables open tracking</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                id="textOnly"
                checked={sendAsTextOnly}
                onChange={() => setSendAsTextOnly((v) => !v)}
              />
              <label htmlFor="textOnly" className="ml-2 text-sm text-gray-600">Send emails as text-only (no HTML)</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                id="firstEmailText"
                checked={sendFirstEmailText}
                onChange={() => setSendFirstEmailText((v) => !v)}
              />
              <label htmlFor="firstEmailText" className="ml-2 text-sm text-gray-600">
                Send first email as text-only
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-800 rounded">Pro</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Limit */}
      <div className="mb-6 bg-white rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[15px] font-medium text-gray-900 mb-1">Daily Limit</h3>
            <p className="text-sm text-gray-500">Max number of emails to send per day for this campaign</p>
          </div>
          <input
            type="number"
            className="w-24 h-10 px-3 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={dailyLimit}
            min={1}
            onChange={(e) => setDailyLimit(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Hide/show advanced options */}
      <div className="text-center mb-8">
        <button
          type="button"
          className="text-gray-600 text-sm font-medium flex items-center mx-auto"
          onClick={handleToggleAdvanced}
        >
          {showAdvanced ? "Hide advanced options" : "Show advanced options"}
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform ${
              showAdvanced ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Advanced Options Section */}
      {showAdvanced && (
        <>
          {/* CRM */}
          <div className="mb-8">
            <h3 className="text-[15px] font-medium text-gray-900 mb-1">CRM</h3>
            <p className="text-sm text-gray-500 mb-6">Manage campaign ownership</p>
            <div className="bg-white rounded-lg border border-gray-100">
              <div className="p-6">
                <h4 className="text-[15px] font-medium text-gray-900 mb-1">Owner</h4>
                <p className="text-sm text-gray-500 mb-4">Select the owner of this campaign</p>
                <select className="w-full h-10 px-3 text-gray-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Julian Tillotson</option>
                </select>
              </div>
            </div>
          </div>

          {/* Custom Tags */}
          <div className="mb-8">
            <h3 className="text-[15px] font-medium text-gray-900 mb-1">Custom Tags</h3>
            <p className="text-sm text-gray-500 mb-6">Tags are used to group your campaigns</p>
            <div className="bg-white rounded-lg border border-gray-100">
              <div className="p-6">
                <select
                  className="w-full h-10 px-3 text-gray-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled selected>
                    Tags
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Sending Pattern */}
          <div className="mb-8">
            <h3 className="text-[15px] font-medium text-gray-900 mb-1">Sending Pattern</h3>
            <p className="text-sm text-gray-500 mb-6">Specify how you want your emails to go</p>
            <div className="bg-white rounded-lg border border-gray-100">
              <div className="p-6">
                <h4 className="text-[15px] font-medium text-gray-900 mb-4">Time gap between emails</h4>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Minimum time</label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="w-24 h-10 px-3 text-gray-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        defaultValue={9}
                      />
                      <span className="ml-2 text-sm text-gray-600">minutes</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Random additional time</label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="w-24 h-10 px-3 text-gray-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        defaultValue={5}
                      />
                      <span className="ml-2 text-sm text-gray-600">minutes</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-[15px] font-medium text-gray-900 mb-4">Max new leads</h4>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-32 h-10 px-3 text-gray-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="No limit"
                    />
                    <span className="ml-2 text-sm text-gray-600">per day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prioritize New Leads */}
          <div className="mb-6 bg-white rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-1">
                  Prioritize reaching out to new leads over scheduled follow-ups
                </h3>
              </div>
              <ToggleGroup enabled={prioritizeNewLeads} onChange={setPrioritizeNewLeads} />
            </div>
          </div>

          {/* Auto optimize A/Z Testing */}
          <div className="mb-6 bg-white rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-1">
                  Auto optimize A/Z Testing
                </h3>
                <p className="text-sm text-gray-500">
                  When using A/Z testing, the Instantly algorithm will automatically select the best performing variant after a certain number of emails have been sent.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-base">Choose winning metric</span>
              <select className="w-64 h-10 px-3 text-gray-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Select...</option>
              </select>
            </div>
          </div>

          {/* Provider Matching */}
          <div className="mb-6 bg-white rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-1">Provider Matching</h3>
                <p className="text-sm text-gray-500">
                  Matches your lead's email provider with your mailbox provider for boosted deliverability. (Outlook to Outlook, Google to Google, etc.)<br />
                  Configure custom rules for email sending based on email service providers
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  id="providerMatching"
                  checked={providerMatching}
                  onChange={() => setProviderMatching((v) => !v)}
                />
                <label htmlFor="providerMatching" className="ml-2 text-sm text-gray-600">Enable provider matching</label>
              </div>
              <ToggleGroup enabled={providerMatching} onChange={setProviderMatching} />
            </div>
          </div>

          {/* ESP Routing */}
          <div className="mb-6 bg-white rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-1">
                  ESP Routing
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded">New</span>
                </h3>
                <p className="text-sm text-gray-500">
                  Create rules to control email sending based on sender and recipient email service providers
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="px-4 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                + Add custom rule
              </button>
            </div>
          </div>

          {/* Stop Campaign for Company on Reply */}
          <div className="mb-6 bg-white rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-1">
                  Stop Campaign for Company on Reply
                </h3>
                <p className="text-sm text-gray-500">
                  Stops the campaign automatically for all leads from a company if a reply is received from any of them.
                </p>
              </div>
              <ToggleGroup enabled={stopCompanyOnReply} onChange={setStopCompanyOnReply} />
            </div>
          </div>

          {/* Stop Sending Emails on Auto-Reply */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-1">Stop Sending Emails on Auto-Reply</h3>
                <p className="text-sm text-gray-500">
                  Stop sending emails to a lead if an automatic response has been received, for example for out-of-office replies.
                </p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stopAutoReply"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                  checked={stopOnAutoReply}
                  onChange={() => setStopOnAutoReply((v) => !v)}
                />
                <label htmlFor="stopAutoReply" className="ml-2 text-sm text-gray-900">
                  Stop on auto-reply
                </label>
              </div>
            </div>
          </div>

          {/* Insert Unsubscribe Link Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-1">Insert Unsubscribe Link Header</h3>
                <p className="text-sm text-gray-500">
                  Automatically adds an unsubscribe link to email headers for one-click unsubscription by supported email providers
                </p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="unsubscribeHeader"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                  checked={unsubscribeHeader}
                  onChange={() => setUnsubscribeHeader((v) => !v)}
                />
                <label htmlFor="unsubscribeHeader" className="ml-2 text-sm text-gray-900">
                  Insert unsubscribe link header
                </label>
              </div>
            </div>
          </div>

          {/* Allow Risky Emails */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-1">Allow Risky Emails</h3>
                <p className="text-sm text-gray-500">
                  When using verification, allow emails that are marked as risky to be contacted; or disable BounceProtect to allow known risky emails to be contacted.
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableRisky"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                    checked={enableRisky}
                    onChange={() => setEnableRisky((v) => !v)}
                  />
                  <label htmlFor="enableRisky" className="ml-2 text-sm text-gray-900">
                    Enable risky emails
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="disableBounce"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                    checked={disableBounce}
                    onChange={() => setDisableBounce((v) => !v)}
                  />
                  <label htmlFor="disableBounce" className="ml-2 text-sm text-gray-900">
                    Disable BounceProtect
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* CC and BCC */}
          <div className="mb-8">
            <h3 className="text-[15px] font-medium text-gray-900 mb-1">CC and BCC</h3>
            <p className="text-sm text-gray-500 mb-6">Add CC and BCC recipients to all emails</p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-[15px] font-medium text-gray-900 mb-1">CC Recipients</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Send a copy of the email to the addresses listed in the field
                </p>
                <input
                  type="text"
                  className="w-full h-[72px] px-4 py-3 text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Separate emails with a comma"
                />
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-[15px] font-medium text-gray-900 mb-1">BCC Recipients</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Send a copy of the email to certain recipients without the other recipients knowing about it
                </p>
                <input
                  type="text"
                  className="w-full h-[72px] px-4 py-3 text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Separate emails with a comma"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Save and Launch Buttons */}
      <div className="flex space-x-3 justify-end">
        <button
          type="button"
          className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM19 19H5V5H16.17L19 7.83V19ZM12 12C10.34 12 9 13.34 9 15C9 16.66 10.34 18 12 18C13.66 18 15 16.66 15 15C15 13.34 13.66 12 12 12ZM6 6H15V10H6V6Z" fill="currentColor"/>
          </svg>
          Save
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96071 2.21071 5.46957 2 6 2H14ZM18 20V9H13V4H6V20H18Z" fill="currentColor"/>
          </svg>
          Launch
        </button>
      </div>
    </form>
  );
}
