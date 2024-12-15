import { Ship } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <Ship size={32} />
            <h1 className="text-2xl font-bold">PortVision</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}
                  className={`hover:text-indigo-200 ${currentPage === 'dashboard' ? 'text-white font-semibold' : 'text-indigo-200'}`}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigate('historical'); }}
                  className={`hover:text-indigo-200 ${currentPage === 'historical' ? 'text-white font-semibold' : 'text-indigo-200'}`}
                >
                  Datos Históricos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigate('predictions'); }}
                  className={`hover:text-indigo-200 ${currentPage === 'predictions' ? 'text-white font-semibold' : 'text-indigo-200'}`}
                >
                  Predicciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  // onClick={(e) => { e.preventDefault(); onNavigate('settings'); }}
                  className={`hover:text-indigo-200 ${currentPage === 'settings' ? 'text-white font-semibold' : 'text-indigo-200'}`}
                >
                  Configuración (Próximamente)
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}