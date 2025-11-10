import React, { useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // Auto redirect after 5 seconds
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
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green" }} />
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
          Payment Successful!
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "text.secondary" }}>
          Thank you! Your payment has been completed successfully.
        </Typography>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          Redirecting to home in 5 seconds...
        </Typography>
      </Paper>
    </Box>
  );
};

export default SuccessPage;
