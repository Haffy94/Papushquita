import { createSlice } from '@reduxjs/toolkit';

export const solicitudeSlice = createSlice({
    name: 'solicitude',
    initialState: {
        status: 'ok', // 'repeat', 'not-authenticated'
        errorMessage: undefined,
    },
    reducers: {
        repeatSolicitude: ( state, { payload }/*action*/  ) => {
            state.status = 'repeat',
            state.errorMessage = payload;
        },
    }
});

export const { repeatSolicitude } = solicitudeSlice.actions;