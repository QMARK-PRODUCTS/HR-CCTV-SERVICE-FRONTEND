import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cameraMode: "live", // Default mode is "Live"
};

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setCameraMode: (state, action) => {
      state.cameraMode = action.payload;
    },
  },
});

export const { setCameraMode } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
