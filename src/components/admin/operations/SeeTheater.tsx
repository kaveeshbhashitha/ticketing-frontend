import React, { useEffect, useState } from "react";
import { deleteEvent, getAllTheater } from "../../../service/EventService";
import { Event } from "../../../interfaces/Event";

const SeeTheater: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllTheater() as Event[];
        if (eventList && eventList.length > 0) {
          setEvents(eventList);
          setFilteredEvents(eventList); 
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

  const handleDelete = async (id: string) => {
    try {
      const confirmRespond = confirm("Are you sure to delete this record?");
      if (confirmRespond) {
        await deleteEvent(id);
        setEvents((prev) => prev.filter((event) => event.eventId !== id));
        setFilteredEvents((prev) => prev.filter((event) => event.eventId !== id));
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const lowerCaseQuery = query.toLowerCase();
    const filtered = events.filter(
      (event) =>
        event.eventName.toLowerCase().includes(lowerCaseQuery) ||
        event.eventVenue.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredEvents(filtered);
  };

  return (
    <div>
      {error && (
        <div className="alert alert-warning d-flex justify-content-between">
          {error} <i className="fa-solid fa-circle-exclamation pt-1"></i>
        </div>
      )}

      <div className="table-container">
        <h5>Drama and Theater</h5>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Event Name or Venue"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {filteredEvents.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Venue</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Max</th>
                <th>Time 01</th>
                <th>Time 02</th>
                <th>Duration</th>
                <th>Organizer</th>
                <th>Action</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.eventId}>
                  <td>
                    <abbr title={event.eventId}>#</abbr>
                  </td>
                  <td>{event.eventVenue}</td>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.maxPerson}</td>
                  <td>{event.theaterTime1}</td>
                  <td>{event.theaterTime2}</td>
                  <td>{event.duration}</td>
                  <td>{event.eventOrganizer}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(event.eventId)}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
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
          <div className="alert alert-warning" role="alert">No events to display.</div>
        )}
      </div>
    </div>
  );
};

export default SeeTheater;
