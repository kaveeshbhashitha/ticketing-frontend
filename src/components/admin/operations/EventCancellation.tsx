import React, { useState, useEffect } from "react";
import SideBar from "../layout/SideBar"; // Sidebar component import
import { cancelEvent, getAllEvents } from "../../../service/EventService"; // Make sure to implement this service
import { Event } from "../../../interfaces/Event"; // Assuming you have an Event interface

const EventCancellation: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Fetch all events when the component mounts
    const fetchEvents = async () => {
      try {
        const eventData = await getAllEvents(); // Fetch events from the backend
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
        setMessage("Failed to load events.");
      }
    };

    fetchEvents();
  }, []);

  const handleCancelEvent = async (eventId: string) => {
    try {
      // Call the API to cancel the event (implement this logic in the backend)
      // Assuming the API endpoint is 'cancelEvent' and it requires the event ID
      await cancelEvent(eventId); // Make sure to implement this function in your service
      setMessage(`Event with ID ${eventId} has been canceled.`);
      // Optionally, remove the event from the list to reflect the cancellation
      setEvents(events.filter((event) => event.eventId !== eventId));
    } catch (error) {
      console.error("Error canceling event:", error);
      setMessage("Failed to cancel the event.");
    }
  };

  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar /> {/* Add the Sidebar component */}

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 my-1">
                <span className="text-muted fw-light">Events /</span> Cancel Event
              </h4>

              {message && <div className="alert alert-info">{message}</div>}

              <div className="list-group">
                {events.map((event) => (
                  <div key={event.eventId} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{event.eventName}</h5>
                      <p>{event.eventDate} - {event.eventVenue}</p>
                    </div>
                    <button className="btn btn-danger" onClick={() => handleCancelEvent(event.eventId)}>
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCancellation;
