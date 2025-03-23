import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
  Camera,
  SupervisedUserCircleRounded,
  DashboardCustomize,
} from "@mui/icons-material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "../../../axios/axios";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, route: "/dashboard/home" },
  { text: "Cameras", icon: <Camera />, route: "/dashboard/cameras" },
  {
    text: "People",
    icon: <SupervisedUserCircleRounded />,
    route: "/dashboard/Users",
  },
  {
    text: "Function",
    icon: <DashboardCustomize />,
    route: "/dashboard/Functions",
  },
];

const secondaryListItems = [
  {
    text: "Settings",
    icon: <SettingsRoundedIcon />,
    route: "/dashboard/settings",
  },
  { text: "About", icon: <InfoRoundedIcon />, route: "/dashboard/about" },
  { text: "Feedback", icon: <HelpRoundedIcon />, route: "/dashboard/feedback" },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(null); // Initially, nothing is selected
  const [loading, setLoading] = React.useState(false);

  const handleItemClick = (index, route) => {
    setSelectedIndex(index); // Update selection
    navigate(route);
  };

  const handleTrainFaces = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/v1/detect-faces/train");
      toast.success("Training started successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error training faces:", error);
      toast.error("Failed to start training. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 2-second delay before setting loading to false
    }
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      {/* Main List */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
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
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === index + mainListItems.length}
              onClick={() =>
                handleItemClick(index + mainListItems.length, item.route)
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Box sx={{ p: 2, justifyItems: "start" }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<FaceIcon />}
            onClick={handleTrainFaces}
            
          >
            {loading ? "Training..." : "Train Faces"}
          </Button>
        </Box>
      </List>
    </Stack>
  );
}
