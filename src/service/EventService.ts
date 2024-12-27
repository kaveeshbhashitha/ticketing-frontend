import axios from "axios";

const API_URL = "http://localhost:8080/events"; 

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

export const deleteEvent = async (id: string) => { 
  const response = await axios.delete(`${API_URL}/delete/${id}`); 
  return response.data; 
};   
 