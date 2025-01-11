import axios from "axios";

const API_URL = "http://localhost:8080/payment";

export const makePayment = async (formData: FormData): Promise<string> => {
  const response = await axios.post(`${API_URL}/process`, formData);
  return response.data;
};