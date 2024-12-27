import React, { useEffect, useState } from "react";
import { getAllSports } from "../../../service/EventService";

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

const SeeAllSports: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllSports();
        if (eventList && eventList.length > 0) {
          setEvents(eventList);
          setError(""); 
        } else {
          setError("No events found to display.");
        }
      } catch (error) {
        setError("Error fetching event data.");
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {error && (
        <div className="alert alert-warning d-flex justify-content-between">
          {error} <i className="fa-solid fa-circle-exclamation pt-1"></i>
        </div>
      )}
      <div className="table-container">
        <h5>Sport and Match</h5>
        {events.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Venue</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Max</th>
                <th>Team 01</th>
                <th>Team 02</th>
                <th>Organizer</th>
                <th>Action</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventId}>
                  <td><abbr title={event.eventId}>#</abbr></td>
                  <td>{event.eventVenue}</td>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.startTime}</td>
                  <td>{event.maxPerson}</td>
                  <td>{event.teamOne}</td>
                  <td>{event.teamTwo}</td>
                  <td>{event.eventOrganizer}</td>
                  <td className="text-center">
                    <a
                      href={event.eventImagePath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        <i className="fa-solid fa-trash"></i>
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

export default SeeAllSports;

