import { apiClient } from "../../base/ApiClient";

// Get all menu items
export const getMenuItems = async () => {
  const response = await apiClient.get("/menu-items/");
  return response.data;
};

// Create a new menu item
export const createMenuItem = async (formData) => {
  const response = await apiClient.post("/menu-items/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// Get a specific menu item
export const getMenuItem = async (menuItemId) => {
  const response = await apiClient.get(`/menu-items/${menuItemId}/`);
  return response.data;
};

// Update a menu item
export const updateMenuItem = async (menuItemId, formData) => {
  const response = await apiClient.put(`/menu-items/${menuItemId}/`, formData);
  return response.data;
};

// Partially update a menu item
export const patchMenuItem = async (menuItemId, formData) => {
  const response = await apiClient.patch(
    `/menu-items/${menuItemId}/`,
    formData
  );
  return response.data;
};

// Delete a menu item
export const deleteMenuItem = async (menuItemId) => {
  const response = await apiClient.delete(`/menu-items/${menuItemId}/`);
  return response.data;
};
