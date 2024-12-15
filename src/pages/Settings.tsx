import React, { useState, useEffect } from 'react';
import { PreferencesForm } from '../components/settings/PreferencesForm';
import { APIConfigForm } from '../components/settings/APIConfigForm';
import { SettingsSection } from '../components/settings/SettingsSection';
import { UserPreferences, APIConfig } from '../types/settings';
import { useTheme } from '../contexts/ThemeContext';

const defaultPreferences: UserPreferences = {
  theme: 'light',
  dateFormat: 'MM/DD/YYYY',
  volumeUnit: 'TEU',
  defaultDateRange: 6,
};

const defaultAPIConfig: APIConfig = {
  baseUrl: '',
  apiKey: '',
  refreshInterval: 5,
};

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [preferences, setPreferences] = useState<UserPreferences>({
    ...defaultPreferences,
    theme,
  });
  const [apiConfig, setAPIConfig] = useState<APIConfig>(defaultAPIConfig);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    setTheme(preferences.theme);
  }, [preferences.theme, setTheme]);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // TODO: Implement actual API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 dark:focus:ring-offset-gray-900"
        >
          {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saveStatus === 'saved' && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md">
          Settings saved successfully!
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
          Error saving settings. Please try again.
        </div>
      )}

      <div className="space-y-8">
        <SettingsSection
          title="User Preferences"
          description="Customize your PortVision experience with these preferences."
        >
          <PreferencesForm
            preferences={preferences}
            onUpdate={setPreferences}
          />
        </SettingsSection>

        <SettingsSection
          title="API Configuration"
          description="Configure your API settings for data synchronization."
        >
          <APIConfigForm
            config={apiConfig}
            onUpdate={setAPIConfig}
          />
        </SettingsSection>
      </div>
    </div>
  );
}