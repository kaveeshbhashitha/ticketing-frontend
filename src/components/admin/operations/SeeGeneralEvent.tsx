import axios from "axios";
import React, { useEffect, useState } from "react";

// Define Event interface
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
  imageData?: string;
  contentType?: string;
}

const SeeGeneralEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // State to hold an array of events
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch event data from backend
    axios
      .get<Event[]>("http://localhost:8080/events/getAll") // Specify the return type
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setEvents(response.data);
        } else {
          setError("No events found to display.");
        }
      })
      .catch(() => {
        setError("Error fetching event data.");
      });
  }, []);

  return (
    <div>
      {error && (
        <div className="alert alert-warning d-flex justify-content-between">
          {error} <i className="fa-solid fa-circle-exclamation pt-1"></i>
        </div>
      )}
      <div className="table-container">
        <h5>General Event Data</h5>
        {events.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Unique ID</th>
                <th>Event Type</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Action</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventId}>
                  <td>{event.eventId}</td>
                  <td>{event.eventType}</td>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  <td className="text-center">
                    <a
                      href={event.eventImagePath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-regular fa-trash"></i>
                    </a>
                  </td>
                  {event.imageData && (
                    <td className="center-column">
                      <img
                        src={`data:${event.contentType};base64,${event.imageData}`}
                        alt="Event"
                        className="tableimg"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-warning" role="alert">
            No events to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeGeneralEvent;
