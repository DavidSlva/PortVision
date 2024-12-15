import React from 'react';
import { APIConfig } from '../../types/settings';

interface APIConfigFormProps {
  config: APIConfig;
  onUpdate: (config: APIConfig) => void;
}

export function APIConfigForm({ config, onUpdate }: APIConfigFormProps) {
  const handleChange = (field: keyof APIConfig, value: string | number) => {
    onUpdate({ ...config, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">API Base URL</label>
        <input
          type="url"
          value={config.baseUrl}
          onChange={(e) => handleChange('baseUrl', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="https://api.example.com/v1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">API Key</label>
        <input
          type="password"
          value={config.apiKey}
          onChange={(e) => handleChange('apiKey', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter your API key"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Data Refresh Interval (minutes)</label>
        <input
          type="number"
          min="1"
          max="60"
          value={config.refreshInterval}
          onChange={(e) => handleChange('refreshInterval', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}