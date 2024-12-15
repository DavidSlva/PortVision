export type Page = 'dashboard' | 'historical' | 'predictions' | 'settings';

export interface Port {
  id: number;
  name: string;
  location: string;
}

export interface CargoVolume {
  portId: number;
  portName: string;
  weekStart: string;
  cargoVolume: number;
}

export interface Prediction {
  portId: number;
  portName: string;
  forecastDate: string;
  predictedVolume: number;
}