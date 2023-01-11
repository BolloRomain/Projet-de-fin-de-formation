import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.connected = true;
    },
    loggedOut: (state) => {
      state.connected = false;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;

export default userSlice.reducer