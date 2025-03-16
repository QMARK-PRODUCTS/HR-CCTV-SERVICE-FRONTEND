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
import {
  MdEdit,
  MdDelete,
  MdFullscreen,
  MdFullscreenExit,
} from "react-icons/md";
import { Add } from "@mui/icons-material";
import FunctionModal from "../components/functions/FunctionModal";
import { toast } from "react-toastify";
import axios from "../axios/axios";
import useGetAllFunctions from "../hooks/useGetAllFunctions";

const FunctionPage = () => {
  // const [functions, setFunctions] = useState([
  //   {
  //     id: 1,
  //     functionName: "Security Check",
  //     type: "Detect",
  //     timeSlot: "18:00 - 06:00",
  //     camerasAssigned: { camera: ["Camera 1", "Camera 2"] },
  //     saveRecordings: false,
  //     notify: false,
  //     description: "Night-time security check to detect suspicious activity.",
  //   },
  //   {
  //     id: 2,
  //     functionName: "Patrol Monitoring",
  //     type: "Track",
  //     timeSlot: "06:00 - 12:00",
  //     camerasAssigned: { camera: ["Camera 3"] },
  //     saveRecordings: true,
  //     notify: true,
  //     description: "Monitor patrol routes during the morning shift.",
  //   },
  //   {
  //     id: 3,
  //     functionName: "Intruder Alert",
  //     type: "Detect",
  //     timeSlot: "12:00 - 18:00",
  //     camerasAssigned: { camera: ["Camera 2", "Camera 4"] },
  //     saveRecordings: true,
  //     notify: false,
  //     description: "Detect unauthorized intrusions in the afternoon.",
  //   },
  //   {
  //     id: 4,
  //     functionName: "Perimeter Security",
  //     type: "Track",
  //     timeSlot: "18:00 - 06:00",
  //     camerasAssigned: { camera: ["Camera 1", "Camera 3"] },
  //     saveRecordings: false,
  //     notify: true,
  //     description: "Track perimeter activity during the night shift.",
  //   },
  //   {
  //     id: 5,
  //     functionName: "Entry Surveillance",
  //     type: "Detect",
  //     timeSlot: "06:00 - 12:00",
  //     camerasAssigned: { camera: ["Camera 4"] },
  //     saveRecordings: true,
  //     notify: false,
  //     description: "Detect people in the morning.",
  //   },
  // ]);
  const { functions, loading, error, setFunctions, refetch } =
    useGetAllFunctions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFunction, setEditingFunction] = useState(null);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);

  const handleCardClick = (index) => {
    setFullScreenIndex(fullScreenIndex === index ? null : index);
  };

  const handleAdd = () => {
    setEditingFunction(null);
    setModalOpen(true);
  };

  const handleEdit = (func) => {
    setEditingFunction(func);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/functions/?functionId=${id}`);
      setFunctions((prevFunctions) =>
        prevFunctions.filter((func) => func.id !== id)
      );
      toast.success("Function deleted successfully!");
    } catch (error) {
      console.error("Error deleting function:", error);
      toast.error("Failed to delete function. Please try again.");
    }
  };

  const handleSave = async (newFunction) => {
    try {
      if (editingFunction?.id) {
        const functionId = editingFunction.id;

        // Ensure functionId is in the correct format
        const response = await axios.put(
          `/api/v1/functions/?functionId=${functionId}`,
          newFunction
        );

        setFunctions(
          functions.map((func) =>
            func.id === editingFunction.id
              ? { ...func, ...response.data }
              : func
          )
        );
        toast.success("Function updated successfully!");
      } else {
        const response = await axios.post("/api/v1/functions", newFunction);

        setFunctions([...functions, response.data]);
        toast.success("Function added successfully!");
      }
      refetch();
    } catch (error) {
      console.error("Error saving function:", error);
      toast.error("Failed to save function. Please try again.");
    }

    setModalOpen(false);
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

      {loading ? (
        <Typography variant="h6" textAlign="center">
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="h6" textAlign="center" color="error">
          {error}
        </Typography>
      ) : functions.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No Data Available
        </Typography>
      ) : (
        <Grid container spacing={5}>
          {functions.map(
            (func, index) =>
              (fullScreenIndex === null || fullScreenIndex === index) && (
                <Grid
                  item
                  xs={12}
                  sm={fullScreenIndex !== null ? 12 : 6}
                  md={fullScreenIndex !== null ? 12 : 4}
                  key={func.id}
                >
                  <Card
                    sx={{
                      width: "100%",
                      p: 2,
                      borderRadius: "12px",
                      boxShadow: 1,
                      textAlign: "left",
                      transition: "all 0.3s ease-in-out",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      height: fullScreenIndex === index ? "90vh" : "auto",
                      overflowY: fullScreenIndex === index ? "auto" : "visible",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="h6" fontWeight="bold">
                        {func.name}
                      </Typography>
                      <IconButton
                        sx={{
                          color: "#1976D2",
                          transition: "0.3s",
                          "&:hover": { color: "#1257A0" },
                        }}
                        size="small"
                        onClick={() => handleCardClick(index)}
                      >
                        {fullScreenIndex === index ? (
                          <MdFullscreenExit />
                        ) : (
                          <MdFullscreen />
                        )}
                      </IconButton>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" fontWeight="500">
                        Description
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textAlign: "right", flexGrow: 1 }}
                      >
                        {func.description}
                      </Typography>
                    </Box>
                    <Divider />
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
                        {func?.camerasAssigned?.camera?.join(", ") || "None"}
                      </Typography>
                    </Box>
                    <Divider />

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" fontWeight="500">
                        Save Recordings
                      </Typography>
                      <Typography variant="body2">
                        {func.saveRecordings ? "Yes" : "No"}
                      </Typography>
                    </Box>
                    <Divider />

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" fontWeight="500">
                        Notify
                      </Typography>
                      <Typography variant="body2">
                        {func.notify ? "Yes" : "No"}
                      </Typography>
                    </Box>
                    <Divider />
                    {fullScreenIndex === index && (
                      <Box>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" my={2}>
                            Save Recordings
                          </Typography>
                        </Box>
                        <Grid container spacing={2}>
                          {[1, 2, 3, 4].map((_, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                              <Card
                                sx={{
                                  width: "100%",
                                  height: "250px",
                                  position: "relative",
                                  cursor: "pointer",
                                }}
                              >
                                {/* <video
                                  autoPlay
                                  muted
                                  src={`http://127.0.0.1:8000/api/v1/storage-operations/function-recordings/${func.id}`}
                                  playsInline
                                  controls
                                  width="100%"
                                  height="100%"
                                  style={{
                                    objectFit: "cover",
                                  }}
                                /> */}
                                     <img
                                  src={`http://127.0.0.1:8000/api/v1/storage-operations/function-recordings/${func.id}`}
                                  width="100%"
                                  height="100%"
                                  style={{
                                    objectFit: "cover",
                                  }}
                                  onError={(e) => {
                                    console.warn(`Image failed to load: ${e.target.src}`);
                                    e.target.onerror = null; // Prevent infinite loop in case the fallback image also fails
                                    e.target.src = "/assets/Video dummy.png"; // ✅ Corrected path
                                  }} 
                                />
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    position: "absolute",
                                    top: 8,
                                    left: 8,
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    color: "#fff",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  {`Record ${index + 1}`}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    color: "#fff",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  {`2025-03-15`}
                                </Typography>
                              </Card>
                              <Box pl={1} mt={2}>
                              <Typography variant="body2" fontWeight="500">
                              {`Video ${index + 1}`}
                              </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}

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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(func);
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(func.id);
                        }}
                      >
                        <MdDelete />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              )
          )}
        </Grid>
      )}

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
