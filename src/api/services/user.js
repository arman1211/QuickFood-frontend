import axios from "axios";
import { apiClient } from "../../base/ApiClient";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
// Login
export const loginUser = async (credentials) => {
  const response = await axios.post(`${apiUrl}/auth/login/`, credentials);
  return response;
};

// Register
export const registerUser = async (formData) => {
  const response = await axios.post(`${apiUrl}/auth/register/`, formData);
  return response;
};

// Get Profile
export const getUserProfile = async () => {
  const response = await apiClient.get("/auth/profile/");
  return response.data;
};

// Refresh Token
export const refreshToken = async (refreshToken) => {
  const response = await apiClient.post("/auth/token/refresh/", {
    refresh: refreshToken,
  });
  return response.data;
};
