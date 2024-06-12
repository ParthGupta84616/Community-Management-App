import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import registerReducer from "../features/register/registerSlice"
import userReducer from "../features/profile/profileSlice"
import searchReducer from "../features/search/searchSlice"



export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register : registerReducer ,
    user : userReducer,
    search : searchReducer,
  },
});
