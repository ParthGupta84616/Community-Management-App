import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAccount, fetchContactEntries, fetchEntries } from './registerAPI';

const initialState = {
  value: 0,
  status: 'idle',
  PersonalInfo: "",
  ContactInfo: "",
};

export const fetchEntriesAsync = createAsyncThunk(
  'register/fetchEntries',
  async () => {
    const response = await fetchEntries();
    return response.data;
  }
);

export const fetchContactEntriesAsync = createAsyncThunk(
  'register/fetchContactEntries',
  async () => {
    const response = await fetchContactEntries();
    return response.data;
  }
);
export const createAccountAsync = createAsyncThunk(
  'register/createAccount',
  async (data) => {
    const response = await createAccount(data);
    return response.data;
  }
);

export const registerSlice = createSlice({
  name: 'register',
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
      .addCase(fetchEntriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEntriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.PersonalInfo = action.payload;
      })
      .addCase(fetchContactEntriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContactEntriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.ContactInfo = action.payload;
      })
      // .addCase(createAccountAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(createAccountAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.ContactInfo = action.payload;
      // })
  },
});

export const { increment, decrement, incrementByAmount } = registerSlice.actions;

export const selectCount = (state) => state.register.value;
export const selectPersonalInfo = (state) => state.register.PersonalInfo;
export const selectContactInfo = (state) => state.register.ContactInfo;

export default registerSlice.reducer;
