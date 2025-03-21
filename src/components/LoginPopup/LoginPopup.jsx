import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { loginUser, registerUser } from "../../api/services/user";
import { useSnackbar } from "notistack";

const LoginPopup = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [tabIndex, setTabIndex] = useState(0);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegistrationChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser({
        username: loginData.username,
        password: loginData.password,
      });
      if (response.status === 200) {
        enqueueSnackbar("Login successfull", { variant: "success" });
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        window.location.reload();
        handleClose();
      }
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    console.log(registrationData);
    try {
      const registrationResponse = await registerUser(registrationData);
      if (registrationResponse.status === 201) {
        // After successful registration, login the user automatically
        const loginResponse = await loginUser({
          username: registrationData.username,
          password: registrationData.password,
        });
        if (loginResponse.status === 200) {
          localStorage.setItem("userInfo", JSON.stringify(loginResponse.data));
          window.location.reload();
          handleClose();
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }

    // Reset registration form fields after submission
    setRegistrationData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "40px 30px",
          borderRadius: "12px",
          width: "400px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="login-registration-tabs"
          sx={{ width: "100%", mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {tabIndex === 0 && (
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" align="center" sx={{ mb: 3 }}>
              Welcome Back
            </Typography>
            <TextField
              label="Username"
              name="username"
              type="text"
              value={loginData.username}
              onChange={handleLoginChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            {error && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mb: 2 }}
              >
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLoginSubmit}
              sx={{
                padding: "10px",
                borderRadius: "6px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3d70b2",
                },
              }}
            >
              Log In
            </Button>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" align="center" sx={{ mb: 3 }}>
              Create an Account
            </Typography>
            <TextField
              label="Username"
              name="username"
              type="text"
              value={registrationData.username}
              onChange={handleRegistrationChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={registrationData.email}
              onChange={handleRegistrationChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={registrationData.password}
              onChange={handleRegistrationChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegistrationSubmit}
              sx={{
                padding: "10px",
                borderRadius: "6px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3d70b2",
                },
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default LoginPopup;
