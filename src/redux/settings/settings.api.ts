import { SettingsType } from '@/types/settings.types';
import { api } from '../app/api';

const settingsApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllSettings: builder.query<SettingsType, void>({
      query: () => ({
        url: '/settings',
        method: 'GET',
      }),
      providesTags: ['settings'],
    }),
    sendSettings: builder.mutation<SettingsType, SettingsType>({
      query: newSettings => ({
        url: '/settings',
        method: 'POST',
        body: newSettings,
      }),
      invalidatesTags: ['settings'],
    }),
  }),
});

export const { useLazyGetAllSettingsQuery, useSendSettingsMutation } =
  settingsApi;
