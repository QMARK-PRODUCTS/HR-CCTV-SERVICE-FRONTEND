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
import { Delete } from "@mui/icons-material";
import useGetAllModels from "../../hooks/useGetAllModels";

const CreateUserModal = ({ open, handleClose }) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [formData, setFormData] = useState({});
  const { models, loading, error } = useGetAllModels();

  // Find the selected model's details
  const selectedModelData = models.find((model) => model.id === selectedModel);

  // Handle input changes for normal fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle array fields (convert between string <-> array)
  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value ? value.split(",").map((s) => s.trim()) : [],
    }));
  };

  // Handle removing array values
  const handleRemoveArray = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [],
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
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
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create New User
        </Typography>

        {/* Models Dropdown */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Select a Model
        </Typography>
        <TextField
          fullWidth
          select
          value={selectedModel}
          onChange={(e) => {
            setSelectedModel(e.target.value);
            setFormData(selectedModelData?.otherDetails || {});
          }}
          sx={{ mb: 3 }}
          disabled={loading || error}
        >
          {loading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : error ? (
            <MenuItem disabled>Error loading models</MenuItem>
          ) : models.length > 0 ? (
            models.map((model) => (
              <MenuItem key={model.id} value={model.id}>
                {model.role}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No models available</MenuItem>
          )}
        </TextField>

        {/* Render Form Fields Dynamically */}
        {selectedModelData && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Enter Details
            </Typography>
            {Object.entries(selectedModelData.otherDetails || {}).map(
              ([key, value]) => (
                <Box key={key} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TextField
                    fullWidth
                    label={key}
                    value={
                      Array.isArray(value)
                        ? (formData[key] || []).join(", ")
                        : formData[key] || ""
                    }
                    onChange={
                      Array.isArray(value)
                        ? (e) => handleArrayChange(key, e.target.value)
                        : (e) => handleInputChange(key, e.target.value)
                    }
                    type={typeof value === "number" ? "number" : "text"}
                  />
                  {Array.isArray(value) && (
                    <IconButton
                      onClick={() => handleRemoveArray(key)}
                      disabled={formData[key]?.length === 0}
                      sx={{ ml: 1, color: "red" }}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>
              )
            )}
          </>
        )}

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

export default CreateUserModal;
