import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SearchUsers } from './searchAPI'; // Assuming SearchUsers is defined in searchAPI.js

const initialState = {
  value: 0,
  status: 'idle',
  query: null,
};

export const SearchUsersAsync = createAsyncThunk(
  'search/SearchUsers',
  async (data) => {
    const response = await SearchUsers(data);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchUsersAsync.pending, (state) => {
        state.status = 'loading';
        state.query = null;
      })
      .addCase(SearchUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.query = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = searchSlice.actions;
export const selectCount = (state) => state.search.value;
export const selectquery = (state) => state.search.query;


export default searchSlice.reducer;