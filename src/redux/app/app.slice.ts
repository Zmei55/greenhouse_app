import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppStateType } from '@/types';

const initialState: AppStateType = {
  isLogged: false,
  deviceDateTime: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<boolean>) => {
      if (action.payload === true) state.isLogged = true;
    },
    logoutSuccess: state => {
      state.isLogged = initialState.isLogged;
    },
    deviceDateTimeSave: (state, action: PayloadAction<string>) => {
      state.deviceDateTime = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase('app/logoutSuccess', () => {
      return initialState;
    });
  },
});

export const { loginSuccess, logoutSuccess, deviceDateTimeSave } =
  appSlice.actions;

export default appSlice.reducer;
