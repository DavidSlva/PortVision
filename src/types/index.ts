export type Page = 'dashboard' | 'historical' | 'predictions' | 'settings' | 'puertos';

export interface Muelle {
  id: number;
  nombre: string;
  extension: number;
  tipo?: string;
  ubicacion?: string;
}


export interface Port {
  id: number;
  name: string;
  location: string;
  muelles?: Muelle[];
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


