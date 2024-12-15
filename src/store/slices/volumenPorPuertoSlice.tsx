// src/store/features/volumenPorPuerto/volumenPorPuertoSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASE_URL} from "../../config.tsx";

// Define la interfaz para un VolumenPorPuerto
export interface VolumenPorPuerto {
    id: number;
    puerto: string; // Asumiendo que es el código del puerto como string
    glosapuertoemb: string;
    semana: string; // Formato de fecha 'YYYY-MM-DD'
    volumen: number;
}

// Define el estado inicial
interface VolumenPorPuertoState {
    volumenes: VolumenPorPuerto[];
    loading: boolean;
    error: string | null;
}

const initialState: VolumenPorPuertoState = {
    volumenes: [],
    loading: false,
    error: null,
};

// Parámetros para filtrar
interface FiltrosVolumenPorPuerto {
    anio?: number;
    puerto?: number;
}

// Thunk para obtener los volúmenes por puerto con filtros
export const fetchVolumenPorPuerto = createAsyncThunk<VolumenPorPuerto[], FiltrosVolumenPorPuerto>(
    'volumenPorPuerto/fetchVolumenPorPuerto',
    async (filtros, thunkAPI) => {
        try {
            const params: any = {};
            if (filtros.anio) params.anio = filtros.anio;
            if (filtros.puerto) params.puerto = filtros.puerto;

            const response = await axios.get<{ count: number; next: string | null; previous: string | null; results: VolumenPorPuerto[] }>(
                `${API_BASE_URL}interpreter/volumen_por_puerto/`,
                { params }
            );
            return response.data.results;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error al cargar los volúmenes por puerto.');
        }
    }
);

// Slice
const volumenPorPuertoSlice = createSlice({
    name: 'volumenPorPuerto',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVolumenPorPuerto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVolumenPorPuerto.fulfilled, (state, action) => {
                state.loading = false;
                state.volumenes = action.payload;
            })
            .addCase(fetchVolumenPorPuerto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default volumenPorPuertoSlice.reducer;
