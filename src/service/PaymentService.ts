import axios, { AxiosResponse } from "axios";

// Two API URLs for fallback
const API_URL_1 = "https://ticketing-backend-production-088a.up.railway.app/payment";
const API_URL_2 = "http://localhost:8080/payment";  // Replace with the second API URL

// Helper function to attempt requests on both APIs
const requestWithFallback = async (requestFunc: { (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (arg0: string): any; }) => {
  try {
    return await requestFunc(API_URL_1);  // Try the first API URL
  } catch (error) {
    if (error instanceof Error) {
      console.error(`API 1 failed, trying API 2: ${error.message}`);
    } else {
      console.error('API 1 failed, trying API 2: Unknown error');
    }
    return await requestFunc(API_URL_2);  // Fallback to the second API URL
  }
};

export const makePayment = async (formData: FormData): Promise<string> => {
  const response = await requestWithFallback((apiUrl) => axios.post(`${apiUrl}/process`, formData));
  return response.data;
};

export async function getAllPayment() {
  const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getAllPayment`));
  return response.data;
}

export const deletePayment = async (id: string) => {
  const response = await requestWithFallback((apiUrl) => axios.delete(`${apiUrl}/deletePayment/${id}`));
  return response.data;
};
