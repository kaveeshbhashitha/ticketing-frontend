import axios from "axios";
import { getReservationsByUserId } from "./ReservationService";

// Two API URLs
const API_URL_1 = "https://ticketing-backend-production-088a.up.railway.app/api/events";
const API_URL_2 = "http://localhost:8080/api/events";
const token = sessionStorage.getItem("token");

// Helper function to attempt requests on both APIs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestWithFallback = async (requestFunc: { (apiUrl: any): Promise<any> }) => {
  try {
    return await requestFunc(API_URL_1);  // Try the first API URL
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error(`API 1 failed, trying API 2: ${(error as any).message}`);
    return await requestFunc(API_URL_2);  // Fallback to the second API URL
  }
};

// Function to add an event
export const addEvent = async (formData: FormData): Promise<unknown> => {
  const response = await requestWithFallback((apiUrl) =>
    axios.post(`${apiUrl}/addEvent`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
  );
  return response.data;
};

// Function to get event by ID
export const getEventById = async (eventId: string | undefined): Promise<unknown> => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getEvent/${eventId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
  return response.data;
};

// Function to get general events
export const getGeneralEvents = async (): Promise<unknown> => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`));
  const filteredEvents = response.data.filter(
    (event: { eventType: string; status: string }) =>
      event.eventType === "generalEvent" && event.status !== "Cancelled"
  );
  return filteredEvents;
};

// Function to get sports events
export const getAllSports = async (): Promise<unknown> => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
  const filteredEvents = response.data.filter(
    (event: { eventType: string; status: string }) =>
      event.eventType === "sports" && event.status !== "Cancelled"
  );
  return filteredEvents;
};

// Function to get theater events
export const getAllTheater = async (): Promise<unknown> => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
  const filteredEvents = response.data.filter(
    (event: { eventType: string; status: string }) =>
      event.eventType === "theater" && event.status !== "Cancelled"
  );
  return filteredEvents;
};

// Function to get all "other" events
export const getAllOtherEvents = async () => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
  const filteredEvents = response.data.filter(
    (event: { eventType: string; status: string }) =>
      event.eventType === "otherEvent" && event.status !== "Cancelled"
  );
  return filteredEvents;
};

// Function to delete an event
export const deleteEvent = async (id: string) => {
  const response = await requestWithFallback((apiUrl) =>
    axios.delete(`${apiUrl}/delete/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
  return response.data;
};

// Function to cancel an event
export const cancelEvent = async (eventId: string): Promise<void> => {
  try {
    await requestWithFallback((apiUrl) =>
      axios.put(`${apiUrl}/cancel/${eventId}`, null, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
    );
  } catch (error) {
    console.error("Error canceling event:", error);
    throw error;
  }
};

// Function to reschedule an event
export const rescheduleEvent = async (eventId: string): Promise<void> => {
  try {
    await requestWithFallback((apiUrl) =>
      axios.put(`${apiUrl}/reschedule/${eventId}`, null, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
    );
  } catch (error) {
    console.error("Error rescheduling event:", error);
    throw error;
  }
};

// Function to update an event
export const updateEvent = async (eventId: string, updatedEventData: FormData) => {
  try {
    const response = await requestWithFallback((apiUrl) =>
      axios.put(`${apiUrl}/update/${eventId}`, updatedEventData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
    );
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// Function to get all events
export const getAllEvents = async () => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
  const filteredEvents = response.data.filter(
    (event: { status: string }) => event.status !== "Cancelled"
  );
  return filteredEvents;
};

// Function to get all canceled events
export const getAllEventsCancelled = async () => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
  const filteredEvents = response.data.filter(
    (event: { status: string }) => event.status === "Cancelled"
  );
  return filteredEvents;
};

// Filter and sort events for front-page user interactions
export const getAllOtherEventDataForFrontEnd = async () => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
  const currentDateTime = new Date();

  const filteredEvents = response.data.filter(
    (event: { eventType: string; eventDate: string; startTime: string; status: string }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= currentDateTime && event.status !== "Cancelled";
    }
  );

  const sortedEvents = filteredEvents.sort(
    (a: { eventDate: string; startTime: string }, b: { eventDate: string; startTime: string }) => {
      const dateA = new Date(`${a.eventDate}T${a.startTime}`);
      const dateB = new Date(`${b.eventDate}T${b.startTime}`);
      return dateB.getTime() - dateA.getTime();
    }
  );

  return sortedEvents.slice(0, 6);
};

// Filter events without slicing for front-end user interactions
export const getAllOtherEventDataForFrontEndWithoutSort = async () => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );
  const currentDateTime = new Date();

  const filteredEvents = response.data.filter(
    (event: { eventType: string; eventDate: string; startTime: string; status: string }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= currentDateTime && event.status !== "Cancelled";
    }
  );

  const sortedEvents = filteredEvents.sort(
    (a: { eventDate: string; startTime: string }, b: { eventDate: string; startTime: string }) => {
      const dateA = new Date(`${a.eventDate}T${a.startTime}`);
      const dateB = new Date(`${b.eventDate}T${b.startTime}`);
      return dateB.getTime() - dateA.getTime();
    }
  );

  return sortedEvents;
};

