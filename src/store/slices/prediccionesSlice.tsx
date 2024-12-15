// src/store/slices/prediccionesSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASE_URL} from "../../config.tsx";

// Define la interfaz para una Predicción
export interface Prediccion {
    id: number;
    puerto: number; // ID del puerto
    semana: string; // Formato de fecha 'YYYY-MM-DD'
    volumen_predicho: number;
    fecha_creacion: string; // Formato ISO
    past_weeks: number;
}

// Define el estado inicial
interface PrediccionesState {
    predicciones: Prediccion[];
    loading: boolean;
    error: string | null;
}

const initialState: PrediccionesState = {
    predicciones: [],
    loading: false,
    error: null,
};

// Parámetros para filtrar
interface FiltrosPredicciones {
    puerto?: number;
    anio?: number;
}

// Thunk para obtener las predicciones filtradas por puerto y año
export const fetchPredicciones = createAsyncThunk<
    Prediccion[],
    FiltrosPredicciones,
    { rejectValue: string }
>(
    'predicciones/fetchPredicciones',
    async (filtros, thunkAPI) => {
        try {
            const params: any = {};
            if (filtros.puerto) params.puerto = filtros.puerto;
            if (filtros.anio) params.anio = filtros.anio;

            const response = await axios.get<{ count: number; next: string | null; previous: string | null; results: Prediccion[] }>(
                `${API_BASE_URL}interpreter/predicciones/`,
                { params }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error al cargar las predicciones.');
        }
    }
);

// Slice
const prediccionesSlice = createSlice({
    name: 'predicciones',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPredicciones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPredicciones.fulfilled, (state, action: PayloadAction<Prediccion[]>) => {
                state.loading = false;
                state.predicciones = action.payload;
            })
            .addCase(fetchPredicciones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default prediccionesSlice.reducer;
