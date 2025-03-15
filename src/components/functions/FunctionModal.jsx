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
  Switch,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";

const availableCameras = ["camera 1", "camera 2"];
const timeSlots = ["06:00 - 12:00", "12:00 - 18:00", "18:00 - 06:00"];

const FunctionModal = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    timeSlot: "",
    description: "",
    camerasAssigned: { camera: [] }, // Ensures correct structure
    saveRecordings: false,
    notify: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        camerasAssigned: initialData.camerasAssigned && Array.isArray(initialData.camerasAssigned.camera)
          ? initialData.camerasAssigned
          : { camera: [] },
      });
    } else {
      setFormData({
        name: "",
        type: "",
        timeSlot: "",
        description: "",
        camerasAssigned: { camera: [] }, // Ensures correct structure
        saveRecordings: false,
        notify: false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.checked });
  };

  const handleCameraChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      camerasAssigned: {
        camera: event.target.value || [],
      },
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.type || !formData.timeSlot || !formData.description) {
      toast.error("All fields are required!");
      return;
    }

    // Ensure `camerasAssigned` is always in the correct format
    const payload = {
      ...formData,
      camerasAssigned: {
        camera: Array.isArray(formData.camerasAssigned?.camera) ? formData.camerasAssigned.camera : [],
      },
    };

    try {
      console.log(payload);
      await onSave(payload);
    } catch (error) {
      console.error("API error:", error);
    }
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

        <TextField fullWidth label="Function Name" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={5}
          InputProps={{ sx: { minHeight: "100px", pt: 5 } }}
          sx={{ mb: 2 }}
        />

        <TextField fullWidth label="Type" name="type" value={formData.type} onChange={handleChange} select sx={{ mb: 2 }}>
          <MenuItem value="DETECT">DETECT</MenuItem>
          <MenuItem value="LOITERING">LOITERING</MenuItem>
          <MenuItem value="FALL DOWN">FALL DOWN</MenuItem>
        </TextField>

        <TextField fullWidth label="Time Slot" name="timeSlot" value={formData.timeSlot} onChange={handleChange} select sx={{ mb: 2 }}>
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
          value={formData.camerasAssigned.camera}
          onChange={handleCameraChange}
          input={<OutlinedInput />}
          renderValue={(selected) =>
            selected.length === 0 ? (
              "Select Cameras"
            ) : (
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

        <FormControlLabel
          control={<Switch checked={formData.saveRecordings} onChange={handleToggle("saveRecordings")} />}
          label="Save Recordings"
          sx={{ mb: 2 }}
        />

        <FormControlLabel control={<Switch checked={formData.notify} onChange={handleToggle("notify")} />} label="Notify" sx={{ mb: 2 }} />

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
