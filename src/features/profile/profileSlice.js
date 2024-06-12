import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from './profileAPI';

const initialState = {
  value: 0,
  status: 'idle',
  user: null,
};

export const fetchUserProfileAsync = createAsyncThunk(
  'user/fetchUserProfile',
  async (id) => {
    const response = await fetchUserProfile(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
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
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.status = 'loading';
        state.user = null;
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export const selectCount = (state) => state.user.value;
export const selectUser = (state) => state.user.user;

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default userSlice.reducer;
