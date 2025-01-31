import axios, { AxiosResponse } from "axios";
import { User } from "../interfaces/User";
import { Response } from "../interfaces/Response";

// Two API URLs
const API_URL_1 = "https://ticketing-backend-production-088a.up.railway.app/api/user";
const API_URL_2 = "http://localhost:8080/api/user";
const token = sessionStorage.getItem("token");

// Helper function to attempt requests on both APIs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestWithFallback = async (requestFunc: { (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<Response, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (arg0: string): any; }) => {
  try {
    return await requestFunc(API_URL_1);  // Try the first API URL
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error(`API 1 failed, trying API 2: ${(error as any).message}`);
    return await requestFunc(API_URL_2);  // Fallback to the second API URL
  }
};

export const getAllUsers = async () => { 
  const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/allUsers`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })); 
  return response.data; 
};

export const deleteUser = async (id: string) => { 
  const response = await requestWithFallback((apiUrl) => axios.delete(`${apiUrl}/delete/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })); 
  return response.data; 
};

export const getUserByEmail = async (userEmail: string) => { 
  const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getUserByEmail/${userEmail}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })); 
  return response.data; 
};

export const getUserById = async (userId: string) => { 
  const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getUserById/${userId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })); 
  return response.data; 
};

export const getLoggedUserEmail = async () => {
  const response = sessionStorage.getItem('user');
  return response;
}

export const getUserId = async () => {
  const userEmail = sessionStorage.getItem('user');
  const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getUserByEmail/${userEmail}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })); 
  return response.data.userId;
}

export const updateUser = async (userId: string, userData: User): Promise<string> => {
  try {
    const response = await requestWithFallback((apiUrl) => axios.put(`${apiUrl}/updateUser/${userId}`, userData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }));
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