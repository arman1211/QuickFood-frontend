import { apiClient } from "../../base/ApiClient";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Get all restaurants
export const getRestaurants = async () => {
  const response = await apiClient.get("/restaurants/");
  return response.data;
};

// Create a new restaurant
export const createRestaurant = async (formData) => {
  const response = await apiClient.post("/restaurants/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// Get a specific restaurant
export const getRestaurant = async (restaurantId) => {
  const response = await apiClient.get(`/restaurants/${restaurantId}/`);
  return response.data;
};

// Update a restaurant
export const updateRestaurant = async (restaurantId, formData) => {
  const response = await apiClient.put(
    `/restaurants/${restaurantId}/`,
    formData
  );
  return response.data;
};
