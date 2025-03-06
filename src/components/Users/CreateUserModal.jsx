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
import axios from "../../axios/axios";
import { toast } from "react-toastify";

const CreateUserModal = ({ open, handleClose }) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    userModelId: "",
    otherDetails: {},
    image: null,
  });
  const [formloading, setFormLoading] = useState(false);
  const { models, loading, error } = useGetAllModels();
  const [previewImage, setPreviewImage] = useState(""); // Separate state for preview

  // Find the selected model's details
  const selectedModelData = models.find((model) => model.id === selectedModel);
  console.log(selectedModelData);
  // Handle input changes for normal fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

    // Handle model selection
    const handleModelSelect = (value) => {
      const selectedModelData = models.find((model) => model.id === value);
    
      setSelectedModel(value);
      setFormData((prev) => ({
        ...prev,
        userModelId: value,
        otherDetails:  {}, // Set correct details
      }));
    };
  
    
  // Handle changes for otherDetails fields
  const handleOtherDetailsChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      otherDetails: {
        ...prev.otherDetails,
        [key]: isNaN(value) ? value : Number(value), // Convert to number if applicable
      },
    }));
  };
  
  // Handle array fields (convert between string <-> array)
  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      otherDetails: {
        ...prev.otherDetails,
        [field]: value ? value.split(",").map((s) => s.trim()) : [],
      },
    }));
  };

  // Handle removing array values
  const handleRemoveArray = (field) => {
    setFormData((prev) => ({
      ...prev,
      otherDetails: {
        ...prev.otherDetails,
        [field]: [],
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
  
      // Ensure image is a File object, not a string
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  


  // Handle form submission
  const handleSubmit = async () => {
    console.log("Submitted Data:", formData);
    try {
      setFormLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("userModelId", formData.userModelId);
      
      if (formData.image) {
        formDataToSend.append("image", formData.image); // Ensure it's a File object
      }
  
   // Convert otherDetails to a JSON string and append as a regular form field
   formDataToSend.append("otherDetails", JSON.stringify(formData.otherDetails));
   console.log(formDataToSend,)
      const response = await axios.post("/api/v1/users", formDataToSend);
      console.log("Response:", response);
      if (response.status === 200 || response.status === 201) {
        // Show success message
        toast.success("User data submitted successfully!");
        // Reset the form after successful submission
        setFormData({
          name: "",
          userModelId: "",
          otherDetails: {},
          image: "",
        });
        setSelectedModel("");
        handleClose();
        window.location.reload()
      } else {
        toast.error("Failed to submit user data!");
      }
    } catch (error) {
      toast.error("Error submitting user data:", error);
    } finally {
      setFormLoading(false);
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
          onChange={(e) => handleModelSelect(e.target.value)}
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

        {/* Name Field */}
        <TextField
          fullWidth
          label="Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Render Form Fields Dynamically */}
        {selectedModelData && (
          <>
            {Object.entries(selectedModelData.otherDetails || {}).map(
              ([key, value]) => (
                <Box
                  key={key}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <TextField
                    fullWidth
                    label={key}
                    value={
                      Array.isArray(value)
                        ? (formData.otherDetails[key] || []).join(", ")
                        : formData.otherDetails[key] || ""
                    }
                    onChange={
                      Array.isArray(value)
                        ? (e) => handleArrayChange(key, e.target.value)
                        : (e) => handleOtherDetailsChange(key, e.target.value)
                    }
                    type={typeof value === "number" ? "number" : "text"}
                  />
                  {Array.isArray(value) && (
                    <IconButton
                      onClick={() => handleRemoveArray(key)}
                      disabled={formData.otherDetails[key]?.length === 0}
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

        {/* Image Upload Field */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Upload Image
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            component="label"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Choose File
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>

          {/* Display uploaded image preview */}
          {previewImage && (
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid gray",
              }}
            >
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}
        </Box>

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
          disabled={formloading}
        >
          {formloading ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateUserModal;