//past events
export const getOldEventsForFrontEnd = async () => {
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  );

  const currentDateTime = new Date();

  // Filter only past events (events that have already happened)
  const pastEvents = response.data.filter(
    (event: { eventDate: string; startTime: string; status: string }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime < currentDateTime && event.status !== "Cancelled";
    }
  );

  // Sort past events from newest to oldest
  const sortedPastEvents = pastEvents.sort(
    (a: { eventDate: string; startTime: string }, b: { eventDate: string; startTime: string }) => {
      const dateA = new Date(`${a.eventDate}T${a.startTime}`);
      const dateB = new Date(`${b.eventDate}T${b.startTime}`);
      return dateB.getTime() - dateA.getTime(); // Newest past events first
    }
  );

  return sortedPastEvents;
};







export const getEventsInThisWeek = async () => {
  // Retrieve the authorization token from session storage
  //const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Authorization token is missing.");

  // Define a function that includes the headers with the request
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  const { start, end } = getStartAndEndOfWeek();

  // Filter events that fall within the current week
  const filteredEvents = response.data.filter(
    (event: { eventDate: string; startTime: string }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= start && eventDateTime <= end;
    }
  );

  return filteredEvents;
};

export const getEventsInThisMonth = async () => {
  if (!token) throw new Error("Authorization token is missing.");

  // Make a request with authorization header
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
  );

  const { start, end } = getStartAndEndOfMonth(); 

  // Filter events that fall within the current month
  const filteredEvents = response.data.filter(
    (event: { eventDate: string; startTime: string }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= start && eventDateTime <= end;
    }
  );

  return filteredEvents;
};

export const getEventsInThisYear = async () => {
  if (!token) throw new Error("Authorization token is missing.");

  // Make a request with authorization header
  const response = await requestWithFallback((apiUrl) =>
    axios.get(`${apiUrl}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers
      },
    })
  );

  const { start, end } = getStartAndEndOfYear();

  // Filter events that fall within the current year
  const filteredEvents = response.data.filter(
    (event: { eventDate: string; startTime: string }) => {
      const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
      return eventDateTime >= start && eventDateTime <= end;
    }
  );

  return filteredEvents;
};

export const getEventsByUserId = async (userId: string) => {
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

    return events;
  } catch (error) {
    console.error("Error fetching events by userId:", error);
    throw error;
  }
};

// Utility function to get the start and end of the current week
const getStartAndEndOfWeek = () => {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  const endOfWeek = new Date(currentDate);

  const dayOfWeek = currentDate.getDay();
  const diffToStartOfWeek = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Sunday (0) or other days
  const diffToEndOfWeek = 6 - dayOfWeek; // Adjust for end of the week (Saturday)

  startOfWeek.setDate(currentDate.getDate() + diffToStartOfWeek);
  endOfWeek.setDate(currentDate.getDate() + diffToEndOfWeek);

  startOfWeek.setHours(0, 0, 0, 0);
  endOfWeek.setHours(23, 59, 59, 999);

  return { start: startOfWeek, end: endOfWeek };
};

// Utility function to get the start and end of the current month
const getStartAndEndOfMonth = () => {
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  startOfMonth.setHours(0, 0, 0, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  return { start: startOfMonth, end: endOfMonth };
};

// Utility function to get the start and end of the current year
const getStartAndEndOfYear = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

  startOfYear.setHours(0, 0, 0, 0);
  endOfYear.setHours(23, 59, 59, 999);

  return { start: startOfYear, end: endOfYear };
};