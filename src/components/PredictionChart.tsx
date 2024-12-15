// src/components/PredictionChart.tsx

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface VolumeHistorical {
  portId: number;
  portName: string;
  weekStart: string; // 'YYYY-MM-DD'
  cargoVolume: number;
}

interface VolumePrediction {
  portId: number;
  portName: string;
  forecastDate: string; // 'YYYY-MM-DD'
  predictedVolume: number;
}

interface PredictionChartProps {
  historical: VolumeHistorical[];
  predictions: VolumePrediction[];
}

export const PredictionChart: React.FC<PredictionChartProps> = ({ historical, predictions }) => {
  // Combinar y ordenar los datos
  const combinedData = [
    ...historical.map((h) => ({
      date: h.weekStart,
      actual: h.cargoVolume,
      predicted: null,
    })),
    ...predictions.map((p) => ({
      date: p.forecastDate,
      actual: null,
      predicted: p.predictedVolume,
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Predicciones de Volumen</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={combinedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                  type="monotone"
                  dataKey="actual"
                  name="Historical"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={false}
              />
              <Line
                  type="monotone"
                  dataKey="predicted"
                  name="Predicted"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
};
