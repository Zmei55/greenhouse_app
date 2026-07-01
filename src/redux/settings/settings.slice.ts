import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SettingsStateType, SettingsType } from '@/types';

const initialState: SettingsStateType = {
  settings: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsSave: (state, action: PayloadAction<SettingsType>) => {
      state.settings = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase('app/logoutSuccess', () => {
      return initialState;
    });
  },
});

export const { settingsSave } = settingsSlice.actions;

export default settingsSlice.reducer;
