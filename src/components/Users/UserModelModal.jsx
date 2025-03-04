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
import axios from "../../axios/axios";
import { toast } from "react-toastify";

const UserModelModal = ({ open, handleClose }) => {
  const [role, setRole] = useState("Student");
  const [otherDetails, setOtherDetails] = useState([
    { key: "", value: "String" },
  ]);
  // Default type is "String"

  const [loading, setLoading] = useState(false);

  // Handle role selection
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Handle input change in otherDetails
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...otherDetails];
  
    if (field === "value") {
      // Convert "Number" to actual Number type
      if (value === "Number") {
        updatedDetails[index][field] = 0; // Default number value
      } 
      // Convert "Array" to an actual array
      else if (value === "Array") {
        updatedDetails[index][field] = []; // Default empty array
      } 
      // Keep "String" as is
      else {
        updatedDetails[index][field] = "String"; // Default string value
      }
    } else {
      updatedDetails[index][field] = value; // Set the key name normally
    }
  
    setOtherDetails(updatedDetails);
  };
  

// Add a new key-value pair
const addDetailField = () => {
  setOtherDetails([...otherDetails, { key: "", value: "String" }]);
};

// Remove a key-value pair
const removeDetailField = (index) => {
  setOtherDetails(otherDetails.filter((_, i) => i !== index));
};


  // Handle form submission
  const handleSubmit = async () => {
    const formattedDetails = {};

    otherDetails.forEach(({ key, value }) => {
      if (key.trim()) formattedDetails[key] = value;
    });
  
    const userData = {
      role,
      otherDetails: formattedDetails,
    };
  
    console.log("Formatted User Data:", userData);

    try {
      setLoading(true);
      const response = await axios.post("/api/v1/users/model", userData);
      console.log("Response:", response);
      if (response.status === 200 || response.status === 201) {
        // Show success message
        toast.success("User data submitted successfully!");

        // Reset form only after successful submission
        setRole("Student");
        setOtherDetails([{ key: "", value: "" }]);
        handleClose();
      } else {
        toast.error("Failed to submit user data!");
      }
    } catch (error) {
      toast.error("Error submitting user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 600, md: 800, lg: 1000 },
          bgcolor: "black",
          p: 3,
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
          <MenuItem value="Faculty">Faculty</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
        </TextField>

        {/* Dynamic Key-Value Fields */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Other Details
        </Typography>
        {otherDetails.map((detail, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2, mb: 1 }}>
            {/* Key Input */}
            <TextField
              label="Key"
              value={detail.key}
              onChange={(e) => handleDetailChange(index, "key", e.target.value)}
              sx={{ flex: 1 }}
            />

            {/* Type Dropdown */}
            <TextField
              select
              label="Type"
              value={detail.value}
              onChange={(e) =>
                handleDetailChange(index, "value", e.target.value)
              }
              sx={{ flex: 1 }}
            >
              <MenuItem  value="String">String</MenuItem>
              <MenuItem value="Number">Number</MenuItem>
              <MenuItem value="Array">Array</MenuItem>
            </TextField>

            {/* Remove Button */}
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
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Modal>
  );
};

export default UserModelModal;
