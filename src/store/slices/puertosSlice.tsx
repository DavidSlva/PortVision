// src/store/features/puertos/puertosSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASE_URL} from "../../config.tsx";

// Define la interfaz para un Puerto
export interface Puerto {
    codigo: number;
    nombre: string;
    tipo: string;
    pais: number;
    latitud: number;
    longitud: number;
    zona_geografica: string | null;
}

// Define el estado inicial
interface PuertosState {
    puertos: Puerto[];
    loading: boolean;
    error: string | null;
}

const initialState: PuertosState = {
    puertos: [],
    loading: false,
    error: null,
};

// Thunk para obtener todos los puertos
export const fetchPuertos = createAsyncThunk<Puerto[]>(
    'puertos/fetchPuertos',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<Puerto[]>(`${API_BASE_URL}collection_manager/puertos/`);
            return response.data?.filter((p) => p.pais === 997);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error al cargar los puertos.');
        }
    }
);

// Slice
const puertosSlice = createSlice({
    name: 'puertos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPuertos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPuertos.fulfilled, (state, action) => {
                state.loading = false;
                state.puertos = action.payload;
            })
            .addCase(fetchPuertos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default puertosSlice.reducer;
