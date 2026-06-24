import { AllSensorsDataType, LoginResponseType } from '@/types';
import { api } from '../app/api';

const appApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.query<boolean, void>({
      query: () => ({
        url: '/login',
        method: 'GET',
      }),
      providesTags: ['auth'],
      transformResponse: (response: LoginResponseType) => response.isLogged,
    }),
    getAll: builder.query<AllSensorsDataType, void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),
  }),
});

export const { useLazyLoginQuery, useGetAllQuery } = appApi;
