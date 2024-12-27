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

export const getGeneralEvents = async () => { 
  const response = await axios.get(`${API_URL}/getAll`);
  const filteredEvents = response.data.filter((event: { eventType: string }) => event.eventType === "generalEvent");
  return filteredEvents;
};

export const getAllSports = async () => { 
  const response = await axios.get(`${API_URL}/getAll`);
  const filteredEvents = response.data.filter((event: { eventType: string }) => event.eventType === "sports");
  return filteredEvents;
};

export const getAllTheater = async () => { 
  const response = await axios.get(`${API_URL}/getAll`);
  const filteredEvents = response.data.filter((event: { eventType: string }) => event.eventType === "theater");
  return filteredEvents;
};
 