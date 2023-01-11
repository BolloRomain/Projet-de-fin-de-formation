import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nameWorld : '',
    description : '',
  };

export const worldSlice= createSlice({
    name: 'world',
    initialState,
    reducers: {
        createdWorld: (state, action) => {
            state.value = action.payload;
            },
        },
    });

export const { createdWorld } = worldSlice.actions;

export default worldSlice.reducer;