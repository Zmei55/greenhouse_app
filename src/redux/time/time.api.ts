import { DateTimeSendType, DeviceDateTimeType } from '@/types';
import { api } from '../app/api';

/** Управление часами устройства */
const timeApi = api.injectEndpoints({
  endpoints: builder => ({
    /** Получение времени с устройства */
    getDeviceDataTime: builder.query<DeviceDateTimeType, void>({
      query: () => ({
        url: '/time',
        method: 'GET',
      }),
      providesTags: ['settings'],
    }),
    /** Отправка массива даты и времени на устройство */
    sendDeviceDateTime: builder.mutation<DeviceDateTimeType, DateTimeSendType>({
      query: newDateTime => ({
        url: '/time',
        method: 'POST',
        body: newDateTime,
      }),
      invalidatesTags: ['time'],
    }),
  }),
});

export const { useLazyGetDeviceDataTimeQuery, useSendDeviceDateTimeMutation } =
  timeApi;
