import { apiClient } from "../../base/ApiClient";

// Get all restaurants
export const getRestaurants = async () => {
  const response = await apiClient.get("/restaurants/");
  return response.data;
};

// Create a new restaurant
export const createRestaurant = async (formData) => {
  const response = await apiClient.post("/restaurants/", formData);
  return response.data;
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
