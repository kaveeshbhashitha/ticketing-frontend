import axios, { AxiosResponse } from "axios";

// Two API URLs for fallback
const API_URL_1 = "https://ticketing-backend-production-b7c4.up.railway.app/api/payment";
const API_URL_2 = "http://localhost:8080/api/payment";
const token = sessionStorage.getItem("token");

// Helper function to attempt requests on both APIs
const requestWithFallback = async (
  requestFunc: (apiUrl: string) => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    // Try the first API URL
    return await requestFunc(API_URL_1);
  } catch (error) {
    console.error(`API 1 failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    try {
      // Fallback to the second API URL
      return await requestFunc(API_URL_2);
    } catch (fallbackError) {
      console.error(`API 2 also failed: ${fallbackError instanceof Error ? fallbackError.message : "Unknown error"}`);
      throw new Error("Both API URLs failed.");
    }
  }
};

// Payment APIs
export const makePayment = async (formData: FormData): Promise<string> => {
  const response = await requestWithFallback((apiUrl) => axios.post(`${apiUrl}/process`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }));
  return response.data;
};

export async function getAllPayment() {
  const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getAllPayment`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }));
  return response.data;
}

export const deletePayment = async (id: string) => {
  const response = await requestWithFallback((apiUrl) => axios.delete(`${apiUrl}/deletePayment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }));
  return response.data;
};
