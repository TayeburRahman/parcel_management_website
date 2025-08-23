import { configureStore } from '@reduxjs/toolkit'; 
import authSliceReducer from './features/auth/authSlice';
import { apiSlice } from './features/api/apiSlice'; 
// import subscriptionSliceReducer from '../features/subscription/subscriptionSlice';
// import notificationSliceReducer from '../features/notification/notificationSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, 
    auth: authSliceReducer, 
    // subscription: subscriptionSliceReducer,
    // notification: notificationSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});
