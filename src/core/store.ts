import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { userSliceReducer } from './services/user/user';
import { fhirApi } from './services/fhir/fhir';
import {immunizationApi} from "./services/immunization/immunization";

export const store = configureStore({
  reducer: {
    [fhirApi.reducerPath]: fhirApi.reducer,
    user: userSliceReducer,
    [immunizationApi.reducerPath]: immunizationApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fhirApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
