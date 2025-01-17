import axios, { AxiosResponse } from "axios";

// Two API URLs for fallback
const API_URL_1 = "https://ticketing-backend-production-088a.up.railway.app/reservation";
const API_URL_2 = "http://localhost:8080/reservation";  // Replace with the second API URL

// Helper function to attempt requests on both APIs
const requestWithFallback = async (requestFunc: { (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (apiUrl: any): Promise<AxiosResponse<any, any>>; (arg0: string): any; }) => {
  try {
    return await requestFunc(API_URL_1);  // Try the first API URL
  } catch (error) {
    console.error(`API 1 failed, trying API 2: ${(error as any).message}`);
    return await requestFunc(API_URL_2);  // Fallback to the second API URL
  }
};

export function addReservation(userId: string, eventId: string, numOfTickets: number, totalCharge: number, perTicketCharge: number) {
    return requestWithFallback((apiUrl) => axios.post(`${apiUrl}/addReservation`, { userId, eventId, numOfTickets, totalCharge, perTicketCharge }));
}

export async function getReservationsByUserId(userId: string) {
    const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getReservationByUserId/${userId}`));
    return response.data;
}

export async function getReservationById(reservationId: string) {
    const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getReservationById/${reservationId}`));
    return response.data;
}

export async function getAllReservations() {
    const response = await requestWithFallback((apiUrl) => axios.get(`${apiUrl}/getAllReservations`));
    return response.data;
}

export const deleteReservation = async (id: string) => {
    const response = await requestWithFallback((apiUrl) => axios.delete(`${apiUrl}/deleteReservation/${id}`));
    return response.data;
};

export function updateStatus(reservationId: string) {
    return requestWithFallback((apiUrl) => axios.post(`${apiUrl}/cancelReservation`, null, {
      params: {
        reservationId,
      },
    }));
}
