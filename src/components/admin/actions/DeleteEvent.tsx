import React, { useEffect, useState } from "react";
import { getAllOtherEventDataForFrontEndWithoutSort, deleteEvent } from "../../../service/EventService";
import { Event } from "../../../interfaces/Event";
import "../../../styles/HomeSpeecker.css";

const DeleteEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllOtherEventDataForFrontEndWithoutSort();
        if (eventList && eventList.length > 0) {
          setEvents(eventList);
        } else {
          console.error("No events found to display.");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this event?");
      if (!confirmation) return;

      await deleteEvent(eventId);
      setEvents(events.filter((event) => event.eventId !== eventId));
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete the event. Please try again.");
    }
  };

  return (
    <section id="speakers" className="wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Delete Events</h2>
          <p>Click on "Delete Event" to remove an event.</p>
        </div>

        <div className="row">
          {events.map((event) => (
            <div className="col-lg-4 col-md-6" key={event.eventId}>
              <div className="speaker">
                <img
                  src={`data:${event.contentType};base64,${event.imageData}`}
                  alt={event.eventName}
                  className="img-fluid"
                  style={{ height: "280px", width: "100%" }}
                />
                <div className="details">
                  <h3>
                    <a href="/" title={event.eventName}>
                      {event.eventName.length > 20
                        ? `${event.eventName.substring(0, 26)}...`
                        : event.eventName}
                    </a>
                  </h3>
                  <span className="test">{event.eventDate}</span> <br />
                  <span className="test">
                    {event.startTime} to {event.endTime}
                  </span>
                  <span className="test">
                    <br />
                    <i className="fa-solid fa-location-dot rightgap"></i> At {" "}
                    {event.eventVenue}
                  </span>
                  <br />
                  <span className="test">
                    {event.oneTicketPrice}.00 LKR upwards
                  </span>
                  <div className="social">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(event.eventId)}
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeleteEvent;
