import axios from "axios";
import { User } from "../interfaces/User";
import { Response } from "../interfaces/Response";

const API_URL = "https://ticketing-backend.railway.internal:8080/user";


export const login = async (user: { userEmail: string; password: string; }) => { 
  const response = await axios.post(`${API_URL}/login`, user); 
  return response.data; 
};

export const registerUser = async (userData: User): Promise<Response> => {
  const response = await axios.post<Response>(`${API_URL}/register`, userData);
  return response.data;
};

export const getAllUsers = async () => { 
  const response = await axios.get(`${API_URL}/allUsers`); 
  return response.data; 
}; 

export const deleteUser = async (id: string) => { 
  const response = await axios.delete(`${API_URL}/delete/${id}`); 
  return response.data; 
};

export const getUserByEmail = async (userEmail: string) => { 
  const response = await axios.get(`${API_URL}/getUserByEmail/${userEmail}`); 
  return response.data; 
}; 

export const getUserById = async (userId: string) => { 
  const response = await axios.get(`${API_URL}/getUserById/${userId}`); 
  return response.data; 
}; 

export const getLoggedUserEmail = async()=>{
  const response = sessionStorage.getItem('user');
  return response;
}

export const getUserId = async()=>{
  const userEmail = sessionStorage.getItem('user');
  const response = await axios.get(`${API_URL}/getUserByEmail/${userEmail}`); 
  return response.data.userId;
}

export const updateUser = async (userId: string, userData: User): Promise<string> => {
  try {
    const response = await axios.put(`${API_URL}/updateUser/${userId}`, userData);
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