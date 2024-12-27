import axios from "axios";

// Base API URL
const API_URL = "http://localhost:8080/events"; 

// Function for adding an event with formData
export const addEvent = async (formData: FormData): Promise<unknown> => {
  const response = await axios.post(`${API_URL}/addEvent`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};