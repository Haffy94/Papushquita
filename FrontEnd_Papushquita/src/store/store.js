import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { uiSlide, calendarSlice, authSlice } from './';



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar : calendarSlice.reducer,
        ui: uiSlide.reducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false
    })
})  