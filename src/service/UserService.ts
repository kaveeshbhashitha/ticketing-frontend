import { User } from "../interfaces/User";
import { Response } from "../interfaces/Response";
import AxiosInstance from "../components/web/interceptor/AxiosInstance";

const API_URL = "http://localhost:8080/user";

export const login = async (user: { userEmail: string; password: string; }) => {
  const response = await AxiosInstance.post(`${API_URL}/login`, user);
  return response.data;
};

export const registerUser = async (userData: User): Promise<Response> => {
  const response = await AxiosInstance.post<Response>(`${API_URL}/register`, userData);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await AxiosInstance.get(`${API_URL}/allUsers`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await AxiosInstance.delete(`${API_URL}/delete/${id}`);
  return response.data;
};

export const getUserByEmail = async (userEmail: string) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in sessionStorage");
  }
  console.log("Token:", token);
  const response = await AxiosInstance.get(`${API_URL}/getUserByEmail/${userEmail}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await AxiosInstance.get(`${API_URL}/getUserById/${userId}`);
  return response.data;
};

export const getLoggedUserEmail = async () => {
  const response = sessionStorage.getItem("user");
  return response;
};

export const getUserId = async () => {
  const userEmail = sessionStorage.getItem("user");
  if (!userEmail) {
    throw new Error("No user email found in sessionStorage");
  }
  const response = await AxiosInstance.get(`${API_URL}/getUserByEmail/${userEmail}`);
  return response.data.userId;
};

export const updateUser = async (userId: string, userData: User): Promise<string> => {
  try {
    const response = await AxiosInstance.put(`${API_URL}/updateUser/${userId}`, userData);
    if (response.status === 200) {
      return response.data.userId;
    } else {
      throw new Error("Failed to update user");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
