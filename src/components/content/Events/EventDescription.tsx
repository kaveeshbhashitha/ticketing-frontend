import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEventById } from "../../../service/EventService";
import { Event } from "../../../interfaces/Event";
import "../../../styles/EventDescription.css"; 
import Header from "../../layout/Header";
import Chatbot from "../../chatbot/Chatbot";
import FooterEvent from "../../layout/FooterEvent";


const EventDescription: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);  // Goes back to the previous page
  };


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (eventId) {
          const eventData = await getEventById(eventId);
          setEvent(eventData);
        } else {
          setError("Invalid event ID.");
        }
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div className="text-center">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  if (!event) {
    return <div className="text-center text-danger">Event not found.</div>;
  }

  return (
    <body className="bg-dark text-white">
    <div>
      <Header/><br /><br />
    <section id="event-description" className=" container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`data:${event.contentType};base64,${event.imageData}`}
            alt={event.eventName}
            className="img-fluid rounded w-75 "
          />
        </div>
        <div className="col-md-6">
          <h2>{event.eventName}</h2>
          <p><strong>Date:</strong> {event.eventDate}</p>
          <p><strong>Time:</strong> {event.startTime} to {event.endTime}</p>
          <p><strong>Venue:</strong> {event.eventVenue}</p>
          <p><strong>Price:</strong> {event.oneTicketPrice}.00 LKR</p>
          <p><strong>Description:</strong> {event.description}</p>
          <div className="d-flex justify-content-start">
            <button onClick={handleGoBack} className="btn btn-secondary me-3">
              Back to Events
            </button>
            <Link to={`/reservation/${event.eventId}`} className="btn btn-primary">
              Buy Tickets
            </Link>
          </div>
        </div>
      </div>
    </section>
    <Chatbot />
    <FooterEvent />
    </div>
    </body>
  );
};

export default EventDescription;
