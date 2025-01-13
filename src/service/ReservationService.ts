import axios from "axios";

const API_URL = "https://ticketing-backend.railway.internal:8080/reservation";

export function addReservation(userId: string, eventId: string, numOfTickets: number, totalCharge: number, perTicketCharge: number) {
    return axios.post(`${API_URL}/addReservation`, { userId, eventId, numOfTickets, totalCharge, perTicketCharge });
}

export async function getReservationsByUserId(userId: string) {
    const response = await axios.get(`${API_URL}/getReservationByUserId/${userId}`);
    return response.data;
}

export async function getReservationById(reservationId: string) {
    const response = await axios.get(`${API_URL}/getReservationById/${reservationId}`);
    return response.data;
}

export async function getAllReservations() {
    const response = await axios.get(`${API_URL}/getAllReservations`);
    return response.data;
}

export const deleteReservation = async (id: string) => {
    const response = await axios.delete(`${API_URL}/deleteReservation/${id}`);
    return response.data;
};

export function updateStatus(reservationId: string) {
    return axios.post(`${API_URL}/cancelReservation`, null, {
      params: {
        reservationId,
      },
    });
  }
