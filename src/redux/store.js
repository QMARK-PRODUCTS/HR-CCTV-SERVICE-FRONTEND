import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./slices/appSettingsSlice";
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    auth: authReducer,
  },
});

export default store;
