import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { uiSlide, solicitudeSlice, authSlice } from './';



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        solicitude : solicitudeSlice.reducer,
        ui: uiSlide.reducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false
    })
})  