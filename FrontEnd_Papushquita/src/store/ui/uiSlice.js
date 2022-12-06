import { createSlice } from "@reduxjs/toolkit";


export const uiSlide = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: ( state ) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false;
        },
    }
});


export const { onOpenDateModal, onCloseDateModal } = uiSlide.actions;
