'use client';

import React, { useState } from 'react';

interface Schedule {
  name: string;
  startTime: string;
  endTime: string;
  timezone: string;
  days: {
    [key: string]: boolean;
  };
}

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const TIMEZONES = [
  'Eastern Time (US & Canada) (UTC-04:00)',
  'Central Time (US & Canada) (UTC-05:00)',
  'Mountain Time (US & Canada) (UTC-06:00)',
  'Pacific Time (US & Canada) (UTC-07:00)',
];

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute} ${period}`;
});

const ScheduleTab: React.FC = () => {
  const [schedule, setSchedule] = useState<Schedule>({
    name: 'New schedule',
    startTime: '9:00 AM',
    endTime: '6:00 PM',
    timezone: 'Eastern Time (US & Canada) (UTC-04:00)',
    days: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false,
    },
  });

  const handleDayToggle = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: !prev.days[day],
      },
    }));
  };

  const handleInputChange = (field: keyof Schedule, value: string) => {
    setSchedule(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="space-y-8">
        {/* Schedule Info Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Start</span>
              <span className="font-medium text-blue-600">Now</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>End</span>
              <span className="text-gray-500">No end date</span>
            </div>
          </div>

          {/* Schedule Name */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-2">Schedule Name</h3>
            <input
              type="text"
              value={schedule.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New schedule"
            />
          </div>

          {/* Timing Section */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Timing</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">From</label>
                <select
                  value={schedule.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {TIME_OPTIONS.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">To</label>
                <select
                  value={schedule.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {TIME_OPTIONS.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Timezone</label>
                <select
                  value={schedule.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {TIMEZONES.map((timezone) => (
                    <option key={timezone} value={timezone}>{timezone}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Days Section */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Days</h3>
            <div className="flex flex-wrap gap-3">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayToggle(day)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${schedule.days[day]
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-500'
                    }
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save
        </button>
      </div>
    </div>
  );
};

export default ScheduleTab;
