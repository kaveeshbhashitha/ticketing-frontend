import axios from "axios";

const API_URL = "http://localhost:8080/reservation";

export function addReservation(userId: string, eventId: string, numOfTickets: number, totalCharge: number, perTicketCharge: number) {
    return axios.post(`${API_URL}/addReservation`, { userId, eventId, numOfTickets, totalCharge, perTicketCharge });
}