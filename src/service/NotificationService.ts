import axios, { AxiosResponse } from "axios";

// Two API URLs for fallback
const API_URL_1 = "https://ticketing-backend-production-088a.up.railway.app/notification";
const API_URL_2 = "http://localhost:8080/notification";  // Replace with the second API URL

// Helper function to attempt requests on both APIs
const requestWithFallback = async (requestFunc: { (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (arg0: string): any; }) => {
  try {
    return await requestFunc(API_URL_1);  // Try the first API URL
  } catch (error) {
    console.error(`API 1 failed, trying API 2: ${(error as Error).message}`);
    return await requestFunc(API_URL_2);  // Fallback to the second API URL
  }
};

export async function getAllNotification() {
  const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getAllNotification`));
  return response.data;
}

export const deleteNotification = async (id: string) => {
  const response = await requestWithFallback((apiUrl) => axios.delete(`${apiUrl}/deleteNotification/${id}`));
  return response.data;
};
