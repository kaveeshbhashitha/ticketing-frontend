import axios from "axios";

const API_URL = "https://ticketing-backend-production-088a.up.railway.app/payment";

export const makePayment = async (formData: FormData): Promise<string> => {
  const response = await axios.post(`${API_URL}/process`, formData);
  return response.data;
};

export async function getAllPayment() {
  const response = await axios.get(`${API_URL}/getAllPayment`);
  return response.data;
}

export const deletePayment = async (id: string) => {
  const response = await axios.delete(`${API_URL}/deletePayment/${id}`);
  return response.data;
};