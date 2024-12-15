// src/screens/HistoricalData.tsx

import { useEffect, useState } from 'react';
import { DateRangePicker } from '../components/DateRangePicker';
import { PortSelector } from '../components/PortSelector';
import { VolumeChart } from '../components/VolumeChart';
import { VolumeTable } from '../components/VolumeTable';
import { getDateRange } from '../utils/date';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchPuertos } from "../store/slices/puertosSlice";
import { fetchVolumenPorPuerto } from "../store/slices/volumenPorPuertoSlice";

export function HistoricalData() {
    const defaultRange = getDateRange(6);
    const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>(defaultRange);
    const [selectedPortId, setSelectedPortId] = useState<number | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    // Obtener puertos desde el store
    const { puertos, loading: puertosLoading, error: puertosError } = useSelector(
        (state: RootState) => state.puertos
    );

    // Obtener volúmenes desde el store
    const { volumenes, loading: volumenLoading, error: volumenError } = useSelector(
        (state: RootState) => state.volumenPorPuerto
    );

    // Efecto para obtener todos los puertos al montar el componente
    useEffect(() => {
        dispatch(fetchPuertos());
    }, [dispatch]);

    // Efecto para obtener volúmenes cuando cambian los filtros
    useEffect(() => {
        // Obtener el año desde el rango de fechas seleccionado
        const anio = dateRange.end.getFullYear(); // Asumiendo que quieres filtrar por el año final

        const filtros = {
            anio,
            puerto: selectedPortId || undefined,
        };

        dispatch(fetchVolumenPorPuerto(filtros));
    }, [dispatch, dateRange, selectedPortId]);

    // Filtrar los volúmenes según el rango de fechas
    const filteredVolumeData = volumenes.filter((item) => {
        const semanaDate = new Date(item.semana);
        return semanaDate >= dateRange.start && semanaDate <= dateRange.end;
    });

    // Transformar los datos para la tabla
    const tableData = filteredVolumeData.map((item) => ({
        portId: parseInt(item.puerto), // Asegúrate de que 'puerto' puede convertirse a número
        portName: item.glosapuertoemb,
        weekStart: item.semana,
        cargoVolume: item.volumen,
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Historical Data</h1>

            {/* Mostrar errores si existen */}
            {puertosError && <div className="text-red-500 mb-4">Error al cargar puertos: {puertosError}</div>}
            {volumenError && <div className="text-red-500 mb-4">Error al cargar volúmenes: {volumenError}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <DateRangePicker
                    startDate={dateRange.start}
                    endDate={dateRange.end}
                    onStartDateChange={(date) => setDateRange(prev => ({ ...prev, start: date }))}
                    onEndDateChange={(date) => setDateRange(prev => ({ ...prev, end: date }))}
                />
                <PortSelector
                    ports={puertos}
                    selectedPortId={selectedPortId}
                    onPortSelect={setSelectedPortId}
                    loading={puertosLoading}
                />
            </div>

            {volumenLoading ? (
                <div className="text-center">Cargando volúmenes...</div>
            ) : (
                <div className="space-y-8">
                    <VolumeChart data={filteredVolumeData} />
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Volumen por Semana</h2>
                        <VolumeTable
                            data={tableData}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
