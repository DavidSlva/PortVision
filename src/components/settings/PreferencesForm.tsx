import React from 'react';
import { UserPreferences } from '../../types/settings';

interface PreferencesFormProps {
  preferences: UserPreferences;
  onUpdate: (preferences: UserPreferences) => void;
}

export function PreferencesForm({ preferences, onUpdate }: PreferencesFormProps) {
  const handleChange = (field: keyof UserPreferences, value: string | number) => {
    onUpdate({ ...preferences, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
        <select
          value={preferences.theme}
          onChange={(e) => handleChange('theme', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Format</label>
        <select
          value={preferences.dateFormat}
          onChange={(e) => handleChange('dateFormat', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Volume Unit</label>
        <select
          value={preferences.volumeUnit}
          onChange={(e) => handleChange('volumeUnit', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="TEU">TEU (Twenty-foot Equivalent Unit)</option>
          <option value="FEU">FEU (Forty-foot Equivalent Unit)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Date Range (months)</label>
        <input
          type="number"
          min="1"
          max="24"
          value={preferences.defaultDateRange}
          onChange={(e) => handleChange('defaultDateRange', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  );
}