import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { userSliceReducer } from './user/user';
import {
  immunizationApi,
  immunizationRecommendationApi,
  medicationApi,
  organizationApi,
  patientApi,
  populationRecommendationApi,
  practitionerApi,
  targetDiseaseApi,
} from './fhir';

export const store = configureStore({
  reducer: {
    [immunizationApi.reducerPath]: immunizationApi.reducer,
    [immunizationRecommendationApi.reducerPath]:
      immunizationRecommendationApi.reducer,
    [medicationApi.reducerPath]: medicationApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [populationRecommendationApi.reducerPath]:
      populationRecommendationApi.reducer,
    [practitionerApi.reducerPath]: practitionerApi.reducer,
    [targetDiseaseApi.reducerPath]: targetDiseaseApi.reducer,
    user: userSliceReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      immunizationApi.middleware,
      immunizationRecommendationApi.middleware,
      medicationApi.middleware,
      organizationApi.middleware,
      patientApi.middleware,
      populationRecommendationApi.middleware,
      practitionerApi.middleware,
      targetDiseaseApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
