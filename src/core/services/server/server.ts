import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import keycloak from '../../keycloak';

interface User {
  userName: string;
}

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_BASE_URL,
    prepareHeaders: (headers, api) => {
      if (keycloak?.authenticated) {
        headers.set('Authorization', `Bearer ${keycloak.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => 'api/users/me',
    }),
  }),
});

export const { useGetMeQuery } = serverApi;
