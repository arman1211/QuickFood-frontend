import axios from "axios";
import ApiError from "./ApiError";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

console.log(apiUrl, "test");

let userInfo = localStorage.getItem("userInfo");

userInfo = userInfo ? JSON.parse(userInfo) : null;

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${userInfo?.access}`,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isAxiosError && error.response) {
      console.log(" errors", error.response.data);
      const statusCode = error.response.status;
      const errorMessage = error.response.data || "API error";

      if (statusCode === 401) {
        // ForceLogout();
      } else {
        throw new ApiError(errorMessage, statusCode);
      }
    } else {
      throw error;
    }
  }
);

export const ForceLogout = () => {
  localStorage.removeItem("userInfo");
  window.location.reload(true);
  window.location.href = "/login";
};
