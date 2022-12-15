import { createSlice } from '@reduxjs/toolkit';

const testPet = {
    _id: new Date().getTime(),
    name:"Carla",
    type:"cat",
    breed:"mestizo",
    age: "1 año",
    gender:"hembra",
    size:"chico",
    address:"manuel estrada 2194"

    }


export const petsSlice = createSlice({
    name: 'pets',
    initialState: {
        isLoadingPets: true,
        pets: [
        ],
        activePet: null,
        errorMessage: undefined,
    },
    reducers: {
        onSetPett: ( state, { payload } ) => {
            state.activePet = payload;
        },
        onAddNewPet: ( state, { payload } ) => {
            state.pets.push( payload );
            state.activePet = null;
        },
        onLoadPets: (state, { payload = [] }) => {
            state.isLoadingPets = false;
            payload.forEach( event => {
                const exists = state.pets.some( dbEvent => dbEvent.id === event.id );
                if ( !exists ){
                    state.pets.push( event )
                }
            })

        },
        onDeletePet: ( state ) => {
            if ( state.activePet ){
                state.events = state.events.filter( event => event.id !== state.activePet.id);
                state.activePet = null;
            }
            
        },
        clearErrorMessagePet: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onSetPett, onAddNewPet, clearErrorMessagePet, onLoadPets, onDeletePet } = petsSlice.actions;