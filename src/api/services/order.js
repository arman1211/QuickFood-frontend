import { apiClient } from "../../base/ApiClient";

// Get all orders
export const getOrders = async (page) => {
  const response = await apiClient.get(`/orders/?page=${page}`);
  return response.data;
};

// Create a new order
export const createOrder = async (formData) => {
  const response = await apiClient.post("/orders/", formData);
  return response;
};

// Get order details
export const getOrder = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}/`);
  return response.data;
};

// Update an order
export const updateOrder = async (orderId, formData) => {
  const response = await apiClient.put(`/orders/${orderId}/`, formData);
  return response.data;
};

// Partially update an order
export const patchOrder = async (orderId, formData) => {
  const response = await apiClient.patch(`/orders/${orderId}/`, formData);
  return response.data;
};

// Delete an order
export const deleteOrder = async (orderId) => {
  const response = await apiClient.delete(`/orders/${orderId}/`);
  return response.data;
};

export const getUserOder = async (userId) => {
  const response = await apiClient.get(`/orders/user/${userId}`);
  return response.data;
};
