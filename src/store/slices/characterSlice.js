import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nameCharacter : '',
    classe: '',
  };
  
export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        createdCharacter: (state, action) => {
            state.value = action.payload;
            },
        },
    });

export const { createdCharacter } = characterSlice.actions;

export default characterSlice.reducer