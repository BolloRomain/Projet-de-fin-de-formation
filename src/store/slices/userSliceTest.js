import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserDataService from "../../services/UserService";

// FIRST CREATE THE THUNK. THE THUNK!

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }) => {
    try {
      const r = await UserDataService.update(id, data);
      return r.data;
    } catch (e) {
      console.log('Error:', e);
    }
  }
);

const initialState = { 
  logged: false,
  email: '',
  password: '',
  nickname: '',
  token: null,
  avatar: null,
  characters: [],
  games: [],
  worlds: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;