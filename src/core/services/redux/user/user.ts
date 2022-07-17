import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface User {
  email: string;
  name: string;
  role: 'MD' | 'Patient';
}

interface UserState {
  user: User | null;
  token: string | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, token: null } as UserState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.user;
export const selectCurrentToken = (state: RootState) => state.user.token;
