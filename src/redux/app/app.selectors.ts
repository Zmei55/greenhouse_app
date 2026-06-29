import { RootState } from '../store';

export const isLoggedSelector = (state: RootState): boolean =>
  state.app.isLogged;
export const deviceDateTimeSelector = (state: RootState): string | null =>
  state.app.deviceDateTime;
