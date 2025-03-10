import React, { useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";

import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const StyledForm = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  boxShadow: "0 0 20px rgba(59, 63, 63, 0.67)",
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "rgba(0, 255, 255, 0.5)",
        boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00ffff",
        boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
      },
    },
  },
}));

const SocialLink = styled(Box)({
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginTop: "20px",
  "& svg": {
    fontSize: "24px",
    color: "#E0E0E0",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#00ffff",
      transform: "scale(1.1)",
    },
  },
});

function Feedback() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters long";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSnackbar({
          open: true,
          message: "Message sent successfully!",
          severity: "success",
        });
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to send message. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 4 }}>
      {/* <Typography variant="h5" sx={{ mb: 2 }}>
        Feedback
      </Typography> */}

      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ color: "text.primary", mb: 4 }}
        >
          Contact Us
        </Typography>

        <StyledForm component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4} 
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                sx={{
                  "& .MuiInputBase-root": {
                    minHeight: "120px", // Adjust height as needed
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  height: 56,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Send Message"}
              </Button>
            </Grid>
          </Grid>

          <SocialLink>
            <FaGithub />
            <FaLinkedin />
            <FaTwitter />
          </SocialLink>
        </StyledForm>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Feedback;
