import React, { useEffect, useState } from "react";
import { getAllOtherEventDataForFrontEndWithoutSort, getEventById, addEvent } from "../../../service/EventService";
import { Event } from "../../../interfaces/Event";
import { useNavigate } from "react-router-dom";
import "../../../styles/HomeSpeecker.css";

const UpdateEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllOtherEventDataForFrontEndWithoutSort();
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
      setSelectedEvent(event);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    try {
      await addEvent(formData);
      alert("Event updated successfully!");
      navigate(0); // Refresh the page
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
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
        <br /><br /><br />

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
                <label>Event Image</label>
                <input
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

export default UpdateEvent;
