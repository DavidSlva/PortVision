import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { HistoricalData } from './pages/HistoricalData';
import { Predictions } from './pages/Predictions';
import { Settings } from './pages/Settings';
import { Page } from './types';
import { ThemeProvider } from './contexts/ThemeContext';
import {Puertos} from "./pages/Puertos.tsx";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'historical':
        return <HistoricalData />;
      case 'predictions':
        return <Predictions />;
      case 'settings':
        return <Settings />;
      case 'puertos':
        return <Puertos />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header onNavigate={(page: Page) => setCurrentPage(page)} currentPage={currentPage} />
        {renderPage()}
      </div>
    </ThemeProvider>
  );
}