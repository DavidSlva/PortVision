// src/pages/Puertos.tsx
//@ts-nocheck
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchPuertos, Puerto } from '../store/slices/puertosSlice';
import PuertosTable from "../components/PuertosTable.tsx";
import {Button} from "antd";


export function Puertos() {
    const dispatch = useDispatch<AppDispatch>();
    const { puertos, loading, error } = useSelector((state: RootState) => state.puertos);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [puertoToEdit, setPuertoToEdit] = useState<Puerto | null>(null);

    useEffect(() => {
        dispatch(fetchPuertos());
    }, [dispatch]);

    const handleAdd = () => {
        setPuertoToEdit(null);
        setIsFormOpen(true);
    };

    const handleEdit = (puerto: Puerto) => {
        setPuertoToEdit(puerto);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setPuertoToEdit(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Puertos y Muelles</h1>
                <Button type="primary" onClick={handleAdd}>
                    Agregar Puerto
                </Button>
            </div>

            {error && <div className="text-red-500 mb-4">Error al cargar puertos: {error}</div>}
            <PuertosTable puertos={puertos} loading={loading} error={error} />

        </div>
    );
}
