import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import registerReducer from "../features/register/registerSlice"
import userReducer from "../features/profile/profileSlice"


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register : registerReducer ,
    user : userReducer,
  },
});
