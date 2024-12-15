// src/components/Dashboard.tsx

import { useEffect } from 'react';
import { Anchor, BarChart2, Ship, TrendingUp } from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { VolumeChart } from './VolumeChart'; // Asegúrate de importar el gráfico si lo necesitas
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  fetchVolumenTotalPorAnio,
} from '../store/slices/volumenAnualSlice';
import { fetchPredicciones, Prediccion } from '../store/slices/prediccionesSlice';
import { fetchVolumenPorPuerto, VolumenPorPuerto } from '../store/slices/volumenPorPuertoSlice';
import { fetchPuertos, Puertos } from '../store/slices/puertosSlice'; // Asegúrate de tener este slice

export function Dashboard() {
  const dispatch = useAppDispatch();

  // Definir el rango de fechas para el último año
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Obtener datos del store
  const { totalPorAnio, loading: totalLoading, error: totalError } = useAppSelector(
      (state) => state.volumenAnual
  );

  const { predicciones, loading: prediccionesLoading, error: prediccionesError } = useAppSelector(
      (state) => state.predicciones
  );

  const { volumenes, loading: volumenLoading, error: volumenError } = useAppSelector(
      (state) => state.volumenPorPuerto
  );

  const { puertos, loading: puertosLoading, error: puertosError } = useAppSelector(
      (state) => state.puertos
  );

  // Definir el año prioritario como el último año disponible o el año actual
  const priorityYear = totalPorAnio.length > 0 ? totalPorAnio[0].anio : today.getFullYear();

  // Filtrar los volúmenes históricos al último año y limitar a 8 registros
  const filteredHistorical = volumenes
      .filter((h) => {
        const semanaDate = new Date(h.semana);
        return semanaDate >= oneYearAgo && semanaDate <= today;
      })
      .sort((a, b) => new Date(b.semana).getTime() - new Date(a.semana).getTime())
      .slice(0, 8) // Limitar a 8 registros
      .map((h) => ({
        portId: Number(h.puerto), // Asegurarse de que 'puerto' es un número
        portName: puertos.find((port) => port.codigo === Number(h.puerto))?.nombre || 'Desconocido',
        weekStart: h.semana,
        cargoVolume: h.volumen,
      }));

  // Filtrar las predicciones: solo las de esta semana y las próximas 3 semanas (total 4 semanas)
  let filteredPredictions = predicciones?.map((p) => ({
    portId: p.puerto,
    portName: puertos.find((port) => port.codigo === p.puerto)?.nombre || 'Desconocido',
    forecastDate: p.semana,
    predictedVolume: p.volumen_predicho,
  })) || [];

  // console.log(predicciones, 'predicciones');
  // console.log(filteredPredictions, 'filteredPredictions');

  // Definir el rango de fechas para las predicciones (esta semana y próximas 3 semanas)
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay()); // Suponiendo que la semana comienza el domingo
  const endOfPredictionRange = new Date(today);
  endOfPredictionRange.setDate(today.getDate() + 21); // 3 semanas adicionales


  // Filtrar las predicciones dentro del rango definido
  const upcomingPredictions = filteredPredictions
      .filter((p) => {
        const forecastDate = new Date(p.forecastDate);
        return forecastDate >= startOfCurrentWeek && forecastDate <= endOfPredictionRange;
      })
      .sort((a, b) => new Date(a.forecastDate).getTime() - new Date(b.forecastDate).getTime())
      // .slice(0, 4); // Limitar a 4 registros
  console.log('Upcoming Predictions:', upcomingPredictions);
  // Calcular el volumen total del último año
  const actualVolume = filteredHistorical.reduce((acc, curr) => acc + curr.cargoVolume, 0);

  // Calcular el volumen predicho: sum de las predicciones futuras (4 semanas)
  const predictedVolume = upcomingPredictions.reduce((acc, curr) => acc + curr.predictedVolume, 0);

  // Calcular el porcentaje de aumento respecto a lo predicho
  const porcentajeAumento = predictedVolume
      ? ((actualVolume - predictedVolume) / predictedVolume) * 100
      : 0;

  // Calcular los puertos activos en el último año
  const puertosActivos = new Set(
      filteredHistorical.map((v) => v.portId)
  ).size;

  // Obtener datos para el gráfico (volumenes por semana en el último año, limitados a 8)
  const volumeData = filteredHistorical.map((item) => ({
    semana: item.weekStart,
    volumen: item.cargoVolume,
  })).filter(item => !isNaN(item.volumen)); // Filtrar valores de volumen inválidos

  useEffect(() => {
    // Obtener el volumen total por año si aún no se ha cargado para el año prioritario
    if (!totalPorAnio.some(v => v.anio === priorityYear)) {
      dispatch(fetchVolumenTotalPorAnio());
    }
  }, [dispatch, totalPorAnio, priorityYear]);

  useEffect(() => {
    if (priorityYear) {
      // Obtener las predicciones para el año prioritario si no se han cargado
      if (!predicciones.some(p => new Date(p.semana).getFullYear() === priorityYear)) {
        dispatch(fetchPredicciones({ anio: priorityYear, puerto: undefined }));
      }

      // Obtener el volumen por puerto para el año prioritario si no se han cargado
      if (!volumenes.some(v => new Date(v.semana).getFullYear() === priorityYear)) {
        dispatch(fetchVolumenPorPuerto({ anio: priorityYear, puerto: undefined }));
      }
    }

    // Obtener los puertos si aún no se han cargado
    if (puertos.length === 0) {
      dispatch(fetchPuertos());
    }
  }, [dispatch, priorityYear, predicciones, volumenes, puertos.length]);

  // Manejar estados de carga y errores
  const loading = totalLoading || prediccionesLoading || volumenLoading || puertosLoading;
  const error = totalError || prediccionesError || volumenError || puertosError;


  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
              title="Volumen Total de Carga (Último Año)"
              value={`${actualVolume.toLocaleString()} TEU`}
              icon={Ship}
              trend={{ value: Number(porcentajeAumento.toFixed(2)), isPositive: porcentajeAumento >= 0 }}
              description="Solo se consideran los volúmenes del último año."
          />
          <SummaryCard
              title="Puertos Activos (Último Año)"
              value={`${puertosActivos}`}
              icon={Anchor}
              description="Solo se consideran los puertos con actividad en el último año."
          />
          <SummaryCard
              title="Volumen Predicho (PROXIMAMENTE)"
              value={`${predictedVolume.toLocaleString()} TEU`}
              icon={TrendingUp}
              description="Incluye las predicciones para las próximas 4 semanas."
          />
          <SummaryCard
              title="Porcentaje de Aumento de Volumen (PROXIMAMENTE)"
              value={`${porcentajeAumento.toFixed(2)}%`}
              icon={BarChart2}
              trend={{ value: porcentajeAumento.toFixed(2), isPositive: porcentajeAumento >= 0 }}
              description="Comparación del volumen actual con las predicciones."
          />
        </div>

        {/* Puedes reactivar el VolumeChart si lo necesitas */}
        <VolumeChart data={volumeData} predictions={upcomingPredictions} />
      </div>
  );
}
