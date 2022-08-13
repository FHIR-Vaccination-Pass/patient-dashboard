import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { userSliceReducer } from './user/user';
import { immunizationRecommendationApi } from './fhir/immunizationRecommendationApi';
import { targetDiseaseApi } from './fhir/targetDiseaseApi';
import { immunizationApi } from './fhir/immunizationApi';

export const store = configureStore({
  reducer: {
    [immunizationApi.reducerPath]: immunizationApi.reducer,
    [immunizationRecommendationApi.reducerPath]:
      immunizationRecommendationApi.reducer,
    [targetDiseaseApi.reducerPath]: targetDiseaseApi.reducer,
    user: userSliceReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      immunizationApi.middleware,
      immunizationRecommendationApi.middleware,
      targetDiseaseApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
