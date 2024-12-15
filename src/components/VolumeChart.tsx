// src/components/VolumeChart.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface VolumeData {
  id: number;
  puerto: string;
  glosapuertoemb: string;
  semana: string;
  volumen: number;
}

interface VolumeChartProps {
  data: VolumeData[];
}

export const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  // Transformar los datos para el gráfico
  const chartData = data.map((item) => ({
    semana: item.semana,
    volumen: item.volumen,
  }));

  return (
      <div className="w-full h-96">
        <h2 className="text-xl font-semibold mb-4">Volumen de Carga por Semana</h2>
        <ResponsiveContainer>
          <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semana" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="volumen" fill="#8884d8" name="Volumen de Carga" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
};
