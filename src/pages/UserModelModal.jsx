import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { FaPlus, FaTrash } from "react-icons/fa";

const UserModelModal = ({ open, handleClose }) => {
  const [role, setRole] = useState("Student");
  const [otherDetails, setOtherDetails] = useState([{ key: "", value: "" }]);

  // Handle role selection
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Handle input change in otherDetails
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...otherDetails];
    updatedDetails[index][field] = value;
    setOtherDetails(updatedDetails);
  };

  // Add new key-value pair
  const addDetailField = () => {
    setOtherDetails([...otherDetails, { key: "", value: "" }]);
  };

  // Remove key-value pair
  const removeDetailField = (index) => {
    const updatedDetails = otherDetails.filter((_, i) => i !== index);
    setOtherDetails(updatedDetails);
  };

  // Handle form submission
  const handleSubmit = () => {
    const userData = {
      role,
      otherDetails: Object.fromEntries(
        otherDetails.map(({ key, value }) => [key, value])
      ),
    };
    console.log("User Data:", userData);
    // Reset form after submission
    setRole("Student");
    setOtherDetails([{ key: "", value: "" }]);

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: { xs: "90%", sm: 600, md: 800, lg: 1000 },
          bgcolor: "black",
          p: 3,
          mx: "auto",
          mt: "10%",
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          User Model
        </Typography>

        {/* Role Dropdown */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Select your Role
        </Typography>
        <TextField
          fullWidth
          select
          value={role}
          onChange={handleRoleChange}
          sx={{ mb: 6 }}
        >
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>

        {/* Dynamic Key-Value Fields */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Other Details
        </Typography>
        {otherDetails.map((detail, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2, mb: 1 }}>
            <TextField
              label="Key"
              value={detail.key}
              onChange={(e) => handleDetailChange(index, "key", e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Value"
              value={detail.value}
              onChange={(e) =>
                handleDetailChange(index, "value", e.target.value)
              }
              sx={{ flex: 1 }}
            />
            <IconButton onClick={() => removeDetailField(index)} color="error">
              <FaTrash />
            </IconButton>
          </Box>
        ))}

        <Button
          onClick={addDetailField}
          variant="outlined"
          startIcon={<FaPlus />}
          sx={{ mt: 1, mb: 2 }}
        >
          Add Detail
        </Button>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            py: 1,
            fontSize: "0.875rem",
            width: "150px",
           
            display: "block",
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default UserModelModal;
