import React, { useEffect, useState } from "react";
import { getAllOtherEventDataForFrontEnd } from "../../service/EventService";
import { Event } from "../../interfaces/Event";
import "../../styles/HomeSpeecker.css";
import { Link } from "react-router-dom";

const HomeSpeecker: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllOtherEventDataForFrontEnd();
        if (eventList && eventList.length > 0) {
          setEvents(eventList);
        } else {
          console.error("No events found to display.");
        }
      } catch (error) {
        console.error("Error fetching event data.");
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="speakers" className="wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>All Events</h2>
          <p>Here are some of our Events</p>
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
                    {/* Use Link component to navigate to the event description page */}
                    <Link
                      to={`/event/${event.eventId}`}
                      title={event.eventName}
                    >
                      {event.eventName.length > 20
                        ? `${event.eventName.substring(0, 26)}...`
                        : event.eventName}
                    </Link>
                  </h3>
                  <span className="test">{event.eventDate}</span> <br />
                  <span className="test">
                    {event.startTime} to {event.endTime}
                  </span>
                  <span className="test">
                    <br />
                    <i className="fa-solid fa-location-dot rightgap"></i> At{" "}
                    {event.eventVenue}
                  </span>
                  <br />
                  <span className="test">
                    {event.oneTicketPrice}.00 LKR upwards
                  </span><br />
                  <span className="test">
                    <Link
                      to={`/AllEventsVideo/${event.eventId}`}
                      className="event-link"
                    >
                      ----{">"}Video{"<"}----
                    </Link>
                  </span>
                  <div className="social">
                    <Link to={`/reservation/${event.eventId}`}>
                      <i className="fa-solid fa-cart-shopping py-2">
                        &nbsp;Buy Tickets
                      </i>
                    </Link>
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

export default HomeSpeecker;
