import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  OutlinedInput,
  Chip,
} from "@mui/material";

const availableCameras = ["Camera 1", "Camera 2", "Camera 3", "Camera 4"];
const timeSlots = ["06:00 - 12:00", "12:00 - 18:00", "18:00 - 06:00"];

const FunctionModal = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    functionName: "",
    type: "",
    timeSlot: "",
    camerasAssigned: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        functionName: "",
        type: "",
        timeSlot: "",
        camerasAssigned: [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCameraChange = (event) => {
    setFormData({ ...formData, camerasAssigned: event.target.value });
  };

  const handleSubmit = () => {
    if (!formData.functionName || !formData.type || !formData.timeSlot || formData.camerasAssigned.length === 0) {
      alert("All fields are required!");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          mx: "auto",
          mt: "10%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {initialData ? "Edit Function" : "Add Function"}
        </Typography>

        <TextField
          fullWidth
          label="Function Name"
          name="functionName"
          value={formData.functionName}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          select
          sx={{ mb: 2 }}
        >
          <MenuItem value="Detect">Detect</MenuItem>
          <MenuItem value="Track">Track</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Time Slot"
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          select
          sx={{ mb: 2 }}
        >
          {timeSlots.map((slot) => (
            <MenuItem key={slot} value={slot}>
              {slot}
            </MenuItem>
          ))}
        </TextField>

        <Select
          fullWidth
          multiple
          displayEmpty
          value={formData.camerasAssigned}
          onChange={handleCameraChange}
          input={<OutlinedInput />}
          renderValue={(selected) =>
            selected.length === 0 ? "Select Cameras" : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((camera) => (
                  <Chip key={camera} label={camera} />
                ))}
              </Box>
            )
          }
          sx={{ mb: 2 }}
        >
          {availableCameras.map((camera) => (
            <MenuItem key={camera} value={camera}>
              {camera}
            </MenuItem>
          ))}
        </Select>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FunctionModal;
