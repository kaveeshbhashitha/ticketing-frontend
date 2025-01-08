import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Event } from '../../interfaces/Event';
import { getEventById } from '../../service/EventService';

const Reservation: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (err) {
        setError("Failed to fetch event details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div className="text-center mt-5">Loading event details...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  if (!event) {
    return <div className="alert alert-warning mt-5">No event data available.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title text-center">{event.eventName}</h3>
        </div>
        <div className="card-body">
          <img
            src={`http://localhost:8080${event.eventImagePath}`}
            alt={event.eventName}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
          <p className="mb-2">
            <strong>Organizer:</strong> {event.eventOrganizer}
          </p>
          <p className="mb-2">
            <strong>Date:</strong> {event.eventDate}
          </p>
          <p className="mb-2">
            <strong>Time:</strong> {event.startTime}
          </p>
          <p className="mb-2">
            <strong>Venue:</strong> {event.eventVenue}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {event.description}
          </p>
          <p className="mb-2">
            <strong>Price:</strong> Rs.{event.oneTicketPrice}.00 per ticket
          </p>
          <p className="mb-2">
            <strong>Available Tickets:</strong> {event.numOfTickets}
          </p>
          <p className="mb-2">
            <strong>Event For:</strong> {event.eventIsFor}
          </p>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-success">Reserve Now</button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;