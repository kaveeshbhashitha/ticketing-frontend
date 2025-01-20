import React, { useEffect, useState } from "react";
import Footer from "../../layout/Footer";
import Chatbot from "../../chatbot/Chatbot";
import EventHeader from "./EventHeader";
import EventAbout from "./EventAbout";
import {useParams } from "react-router-dom";
import { getEventById } from "../../../service/EventService";
import { Event } from "../../../interfaces/Event";
import { useNavigate } from 'react-router-dom';

const AllEventsVideo: React.FC = () => {
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
    <body>
        <div>
            <EventHeader/>
            {/* <HomeIntro /> */}
            <EventAbout />
            <div className="container mt-5">
    
        <div className="mt-4 text-center">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${event.videoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded"
          ></iframe>
        </div>
      <button onClick={() => window.location.href = "/AllEvents"} className="btn btn-secondary me-3 btn-lg">Back</button>&nbsp;&nbsp;&nbsp;
      <button onClick={handleGoBack} className="btn btn-primary btn-lg">Buy Tickets</button >
    </div><br />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default AllEventsVideo;
