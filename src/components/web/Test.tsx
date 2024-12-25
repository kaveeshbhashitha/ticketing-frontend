import React, { useState } from "react";
import axios from "axios";

const EventForm: React.FC = () => {
    const [event, setEvent] = useState({
        eventName: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        eventVenue: "",
        eventOrganizer: "",
        description: "",
        oneTicketPrice: "",
        eventType: "",
        eventIsFor: "",
        numOfTickets: "",
        teamOne: "",
        teamTwo: "",
        maxPerson: "",
        duration: "",
        theaterTime1: "",
        theaterTime2: "",
        theaterIsFor: "",
    });
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Create a FormData object to send the event and file data
        const formData = new FormData();
        formData.append("event", JSON.stringify(event)); // Serialize event as JSON string and append
        if (file) {
            formData.append("imageFile", file); // Append the file with the correct key ("imageFile")
        }
    
        try {
            // Send the POST request with formData, and ensure the correct content type
            const response = await axios.post("http://localhost:8080/events/addEvent", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",  // Ensure this is set properly
                },
            });
            console.log(response.data); // Handle the success response
        } catch (error) {
            console.error("There was an error uploading the event!", error);
        }
    };
    

    return (
        <div>
            <h1>Event Upload Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Event Name:</label>
                <input
                    type="text"
                    name="eventName"
                    value={event.eventName}
                    onChange={handleChange}
                    required
                />

                <label>Event Date:</label>
                <input
                    type="date"
                    name="eventDate"
                    value={event.eventDate}
                    onChange={handleChange}
                    required
                />

                <label>Start Time:</label>
                <input
                    type="time"
                    name="startTime"
                    value={event.startTime}
                    onChange={handleChange}
                    required
                />

                <label>End Time:</label>
                <input
                    type="time"
                    name="endTime"
                    value={event.endTime}
                    onChange={handleChange}
                    required
                />

                <label>Event Venue:</label>
                <input
                    type="text"
                    name="eventVenue"
                    value={event.eventVenue}
                    onChange={handleChange}
                    required
                />

                <label>Event Organizer:</label>
                <input
                    type="text"
                    name="eventOrganizer"
                    value={event.eventOrganizer}
                    onChange={handleChange}
                    required
                />

                <label>Description:</label>
                <input
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                    required
                />

                <label>One Ticket Price:</label>
                <input
                    type="number"
                    name="oneTicketPrice"
                    value={event.oneTicketPrice}
                    onChange={handleChange}
                    required
                />

                <label>Event Type:</label>
                <input
                    type="text"
                    name="eventType"
                    value={event.eventType}
                    onChange={handleChange}
                    required
                />

                <label>Event is For:</label>
                <input
                    type="text"
                    name="eventIsFor"
                    value={event.eventIsFor}
                    onChange={handleChange}
                    required
                />

                <label>Number of Tickets:</label>
                <input
                    type="number"
                    name="numOfTickets"
                    value={event.numOfTickets}
                    onChange={handleChange}
                    required
                />

                <label>Team One:</label>
                <input
                    type="text"
                    name="teamOne"
                    value={event.teamOne}
                    onChange={handleChange}
                    required
                />

                <label>Team Two:</label>
                <input
                    type="text"
                    name="teamTwo"
                    value={event.teamTwo}
                    onChange={handleChange}
                    required
                />

                <label>Max Person:</label>
                <input
                    type="number"
                    name="maxPerson"
                    value={event.maxPerson}
                    onChange={handleChange}
                    required
                />

                <label>Duration:</label>
                <input
                    type="text"
                    name="duration"
                    value={event.duration}
                    onChange={handleChange}
                    required
                />

                <label>Theater Time 1:</label>
                <input
                    type="time"
                    name="theaterTime1"
                    value={event.theaterTime1}
                    onChange={handleChange}
                    required
                />

                <label>Theater Time 2:</label>
                <input
                    type="time"
                    name="theaterTime2"
                    value={event.theaterTime2}
                    onChange={handleChange}
                    required
                />

                <label>Theater is For:</label>
                <input
                    type="text"
                    name="theaterIsFor"
                    value={event.theaterIsFor}
                    onChange={handleChange}
                    required
                />

                <label>Event Image:</label>
                <input
                    type="file"
                    name="events"
                    onChange={handleFileChange}
                    required
                />

                <button type="submit">Submit Event</button>
            </form>
        </div>
    );
};

export default EventForm;
