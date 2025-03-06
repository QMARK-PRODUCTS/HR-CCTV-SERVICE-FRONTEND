import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import MainGrid from "./components/MainGrid";
import CameraGrid from "./components/CameraGrid";
import Settings from "./components/Settings";
import About from "./components/About";
import Feedback from "./components/Feedback";
import SideMenu from "./components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";
import UsersPage from "../../pages/UsersPage";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const location = useLocation();
  const cameraMode = useSelector((state) => state.appSettings.cameraMode);
  const [cameraSources, setCameraSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Start loading

    // Simulate a 5-second delay
    const timeout = setTimeout(() => {
      setLoading(false); // Stop loading after 5 seconds
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [location.pathname]);

  useEffect(() => {
    let mediaStream = null;

    if (cameraMode === "test" && location.pathname === "/dashboard/cameras") {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          mediaStream = stream;
          setCameraSources([stream]); // Store the webcam stream
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    } else {
      setCameraSources([
        "http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8",
        "http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8",
        "http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8",
        "http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8",
        "http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8",
        "http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8",
        "http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8",
      ]);
    }

    // Cleanup function to stop the webcam stream when switching mode
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraMode, location.pathname]);

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {loading ? (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "60%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={100} />
              </Box>
            ) : (
              <>
                {location.pathname === "/dashboard/home" && <MainGrid />}
                {location.pathname === "/dashboard/cameras" && ( <CameraGrid cameras={cameraSources} />)}
                {location.pathname === "/dashboard/Users" && <UsersPage />}
                {location.pathname === "/dashboard/settings" && <Settings />}
                {location.pathname === "/dashboard/about" && <About />}
                {location.pathname === "/dashboard/feedback" && <Feedback />}
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
