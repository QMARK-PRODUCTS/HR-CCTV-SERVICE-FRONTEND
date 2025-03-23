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
import useGetAllRecordings from "../hooks/useGetAllRecordings";

const FunctionPage = () => {
  const { functions, loading, error, setFunctions, refetch } =
    useGetAllFunctions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFunction, setEditingFunction] = useState(null);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);
  const { record } = useGetAllRecordings(fullScreenIndex);
  console.log(record);
  const handleCardClick = (id) => {
    setFullScreenIndex(fullScreenIndex === id ? null : id);
  };
  console.log(fullScreenIndex);
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
              (fullScreenIndex === null || fullScreenIndex === func.id) && (
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
                      height: fullScreenIndex === func.id ? "90vh" : "auto",
                      overflowY:
                        fullScreenIndex === func.id ? "auto" : "visible",
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
                        onClick={() => handleCardClick(func.id)}
                      >
                        {fullScreenIndex === func.id ? (
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
                    {fullScreenIndex === func.id && (
                      <Box>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" my={2}>
                            Save Recordings
                          </Typography>
                        </Box>
                        <Grid container spacing={2}>
                          {record.map((data, i) => (
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
                                  src={`http://127.0.0.1:8000/api/v1/storage-operations/function-recordings/${data.id}`}
                                  width="100%"
                                  height="100%"
                                  style={{
                                    objectFit: "cover",
                                  }}
                                  onError={(e) => {
                                    console.warn(
                                      `Image failed to load: ${e.target.src}`
                                    );
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
                                  {`Record ${i + 1}`}
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
                                  {new Date(data.timestamp).toLocaleString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      // second: "2-digit",
                                    }
                                  )}
                                </Typography>
                              </Card>
                              <Box px={2} mt={2} gap={2}>
                                <Typography variant="body2" fontWeight="500">
                                  {`Video ${i + 1}`}
                                </Typography>
                                <Divider />
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  mt={2}
                                >
                                  <Typography variant="body2" fontWeight="500">
                                    people Count
                                  </Typography>
                                  <Typography variant="body2">
                                    {data.people_count}
                                  </Typography>
                                </Box>
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
