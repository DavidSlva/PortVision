// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import volumenAnualReducer from './slices/volumenAnualSlice';
import puertosReducer from './slices/puertosSlice';
import volumenPorPuertoReducer from './slices/volumenPorPuertoSlice';
import prediccionesReducer from './slices/prediccionesSlice'; // Importa el nuevo slice

const store = configureStore({
    reducer: {
        volumenAnual: volumenAnualReducer,
        puertos: puertosReducer,
        volumenPorPuerto: volumenPorPuertoReducer,
        predicciones: prediccionesReducer, // Añade el nuevo slice al store
        // Añade otros reducers aquí si es necesario
    },
});

// Inferir los tipos de RootState y AppDispatch a partir del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
