export interface UserPreferences {
  theme: 'light' | 'dark';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  volumeUnit: 'TEU' | 'FEU';
  defaultDateRange: number; // months
}

export interface APIConfig {
  baseUrl: string;
  apiKey: string;
  refreshInterval: number; // minutes
}