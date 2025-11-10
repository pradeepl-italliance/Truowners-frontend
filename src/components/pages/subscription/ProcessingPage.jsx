import React, { useEffect } from "react";
import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProcessingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Optional: auto-redirect if processing takes too long
    }, 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 3,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        <CircularProgress sx={{ mb: 3 }} />
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Payment Processing
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your payment is being processed. Please do not refresh or close this page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          Redirecting to home in 10 seconds...
        </Typography>
      </Paper>
    </Box>
  );
};

export default ProcessingPage;
