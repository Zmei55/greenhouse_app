import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import appReducer from '@/redux/app/app.slice';
import settingsReducer from '@/redux/settings/settings.slice';

import { api } from '@/redux/app/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    app: appReducer,
    settings: settingsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
