import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/users";

export const getUsers = async () => {
  return await axios.get(API_BASE_URL);
};

export const getUserById = async (id) => {
  return await axios.get(`${API_BASE_URL}/${id}`);
};

export const searchUsers = async (query) => {
  return await axios.get(`${API_BASE_URL}/search?name=${query}&email=${query}`);
};

export const createUser = async (userData) => {
  return await axios.post(API_BASE_URL, userData);
};

export const updateUser = async (id, userData) => {
  return await axios.put(`${API_BASE_URL}/${id}`, userData);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_BASE_URL}/${id}`);
};
