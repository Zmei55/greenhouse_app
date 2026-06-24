import { SettingsType } from '@/types';
import { RootState } from '../store';

export const settingsSelector = (state: RootState): SettingsType | null =>
  state.settings.settings;
export const isSettingsLoadingSelector = (state: RootState): boolean =>
  state.settings.isSettingsLoading;
