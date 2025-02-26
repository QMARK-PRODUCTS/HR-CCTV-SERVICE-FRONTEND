import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import CameraGrid from './components/CameraGrid';
import Settings from './components/Settings';
import About from './components/About';
import Feedback from './components/Feedback';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const location = useLocation();
  
  const cameras = [
    'http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8',
    'http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8',
    'http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8',
    'http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8',
    'http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8',
    'http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8',
    'http://127.0.0.1:8080/api/v1/camera-sources/hls/5536370868320438345/index.m3u8',

  ];

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
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
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />

            {location.pathname === '/dashboard/home' && <MainGrid />}
            {location.pathname === '/dashboard/cameras' && <CameraGrid cameras={cameras} />}
            {location.pathname === '/dashboard/settings' && <Settings />}
            {location.pathname === '/dashboard/about' && <About />}
            {location.pathname === '/dashboard/feedback' && <Feedback />}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
