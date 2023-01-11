import { configureStore } from "@reduxjs/toolkit";

import userReducer from './slices/userSliceTest';
import worldSlice from "./slices/worldSlice";
import characterSlice from './slices/characterSlice';
import newGameSlice from "./slices/newGameSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        world: worldSlice,
        character : characterSlice,
        newGame: newGameSlice,
    },
    devTools: true,
});
