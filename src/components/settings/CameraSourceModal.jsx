import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const CameraSourceModal = ({ open, handleClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    type: "RTSP",
    sourceCredentials: {
      username: "",
      password: "",
    },
    sourceDetails: {
      ipAddress: "",
      NoOfCameras: 0,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }else{
        setFormData({
            type: "RTSP",
            sourceCredentials: {
              username: "",
              password: "",
            },
            sourceDetails: {
              ipAddress: "",
              NoOfCameras: 0,
            },
        })
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("sourceCredentials.")) {
      setFormData((prev) => ({
        ...prev,
        sourceCredentials: {
          ...prev.sourceCredentials,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("sourceDetails.")) {
      setFormData((prev) => ({
        ...prev,
        sourceDetails: {
          ...prev.sourceDetails,
          [name.split(".")[1]]: name.includes("NoOfCameras") ? Number(value) || 0 : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {editData ? "Edit Camera Source" : "Add Camera Source"}
        </Typography>

        {/* Camera Type */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select name="type" value={formData.type} onChange={handleChange}>
            <MenuItem value="RTSP">RTSP</MenuItem>
            {/* <MenuItem value="HTTP">HTTP</MenuItem> */}
          </Select>
        </FormControl>

        {/* Username & Password */}
        <TextField
          fullWidth
          label="Username"
          name="sourceCredentials.username"
          value={formData.sourceCredentials.username}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="sourceCredentials.password"
          value={formData.sourceCredentials.password}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        {/* IP Address & No. of Cameras */}
        <TextField
          fullWidth
          label="IP Address"
          name="sourceDetails.ipAddress"
          value={formData.sourceDetails.ipAddress}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Number of Cameras"
          name="sourceDetails.NoOfCameras"
          type="number"
          value={formData.sourceDetails.NoOfCameras}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {editData ? "Update" : "Add"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CameraSourceModal;
