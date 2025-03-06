import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./appSettingsSlice";

const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
  },
});

export default store;
