/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

// Two API URLs for fallback
const API_URL_1 = "https://ticketing-backend-production-b7c4.up.railway.app/api/notification";
const API_URL_2 = "http://localhost:8080/api/notification";
const token = sessionStorage.getItem("token");

// Helper function to attempt requests on both APIs
const requestWithFallback = async (requestFunc: { (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (arg0: string): any; }) => {
  try {
    return await requestFunc(API_URL_1);
  } catch (error) {
    console.error(`API 1 failed, trying API 2: ${(error as Error).message}`);
    return await requestFunc(API_URL_2);
  }
};

export async function getAllNotification() {
  const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getAllNotification`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  }));
  return response.data;
}

export const deleteNotification = async (id: string) => {
  const response = await requestWithFallback((apiUrl) => axios.delete(`${apiUrl}/deleteNotification/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  }));
  return response.data;
};

export const addNotification = async (formData: {
  name: string;
  toEmail: string;
  subject: string;
  body: string;
}) => {
  return await requestWithFallback((apiUrl) =>
    axios.post(`${apiUrl}/addNotification`, formData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
};