import React, { useState } from "react";
import axios from "axios";

interface Event {
  eventId: string;
  eventName: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventVenue: string;
  eventOrganizer: string;
  description: string;
  oneTicketPrice: number;
  eventType: string;
  eventIsFor: string;
  numOfTickets: number;
  teamOne: string;
  teamTwo: string;
  maxPerson: number;
  duration: string;
  theaterTime1: string;
  theaterTime2: string;
  theaterIsFor: string;
  dateAdded: string;
  timeAdded: string;
  eventImagePath: string;
  imageData: string;
  contentType: string;
}

const EventWithInput = () => {
  const [eventId, setEventId] = useState<string>("");
  const [eventData, setEventData] = useState<Event | null>(null);  // Using Event type
  const [error, setError] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!eventId) {
      setError("Event ID cannot be empty.");
      return;
    }
    try {
      setError("");
      // Fetch event data from backend
      const response = await axios.get<Event>(`http://localhost:8080/events/getEvent/${eventId}`);
      setEventData(response.data);
    } catch (err) {
      setError("Event not found or there was an error fetching data.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Search Event by ID</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={eventId}
          onChange={handleInputChange}
          placeholder="Enter Event ID"
        />
        <button type="submit">Search Event</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {eventData && (
        <div>
          <h3>Event Details</h3>
          <p><strong>Event Name:</strong> {eventData.eventName}</p>
          <p><strong>Event Date:</strong> {eventData.eventDate}</p>
          <p><strong>Start Time:</strong> {eventData.startTime}</p>
          <p><strong>End Time:</strong> {eventData.endTime}</p>
          <p><strong>Event Venue:</strong> {eventData.eventVenue}</p>
          <p><strong>Organizer:</strong> {eventData.eventOrganizer}</p>
          {eventData.imageData && (
            <div>
              <h4>Event Image:</h4>
              <img
                src={`data:${eventData.contentType};base64,${eventData.imageData}`} // Data URL format
                alt="Event"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventWithInput;
