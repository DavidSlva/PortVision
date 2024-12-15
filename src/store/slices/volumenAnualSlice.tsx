// src/store/slices/volumenAnualSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// Definir interfaces para los datos
interface VolumenTotalAnio {
    anio: number;
    volumen_total: number;
}

interface VolumenPorPuertoAnio {
    puerto_codigo: number;
    puerto_nombre: string;
    anio: number;
    volumen_total: number;
}

interface VolumenAnualState {
    totalPorAnio: VolumenTotalAnio[];
    volumenPorPuertoAnio: VolumenPorPuertoAnio[];
    loading: boolean;
    error: string | null;
}

// Estado inicial
const initialState: VolumenAnualState = {
    totalPorAnio: [],
    volumenPorPuertoAnio: [],
    loading: false,
    error: null,
};

// URL base de tu API Django
const API_BASE_URL = 'http://localhost:8000/interpreter'; // Ajusta según tu configuración

// Thunk para obtener el volumen total por año
export const fetchVolumenTotalPorAnio = createAsyncThunk<
    VolumenTotalAnio[],
    number | undefined,
    { state: RootState; rejectValue: string }
>(
    'volumenAnual/fetchVolumenTotalPorAnio',
    async (anio, thunkAPI) => {
        try {
            const response = await axios.get<VolumenTotalAnio[]>(
                `${API_BASE_URL}/volumen_anual/total-por-anio/`,
                {
                    params: anio ? { anio } : {},
                }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error al cargar el volumen total por año.');
        }
    }
);

// Thunk para obtener el volumen por puerto en un año específico
export const fetchVolumenPorPuertoAnio = createAsyncThunk<
    VolumenPorPuertoAnio[],
    { codigo_puerto: number; anio: number },
    { state: RootState; rejectValue: string }
>(
    'volumenAnual/fetchVolumenPorPuertoAnio',
    async ({ codigo_puerto, anio }, thunkAPI) => {
        try {
            const response = await axios.get<VolumenPorPuertoAnio[]>(
                `${API_BASE_URL}/volumen_anual/por-puerto-anio/`,
                {
                    params: { codigo_puerto, anio },
                }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error al cargar el volumen por puerto en el año.');
        }
    }
);

// Slice
const volumenAnualSlice = createSlice({
    name: 'volumenAnual',
    initialState,
    reducers: {
        // Define reducers adicionales si es necesario
    },
    extraReducers: (builder) => {
        // Manejando fetchVolumenTotalPorAnio
        builder
            .addCase(fetchVolumenTotalPorAnio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVolumenTotalPorAnio.fulfilled, (state, action: PayloadAction<VolumenTotalAnio[]>) => {
                state.loading = false;
                state.totalPorAnio = action.payload;
            })
            .addCase(fetchVolumenTotalPorAnio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error desconocido.';
            });

        // Manejando fetchVolumenPorPuertoAnio
        builder
            .addCase(fetchVolumenPorPuertoAnio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVolumenPorPuertoAnio.fulfilled, (state, action: PayloadAction<VolumenPorPuertoAnio[]>) => {
                state.loading = false;
                state.volumenPorPuertoAnio = action.payload;
            })
            .addCase(fetchVolumenPorPuertoAnio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error desconocido.';
            });
    },
});

export default volumenAnualSlice.reducer;
