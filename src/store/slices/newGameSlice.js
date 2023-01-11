import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nameNewGame : '',
    newGameWorld: '',
    newGamePlayers: 0
  };
  
export const newGameSlice = createSlice({
    name: 'newGame',
    initialState,
    reducers: {
        createdNewGame: (state, action) => {
            state.value = action.payload;
            },
        },
    });

export const { createdNewGame } = newGameSlice.actions;

export default newGameSlice.reducer