import FHIR from 'fhirclient';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { Bundle } from 'fhir/r4';
import { selectCurrentToken, selectCurrentUser } from '../user/user';
import { RootState } from '../store';

// TODO: create a central place for extracting env vars
// TODO: use OIDC token instead of basic user
const fhirBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
  {
    url: string;
  },
  unknown,
  unknown
> => {
  const fhirClient = FHIR.client({
    serverUrl: baseUrl,
  });

  return async ({ url }, api) => {
    const state = api.getState() as RootState;
    const currentUser = selectCurrentUser(state);
    const username = currentUser?.email;
    const password = selectCurrentToken(state);

    try {
      const result = await fhirClient.request({
        url: url,
        ...(username && { username }),
        ...(password && { password }),
      });
      console.log(result);
      return { data: result };
    } catch (err) {
      return {
        error: {
          status: null,
          data: err,
        },
      };
    }
  };
};

export const fhirApi = createApi({
  reducerPath: 'fhirApi',
  baseQuery: fhirBaseQuery({ baseUrl: process.env.REACT_APP_FHIR_BASE_URL! }),
  endpoints: (builder) => ({
    patientSearch: builder.query<Bundle, void>({
      query: (arg) => ({ url: '/Patient' }),
    }),
  }),
});

export const { usePatientSearchQuery } = fhirApi;
