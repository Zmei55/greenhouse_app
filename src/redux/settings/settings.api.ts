import { SettingsType } from '@/types';
import { api } from '../app/api';

/** Управление настройками устройства */
const settingsApi = api.injectEndpoints({
  endpoints: builder => ({
    /** Получение всех настроек с устройства */
    getAllSettings: builder.query<SettingsType, void>({
      query: () => ({
        url: '/settings',
        method: 'GET',
      }),
      providesTags: ['settings'],
    }),
    /** Отправка новых настроек на устройство и получение нового объекта настроек в ответ */
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
