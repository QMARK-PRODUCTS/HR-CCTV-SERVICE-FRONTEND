import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Camera, SupervisedUserCircleRounded } from '@mui/icons-material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useNavigate } from 'react-router-dom';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, route: '/dashboard/home' },
  { text: 'Cameras', icon: <Camera />, route: '/dashboard/cameras' },
  { text: 'People', icon: <SupervisedUserCircleRounded/>, route: '/dashboard/Users' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, route: '/dashboard/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, route: '/dashboard/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, route: '/dashboard/feedback' },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(null); // Initially, nothing is selected

  const handleItemClick = (index, route) => {
    setSelectedIndex(index); // Update selection
    navigate(route);
  };


  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* Main List */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              selected={selectedIndex === index} 
              onClick={() => handleItemClick(index, item.route)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Secondary List */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              selected={selectedIndex === index + mainListItems.length} 
              onClick={() => handleItemClick(index + mainListItems.length, item.route)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}