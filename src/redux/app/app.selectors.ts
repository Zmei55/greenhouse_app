import { RootState } from '../store';

export const isLoggedSelector = (state: RootState): boolean =>
  state.app.isLogged;
