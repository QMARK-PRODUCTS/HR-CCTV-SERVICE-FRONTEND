import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  Grid,
  Divider,
  IconButton,
  Switch,
  Menu,
 
} from "@mui/material";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setCameraMode } from "../../../redux/slices/appSettingsSlice";
import CameraSourceModal from "../../settings/CameraSourceModal";
import CustomizedDataGrid from "./CustomizedDataGrid";
import useGetAllCameraSources from "../../../hooks/useGetAllCameraSources";
import { toast } from "react-toastify";
import axios from "../../../axios/axios";
import { useColorScheme } from '@mui/material/styles';

const Settings = () => {
  const dispatch = useDispatch();
  const cameraMode = useSelector((state) => state.appSettings.cameraMode);
  const { mode, systemMode, setMode } = useColorScheme();

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const {data ,loading ,error ,refetch ,setData} = useGetAllCameraSources()
 
  const handleMode = (targetMode) => () => {
    setMode(targetMode);
    
  };

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleAddCamera = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = () => {
    const selectedCamera = data.find((row) => row.id === selectedUser);
    setEditData(selectedCamera);
    setModalOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
     try {
          await axios.delete(`/api/v1/camera-sources/${selectedUser}`);
          setData((prevRows) => prevRows.filter((row) => row.id !== selectedUser));
          toast.success("Function deleted successfully!");
        } catch (error) {
          console.error("Error deleting function:", error);
          toast.error("Failed to delete function. Please try again.");
        }
   
    handleMenuClose();
  };

  const handleSaveCamera = async (formData) => {
    try {
      let response;
      if (editData?.id) {
        const Id = editData.id;
        response = await axios.put(`/api/v1/camera-sources/${Id}`,formData)
          toast.success("Camera Source updated successfully!");
       
       
      } else {
        response = await axios.post(`/api/v1/camera-sources`,formData)
          toast.success("Camera Source added successfully!");
      }
      refetch()
    } catch (error) {
      console.error("Error saving function:", error);
            toast.error("Failed to save function. Please try again.");
    }
  
    setModalOpen(false);
  };


  const handleView = () => {
    console.log(`View User: ${selectedUser}`);
    handleMenuClose();
  };

 

  // Define columns inside the component
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 80 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 120 },
    { field: "username", headerName: "Username", flex: 1, minWidth: 120 },
    { field: "ipAddress", headerName: "IP Address", flex: 1, minWidth: 120 },
    { field: "NoOfCameras", headerName: "No. of Cameras", flex: 1, minWidth: 120 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 50,
      renderCell: (params) => (
        <IconButton size="small" sx={{ p: 0.5 }} onClick={(event) => handleMenuOpen(event, params.row.id)}>
          <MoreVert fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const updatedrow = data.map((data)=>({
    id: data.id,
    type: data.type,
    username :data.sourceCredentials.username,
    ipAddress :data.sourceDetails.ipAddress,
    NoOfCameras: data.sourceDetails.NoOfCameras
  }))

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
      {selectedSection && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => setSelectedSection(null)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" fontWeight="600" sx={{ ml: 1 }}>
            {selectedSection}
          </Typography>
        </Box>
      )}

      {!selectedSection && (
        <>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Settings
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: { sm: "100%", md: "400px" } }}>
            <Button
              variant="outlined"
              sx={{ justifyContent: "flex-start", textTransform: "none" }}
              onClick={() => setSelectedSection("Camera Settings")}
            >
              Camera Settings
            </Button>
            <Button
              variant="outlined"
              sx={{ justifyContent: "flex-start", textTransform: "none" }}
              onClick={() => setSelectedSection("App Settings")}
            >
              App Settings
            </Button>
            <Button
              variant="outlined"
              sx={{ justifyContent: "flex-start", textTransform: "none" }}
              // onClick={() => setSelectedSection("Other Settings")}
            >
              Other Settings
            </Button>
          </Box>
        </>
      )}

      {selectedSection === "Camera Settings" && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
            Configure camera sources and set the camera mode.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button variant="contained" sx={{ fontWeight: 600 }} onClick={handleAddCamera}>
              Add Camera Source
            </Button>
          </Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Change Camera Mode
          </Typography>
          <FormControl sx={{ width: "300px" }}>
            <Select
              value={cameraMode}
              onChange={(e) => dispatch(setCameraMode(e.target.value))}
              fullWidth
            >
              <MenuItem value="test">Test</MenuItem>
              <MenuItem value="live">Live</MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
            Camera Sources
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomizedDataGrid columns={columns} rows={updatedrow} />
            </Grid>
          </Grid>
            {/* Three Dots Menu */}
            <Menu  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleView}>View</MenuItem>
            </Menu>

        </>
      )}

      {selectedSection === "App Settings" && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
            Manage application preferences and configurations.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1">Enable Dark Mode</Typography>
            <Switch
               checked={mode === "dark"}
               onChange={() => setMode(mode === "dark" ? "light" : "dark")}
                />
            <Typography variant="subtitle1">Enable Notifications</Typography>
            <Switch />
          </Box>
        </>
      )}

      {/* {selectedSection === "Other Settings" && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
            Miscellaneous settings and additional configurations.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle1">Reset App Data</Typography>
            <Button variant="contained" color="error">Reset</Button>
          </Box>
        </>
      )} */}

      <CameraSourceModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSave={handleSaveCamera}
        editData={editData}
      />
    </Box>
  );
}

export default Settings;
