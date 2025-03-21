import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { loginUser, registerUser } from "../../api/services/user";
import { useSnackbar } from "notistack";

const LoginPopup = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [error, setError] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setError(""); // Clear errors when switching tabs
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
    setIsLoading(true);

    try {
      const response = await loginUser(loginData);
      if (response.status === 200) {
        enqueueSnackbar("Login successful! Welcome back.", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        window.location.reload();
        handleClose();
      }
    } catch (err) {
      setError("Invalid username or password.");
      enqueueSnackbar("Login failed. Please check your credentials.", {
        variant: "error",
        autoHideDuration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const registrationResponse = await registerUser(registrationData);
      if (registrationResponse.status === 201) {
        enqueueSnackbar("Registration successful!", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });

        const loginResponse = await loginUser({
          username: registrationData.username,
          password: registrationData.password,
        });
        if (loginResponse.status === 200) {
          enqueueSnackbar("You have been automatically logged in.", {
            variant: "info",
            autoHideDuration: 3000,
          });
          localStorage.setItem("userInfo", JSON.stringify(loginResponse.data));
          window.location.reload();
          handleClose();
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      enqueueSnackbar("Registration failed. Please try again later.", {
        variant: "error",
        autoHideDuration: 4000,
      });
    } finally {
      setIsLoading(false);
      setRegistrationData({
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "40px 30px",
          borderRadius: "16px",
          width: "420px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 15px 50px rgba(0, 0, 0, 0.25)",
          },
          overflow: "hidden",
        }}
      >
        {/* Decorative top border */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)",
          }}
        />

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          sx={{
            width: "100%",
            mb: 4,
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: "2px",
              background: "linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)",
            },
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              transition: "all 0.2s",
              letterSpacing: "0.5px",
              "&:hover": {
                color: "primary.main",
                opacity: 1,
              },
              "&.Mui-selected": {
                color: "#3f51b5",
              },
            },
          }}
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {tabIndex === 0 ? (
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h5"
              align="center"
              sx={{
                mb: 4,
                fontWeight: 700,
                color: "#2c3e50",
                letterSpacing: "0.5px",
              }}
            >
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
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
                "& .MuiInputBase-input": {
                  padding: "14px 16px",
                },
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              fullWidth
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
                "& .MuiInputBase-input": {
                  padding: "14px 16px",
                },
              }}
            />
            {error && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mb: 2.5, fontWeight: 500, fontSize: "0.9rem" }}
              >
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              onClick={handleLoginSubmit}
              sx={{
                padding: "14px",
                borderRadius: "12px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1.05rem",
                letterSpacing: "0.5px",
                background: "linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)",
                boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                transition: "all 0.25s",
                "&:hover": {
                  boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                  transform: "translateY(-2px)",
                  background:
                    "linear-gradient(90deg, #3949ab 0%, #1e88e5 100%)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h5"
              align="center"
              sx={{
                mb: 4,
                fontWeight: 700,
                color: "#2c3e50",
                letterSpacing: "0.5px",
              }}
            >
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
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
                "& .MuiInputBase-input": {
                  padding: "14px 16px",
                },
              }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={registrationData.email}
              onChange={handleRegistrationChange}
              fullWidth
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
                "& .MuiInputBase-input": {
                  padding: "14px 16px",
                },
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={registrationData.password}
              onChange={handleRegistrationChange}
              fullWidth
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
                "& .MuiInputBase-input": {
                  padding: "14px 16px",
                },
              }}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ fontWeight: 500 }}>Role</InputLabel>
              <Select
                name="role"
                value={registrationData.role}
                onChange={handleRegistrationChange}
                sx={{
                  borderRadius: "12px",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.light",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "14px 16px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                  },
                }}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="restaurant_owner">Restaurant Owner</MenuItem>
              </Select>
            </FormControl>
            {error && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mb: 2.5, fontWeight: 500, fontSize: "0.9rem" }}
              >
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              onClick={handleRegistrationSubmit}
              sx={{
                padding: "14px",
                borderRadius: "12px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1.05rem",
                letterSpacing: "0.5px",
                background: "linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)",
                boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                transition: "all 0.25s",
                "&:hover": {
                  boxShadow: "0 6px 15px rgba(33, 150, 243, 0.4)",
                  transform: "translateY(-2px)",
                  background:
                    "linear-gradient(90deg, #3949ab 0%, #1e88e5 100%)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default LoginPopup;
