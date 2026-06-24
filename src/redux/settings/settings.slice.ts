import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SettingsStateType, SettingsType } from '@/types';

const initialState: SettingsStateType = {
  settings: null,
  isSettingsLoading: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsSave: (state, action: PayloadAction<SettingsType>) => {
      state.settings = action.payload;
    },
    isSettingsLoadingSave: (state, action: PayloadAction<boolean>) => {
      state.isSettingsLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase('app/logoutSuccess', () => {
      return initialState;
    });
  },
});

export const { settingsSave, isSettingsLoadingSave } = settingsSlice.actions;

export default settingsSlice.reducer;
