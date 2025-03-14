import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import { Add } from "@mui/icons-material";
import FunctionModal from "../components/functions/FunctionModal";

const FunctionPage = () => {
  const [functions, setFunctions] = useState([
    {
      id: 1,
      functionName: "Security Check",
      type: "Detect",
      timeSlot: "18:00 - 06:00",
      camerasAssigned: ["Camera 1", "Camera 2"],
    },
    {
      id: 2,
      functionName: "Security Check",
      type: "Detect",
      timeSlot: "18:00 - 06:00",
      camerasAssigned: ["Camera 1", "Camera 2"],
    },
    {
      id: 3,
      functionName: "Security Check",
      type: "Detect",
      timeSlot: "18:00 - 06:00",
      camerasAssigned: ["Camera 1", "Camera 2"],
    },
    {
      id: 4,
      functionName: "Security Check",
      type: "Detect",
      timeSlot: "18:00 - 06:00",
      camerasAssigned: ["Camera 1", "Camera 2"],
    },
    {
      id: 5,
      functionName: "Security Check",
      type: "Detect",
      timeSlot: "18:00 - 06:00",
      camerasAssigned: ["Camera 1", "Camera 2"],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFunction, setEditingFunction] = useState(null);

  const handleAdd = () => {
    setEditingFunction(null);
    setModalOpen(true);
  };

  const handleEdit = (func) => {
    setEditingFunction(func);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setFunctions(functions.filter((func) => func.id !== id));
  };

  const handleSave = (newFunction) => {
    const formattedFunction = {
      ...newFunction,
      camerasAssigned: Array.isArray(newFunction.camerasAssigned)
        ? newFunction.camerasAssigned
        : newFunction.camerasAssigned.split(",").map((c) => c.trim()), // Convert comma-separated string to array
    };
  
    if (editingFunction) {
      setFunctions(
        functions.map((func) =>
          func.id === editingFunction.id ? { ...func, ...formattedFunction } : func
        )
      );
    } else {
      setFunctions([...functions, { id: Date.now(), ...formattedFunction }]);
    }
  };
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Functions
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          sx={{ fontWeight: 600 }}
          onClick={handleAdd}
        >
          <Add /> New Function
        </Button>
      </Box>

      <Grid container spacing={5}>
        {functions.map((func) => (
          <Grid item xs={12} sm={6} md={4} key={func.id}>
            <Card
              sx={{
                width: "100%",
                p: 2,
                borderRadius: "12px",
                boxShadow: 1,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {func.functionName}
              </Typography>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight="500">
                  Type
                </Typography>
                <Typography variant="body2">{func.type}</Typography>
              </Box>
              <Divider />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight="500">
                  Time Slot
                </Typography>
                <Typography variant="body2">{func.timeSlot}</Typography>
              </Box>
              <Divider />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight="500">
                  Cameras Assigned
                </Typography>
                <Typography variant="body2">
                  {func.camerasAssigned.join(", ")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  mt: 2,
                }}
              >
                <IconButton
                  sx={{
                    color: "#1976D2",
                    transition: "0.3s",
                    "&:hover": { color: "#1257A0" },
                  }}
                  size="small"
                  onClick={() => handleEdit(func)}
                >
                  <MdEdit />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#D32F2F",
                    transition: "0.3s",
                    "&:hover": { color: "#A12121" },
                  }}
                  size="small"
                  onClick={() => handleDelete(func.id)}
                >
                  <MdDelete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add / Edit Modal */}
      <FunctionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingFunction}
      />
    </Box>
  );
};

export default FunctionPage;
