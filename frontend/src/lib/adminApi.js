import { axiosInstance } from "./axios";

// Get all users (admin only)
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

// Get a single user by ID (admin only)
export const getUserById = async (userId) => {
  const response = await axiosInstance.get(`/admin/users/${userId}`);
  return response.data;
};

// Create a new user (admin only)
export const createUser = async (userData) => {
  const response = await axiosInstance.post("/admin/users", userData);
  return response.data;
};

// Update a user (admin only)
export const updateUser = async (userId, userData) => {
  const response = await axiosInstance.put(`/admin/users/${userId}`, userData);
  return response.data;
};

// Delete a user (admin only)
export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/admin/users/${userId}`);
  return response.data;
};
