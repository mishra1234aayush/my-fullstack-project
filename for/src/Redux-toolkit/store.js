import { configureStore } from '@reduxjs/toolkit';
import otpReducer from './mySlice';

export const store = configureStore({
  reducer: {
    otp: otpReducer,
  },
});
