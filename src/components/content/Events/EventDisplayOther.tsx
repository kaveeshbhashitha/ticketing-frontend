import React, { useEffect, useState } from "react";
import { getAllOtherEvents } from "../../../service/EventService";
import { Event } from "../../../interfaces/Event";
import "../../../styles/HomeSpeecker.css";
import { Link } from "react-router-dom";

const EventDisplayOther: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllOtherEvents();
        if (eventList && eventList.length > 0) {
          setEvents(eventList);
          setFilteredEvents(eventList); // Initialize filtered events with all events
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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);

    if (date) {
      const filtered = events.filter((event) => event.eventDate === date);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events); // Reset to all events when no date is selected
    }
  };

  return (
    <section id="speakers" className="wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Other Events</h2>
          <p>Here are some of our Other Events</p>
        </div>

        {/* Date filter */}
        <div className="filter d-flex justify-content-end">
          <input
            type="date"
            className="form-control w-auto"
            id="eventDate"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="row">
          {filteredEvents.map((event) => (
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
                  </span>
                  <div className="social">
                    <Link to={`/reservation/${event.eventId}`}>
                      <i className="fa-solid fa-cart-shopping">
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

export default EventDisplayOther;
