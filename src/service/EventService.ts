import axios from "axios";
import { getReservationsByUserId } from "./ReservationService";

const API_URL = "https://ticketing-backend.railway.internal/events";

export const addEvent = async (formData: FormData): Promise<unknown> => {
  const response = await axios.post(`${API_URL}/addEvent`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getEventById = async (eventId: string | undefined) => {
  const response = await axios.get(`${API_URL}/getEvent/${eventId}`);
  return response.data;
};

export const getGeneralEvents = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const filteredEvents = response.data.filter(
    (event: { eventType: string ,status:string }) => event.eventType === "generalEvent" && event.status !== "Cancelled"
  );
  return filteredEvents;
};

export const getAllSports = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const filteredEvents = response.data.filter(
    (event: { eventType: string ,status:string }) => event.eventType === "sports" && event.status !== "Cancelled"
  );
  return filteredEvents;
};

export const getAllTheater = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const filteredEvents = response.data.filter(
    (event: { eventType: string ,status:string}) => event.eventType === "theater" && event.status !== "Cancelled"
  );
  return filteredEvents;
};

export const getAllOtherEvents = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const filteredEvents = response.data.filter(
    (event: { eventType: string ,status:string }) => event.eventType === "otherEvent" && event.status !== "Cancelled"
  );
  return filteredEvents;
};

export const deleteEvent = async (id: string) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};

export const cancelEvent = async (eventId: string): Promise<void> => {
  try {
    // Assuming the API endpoint is 'DELETE /api/events/{eventId}'
    await axios.put(`${API_URL}/cancel/${eventId}`);
  } catch (error) {
    console.error("Error canceling event:", error);
    throw error;
  }
};

export const rescheduleEvent = async (eventId: string): Promise<void> => {
  try {
    await axios.put(`${API_URL}/reschedule/${eventId}`);
  } catch (error) {
    console.error("Error reschedule event:", error);
    throw error;
  }
};

export const updateEvent = async (eventId: string, updatedEventData: FormData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${eventId}`, updatedEventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};


export const getAllEvents = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const filteredEvents = response.data.filter(
    (event: {status:string }) => event.status !== "Cancelled"
  );
  return filteredEvents;
};

export const getAllEventsCancelled = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const filteredEvents = response.data.filter(
    (event: {status:string }) => event.status == "Cancelled"
  );
  return filteredEvents;
};

//filter events for front page user interactions
export const getAllOtherEventDataForFrontEnd = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const currentDateTime = new Date();

  const filteredEvents = response.data.filter(
    (event: { eventType: string; eventDate: string; startTime: string ,status:string  }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= currentDateTime && event.status !== "Cancelled";
    }
  );
  const sortedEvents = filteredEvents.sort((a: { eventDate: string; startTime: string }, b: { eventDate: string; startTime: string }) => {
    const dateA = new Date(`${a.eventDate}T${a.startTime}`);
    const dateB = new Date(`${b.eventDate}T${b.startTime}`);
    return dateB.getTime() - dateA.getTime();
  });
  return sortedEvents.slice(0, 6);
};

export const getAllOtherEventDataForFrontEndWithoutSort = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const currentDateTime = new Date();

  const filteredEvents = response.data.filter(
    (event: { eventType: string; eventDate: string; startTime: string ,status:string }) => {const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= currentDateTime && event.status !== "Cancelled";
    }
  );
  const sortedEvents = filteredEvents.sort((a: { eventDate: string; startTime: string }, b: { eventDate: string; startTime: string }) => {
    const dateA = new Date(`${a.eventDate}T${a.startTime}`);
    const dateB = new Date(`${b.eventDate}T${b.startTime}`);
    return dateB.getTime() - dateA.getTime();
  });
  return sortedEvents;
};


const getStartAndEndOfWeek = (): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date(now.setDate(now.getDate() - now.getDay()));
  start.setHours(0, 0, 0, 0); 

  const end = new Date(now.setDate(start.getDate() + 6));
  end.setHours(23, 59, 59, 999); 

  return { start, end };
};

const getStartAndEndOfMonth = (): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const getStartAndEndOfYear = (): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const getEventsInThisWeek = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const { start, end } = getStartAndEndOfWeek();

  const filteredEvents = response.data.filter(
    (event: { eventDate: string; startTime: string }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= start && eventDateTime <= end;
    }
  );

  return filteredEvents;
};

export const getEventsInThisMonth = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const { start, end } = getStartAndEndOfMonth();

  const filteredEvents = response.data.filter(
    (event: { eventDate: string; startTime: string }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= start && eventDateTime <= end;
    }
  );

  return filteredEvents;
};

export const getEventsInThisYear = async () => {
  const response = await axios.get(`${API_URL}/getAll`);
  const { start, end } = getStartAndEndOfYear();

  const filteredEvents = response.data.filter(
    (event: { eventDate: string; startTime: string }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= start && eventDateTime <= end;
    }
  );

  return filteredEvents;
};

export async function getEventsByUserId(userId: string) {
  try {
    const reservations = await getReservationsByUserId(userId);

    if (!Array.isArray(reservations)) {
      throw new Error("Invalid reservations data returned.");
    }

    const eventIds = reservations
      .map((res) => res.eventId)
      .filter((eventId) => !!eventId);

    const eventPromises = eventIds.map((eventId) => getEventById(eventId));
    const events = await Promise.all(eventPromises);

    //console.log("All fetched events:", events);
    return events;
  } catch (error) {
    console.error("Error fetching events by userId:", error);
    throw error;
  }
}

