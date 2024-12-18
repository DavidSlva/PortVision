import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Muelle } from '../../types';
import { API_BASE_URL } from '../../config';

interface MuellesState {
    muelles: Muelle[];
    loading: boolean;
    error: string | null;
}

const initialState: MuellesState = {
    muelles: [],
    loading: false,
    error: null,
};

export const fetchMuelles = createAsyncThunk(
    'muelles/fetchMuelles',
    async () => {
        try {
            const response = await axios.get<Muelle[]>(`${API_BASE_URL}muelles/`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener muelles:', error);
            return [];
        }
    }
);

export const fetchMuellesSuccess = (state: MuellesState, action: PayloadAction<Muelle[]>) => {
    state.muelles = action.payload;
    state.loading = false;
    state.error = null;
};

export const fetchMuellesFailure = (state: MuellesState, action: PayloadAction<unknown>) => {
    state.muelles = [];
    state.loading = false;
    state.error = typeof action.payload === 'string' ? action.payload : 'Error desconocido';
};

export const muellesSlice = createSlice({
    name: 'muelles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMuelles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMuelles.fulfilled, fetchMuellesSuccess)
            .addCase(fetchMuelles.rejected, fetchMuellesFailure);
    },
});

export default muellesSlice.reducer;