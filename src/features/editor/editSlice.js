import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUser } from './editAPI';

const initialState = {
  value: null,
  status: 'idle',
};

export const updateUserAsync = createAsyncThunk(
  'edit/updateUser',
  async (data) => {
    const response = await updateUser(data);
    return response.data;
  }
);

export const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    increment: (state) => {
      if (state.value !== null) {
        state.value += 1;
      }
    },
    decrement: (state) => {
      if (state.value !== null) {
        state.value -= 1;
      }
    },
    incrementByAmount: (state, action) => {
      if (state.value !== null) {
        state.value += action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
        state.value = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = editSlice.actions;

export const selectCount = (state) => state.edit.value;
export const selectUpdatedUser = (state) => state.edit.value;

export default editSlice.reducer;
