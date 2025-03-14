import React from "react";
import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCameraMode } from "../../../redux/slices/appSettingsSlice";


function Settings() {
  const dispatch = useDispatch();
  const cameraMode = useSelector((state) => state.appSettings.cameraMode);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        App Settings
      </Typography>

      {/* Camera Mode Selection */}
      <Box sx={{ display: "flex", flexDirection: "column", maxWidth: { sm: "100%", md: "400px" }, gap: 2, mb: 10 }}>
        <Typography variant="subtitle1" sx={{ minWidth: "100px" }}>
          Camera
        </Typography>
        <FormControl sx={{ flex: 1 }}>
          <Select
            value={cameraMode}
            onChange={(e) => dispatch(setCameraMode(e.target.value))}
            fullWidth
          >
            <MenuItem value="test">Test</MenuItem>
            <MenuItem value="live">Live</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Settings;
