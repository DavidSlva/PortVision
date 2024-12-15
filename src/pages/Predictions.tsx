// src/screens/Predictions.tsx

import { useEffect, useState } from 'react';
import { PortSelector } from '../components/PortSelector';
import { PredictionChart } from '../components/PredictionChart';
import { PredictionTable } from '../components/PredictionTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchPredicciones } from '../store/slices/prediccionesSlice';
import { fetchPuertos } from '../store/slices/puertosSlice';
import { fetchVolumenPorPuerto } from '../store/slices/volumenPorPuertoSlice';

export function Predictions() {
    const dispatch = useDispatch<AppDispatch>();

    const [selectedPortId, setSelectedPortId] = useState<number | null>(null);

    // Definir el año prioritario
    const priorityYear = 2024;

    // Obtener puertos desde el store
    const { puertos, loading: puertosLoading, error: puertosError } = useSelector(
        (state: RootState) => state.puertos
    );

    // Obtener predicciones desde el store
    const { predicciones, loading: prediccionesLoading, error: prediccionesError } = useSelector(
        (state: RootState) => state.predicciones
    );

    // Obtener volúmenes históricos desde el store
    const { volumenes, loading: historicosLoading, error: historicosError } = useSelector(
        (state: RootState) => state.volumenPorPuerto
    );

    useEffect(() => {
        // Cargar puertos al montar el componente
        dispatch(fetchPuertos());
    }, [dispatch]);

    useEffect(() => {
        if (selectedPortId !== null) {
            // Cargar predicciones para el puerto seleccionado y el año prioritario
            dispatch(fetchPredicciones({ puerto: selectedPortId, anio: priorityYear }));
            // Cargar volúmenes históricos para el puerto seleccionado y el año prioritario
            dispatch(fetchVolumenPorPuerto({ puerto: selectedPortId, anio: priorityYear }));
        } else {
            // Si no se selecciona ningún puerto, cargar todas las predicciones y volúmenes para el año prioritario
            dispatch(fetchPredicciones({ anio: priorityYear }));
            dispatch(fetchVolumenPorPuerto({ puerto: undefined, anio: priorityYear }));
        }
    }, [dispatch, selectedPortId, priorityYear]);

    // Filtrar los volúmenes históricos hasta la fecha actual y limitar a 8 registros
    const filteredHistorical = [...volumenes]
        .filter((h) => {
            const semanaDate = new Date(h.semana);
            const hoy = new Date();
            return semanaDate <= hoy;
        })
        .sort((a, b) => new Date(b.semana).getTime() - new Date(a.semana).getTime())
        .slice(0, 8) // Limitar a 8 registros
        .map((h) => ({
            portId: Number(h.puerto), // Asegurarse de que 'puerto' es un número
            portName: puertos.find((port) => port.codigo === Number(h.puerto))?.nombre || 'Desconocido',
            weekStart: h.semana,
            cargoVolume: h.volumen,
        }));

    // Filtrar las predicciones y limitar a 8 registros
    let filteredPredictions = predicciones?.map((p) => ({
        portId: p.puerto,
        portName: puertos.find((port) => port.codigo === p.puerto)?.nombre || 'Desconocido',
        forecastDate: p.semana,
        predictedVolume: p.volumen_predicho,
    })) || [];

    // Ordenar las predicciones por fecha descendente y limitar a 8 registros
    filteredPredictions = filteredPredictions
        .sort((a, b) => new Date(b.forecastDate).getTime() - new Date(a.forecastDate).getTime())
        .slice(0, 8);

    console.log(filteredPredictions, predicciones);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Predicciones de Volumen</h1>

            {/* Mostrar errores si existen */}
            {puertosError && <div className="text-red-500 mb-4">Error al cargar puertos: {puertosError}</div>}
            {prediccionesError && <div className="text-red-500 mb-4">Error al cargar predicciones: {prediccionesError}</div>}
            {historicosError && <div className="text-red-500 mb-4">Error al cargar volúmenes históricos: {historicosError}</div>}

            <div className="mb-8">
                <PortSelector
                    ports={puertos}
                    selectedPortId={selectedPortId}
                    onPortSelect={setSelectedPortId}
                    loading={puertosLoading}
                />
            </div>

            {(prediccionesLoading || historicosLoading) ? (
                <div className="text-center">Cargando datos...</div>
            ) : (
                <div className="space-y-8">
                    <PredictionChart
                        historical={filteredHistorical ?? []}
                        predictions={filteredPredictions ?? []}
                    />
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Predicted Values</h2>
                        <PredictionTable
                            data={filteredPredictions.map((p) => ({
                                portId: p.portId,
                                portName: p.portName,
                                weekStart: p.forecastDate,
                                cargoVolume: p.predictedVolume,
                            }))}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
