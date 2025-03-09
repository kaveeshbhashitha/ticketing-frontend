import React, { useEffect, useState } from "react";
import {
  getEventById,
  getOldEventsForFrontEnd,
  updateEvent,
} from "../../../service/EventService";
import { Event } from "../../../interfaces/Event";
import { useNavigate } from "react-router-dom";
import "../../../styles/HomeSpeecker.css";
import useAuthCheck from "../../../useAuthCheck";
import axios from "axios";

const UpdateOldEvent: React.FC = () => {
  useAuthCheck(['ADMIN']);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData] = useState<FormData>(new FormData());
  const [youtubeSearchQuery, setYoutubeSearchQuery] = useState<string>("");
  const [videoId, setVideoId] = useState<string | null>(null); // Store the selected video ID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getOldEventsForFrontEnd();
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEditClick = async (eventId: string) => {
    try {
      const event = await getEventById(eventId);
      setSelectedEvent(event as Event);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSelectedEvent((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formData.set("image", e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (!selectedEvent) return;

    formData.set("eventId", selectedEvent.eventId);
    formData.set("eventName", selectedEvent.eventName);
    formData.set("eventDate", selectedEvent.eventDate);
    formData.set("startTime", selectedEvent.startTime);
    formData.set("endTime", selectedEvent.endTime);
    formData.set("eventVenue", selectedEvent.eventVenue);
    formData.set("oneTicketPrice", selectedEvent.oneTicketPrice.toString());
    formData.set("description", selectedEvent.description);
    formData.set("videoId", selectedEvent.videoId);
   /* if (selectedEvent.imageData) {
      formData.set("image", selectedEvent.imageData);
    }*/
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      await updateEvent(selectedEvent.eventId, formData);
      navigate("/UpdateAndDeleteEvent");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
    

    // If a videoId is selected, include it in the form data
    if (videoId) {
      selectedEvent.videoId = videoId;
      formData.set("videoId", selectedEvent.videoId);
    }

    try {
      await updateEvent(selectedEvent.eventId, formData);
      alert("Event updated successfully!");
      navigate("/dashboard"); // Refresh the page to reflect the updated event
    } catch (error) {
      console.error("Error updating event:", error);
     
    }
  };

  const handleYoutubeSearch = async () => {
    if (!youtubeSearchQuery) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            q: youtubeSearchQuery,
            type: "video",
            key: "AIzaSyCbT-UdwjhpmyfcxZdTGZWhdh9VYDXZ18o", // Replace with your YouTube API key
          },
        }
      );
      const video = response.data.items[0];
      if (video) {
        setVideoId(video.id.videoId);
        alert(`Found video: ${video.snippet.title}`);
      } else {
        alert("No video found.");
      }
    } catch (error) {
      console.error("Error searching YouTube:", error);
      alert("Failed to search YouTube.");
    }
  };

  return (
    <section id="update-events" className="wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Update Events</h2>
          <p>Select an event to update its details</p>
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
                  <h3>{event.eventName}</h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditClick(event.eventId)}
                  >
                    Edit Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />

        {selectedEvent && (
          <div className="update-form">
            <h3>Update Event: {selectedEvent.eventName}</h3>
            <form>
              <div className="form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  value={selectedEvent.eventName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={selectedEvent.eventDate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={selectedEvent.startTime}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={selectedEvent.endTime}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Event Venue</label>
                <input
                  type="text"
                  name="eventVenue"
                  value={selectedEvent.eventVenue}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Ticket Price</label>
                <input
                  type="number"
                  name="oneTicketPrice"
                  value={selectedEvent.oneTicketPrice}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={selectedEvent.description}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>YouTube Video Search</label>
                <input
                  type="text"
                  value={youtubeSearchQuery}
                  onChange={(e) => setYoutubeSearchQuery(e.target.value)}
                  className="form-control"
                  placeholder="Search for a YouTube video"
                />
                <button
                  type="button"
                  onClick={handleYoutubeSearch}
                  className="btn btn-info"
                >
                  Search Video
                </button>
              </div>
              {videoId && (
                <div className="form-group">
                  <label>Selected Video</label>
                  <p>Video ID: {videoId}</p>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="form-group">
                <label>Video Id</label>
                <input
                  name="videoId"
                  value={videoId || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Event Image</label>
                <input
                  name="image"
                  type="file"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>

              <button
                type="button"
                onClick={handleUpdate}
                className="btn btn-success"
              >
                Update Event
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdateOldEvent;
