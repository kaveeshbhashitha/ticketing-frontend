import axios from "axios";

const API_URL = "https://ticketing-backend-production-088a.up.railway.app/notification";

export async function getAllNotification() {
    const response = await axios.get(`${API_URL}/getAllNotification`);
    return response.data;
}

export const deleteNotification = async (id: string) => {
    const response = await axios.delete(`${API_URL}/deleteNotification/${id}`);
    return response.data;
};