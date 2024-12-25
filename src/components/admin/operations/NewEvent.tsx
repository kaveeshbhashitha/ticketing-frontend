import axios from "axios";
import React, { useState} from "react";

const NewEvent: React.FC = () => {
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
const [eventType, setEventType] = useState<string>("select");
const [eventIsFor, setEventIsFor] = useState<string>("");
const [successMessege, setSuccessMessege] = useState<string>("");
const [errorMessege, setErrorMessege] = useState<string>("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));

    if (name === "eventType") setEventType(value);
    if (name === "eventIsFor") setEventIsFor(value);
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setFile(e.target.files[0]);
    }
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("event", JSON.stringify(event));
    if (file) {
        formData.append("imageFile", file);
    }

    try {
        const response = await axios.post("http://localhost:8080/events/addEvent", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setSuccessMessege("Data inserted Successfully...!");
        console.log(response.data);
    } catch (error) {
      setErrorMessege("An error occured...! Insertion Not Success");
      console.error("There was an error uploading the event!", error);
    }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <hr className="my-0" />
              <div className="card-body">
                <div id="formAccountSettings">
                  {successMessege && (<div className="row">
                    <div className="alert alert-success">{successMessege}</div>
                  </div>)}
                  {errorMessege && (<div className="row">
                    <div className="alert alert-danger">{errorMessege}</div>
                  </div>)}
                  <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="eventName" className="form-label"> Event Name </label>
                        <input className="form-control" type="text" name="eventName" value={event.eventName} onChange={handleChange} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="category" className="form-label"> Event Type </label>
                      <select id="category" name="eventType" value={eventType} onChange={handleChange} className="form-control" >
                        <option value="select">-- Select Event Type --</option>
                        <option value="generalEvent">General Event</option>
                        <option value="sports">Sports</option>
                        <option value="theater">Theater</option>
                        <option value="otherEvent">Other Events</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Date </label>
                          <input className="form-control" type="date" name="eventDate" value={event.eventDate} onChange={handleChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Venue </label>
                          <input className="form-control" type="text" name="eventVenue" value={event.eventVenue} onChange={handleChange} />
                      </div>
                  </div>

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Start Time </label>
                          <input className="form-control" type="time" name="startTime" value={event.startTime} onChange={handleChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event End Time </label>
                          <input className="form-control" type="time" name="endTime" value={event.endTime} onChange={handleChange} />
                      </div>
                  </div>

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Organizer </label>
                          <input className="form-control" type="text" name="eventOrganizer" value={event.eventOrganizer} onChange={handleChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Available Tickets </label>
                          <input className="form-control" type="number" name="numOfTickets" value={event.numOfTickets} onChange={handleChange} />
                      </div>
                  </div>

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> One Ticket Price </label>
                          <input className="form-control" type="text" name="oneTicketPrice" value={event.oneTicketPrice} onChange={handleChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event is for </label>
                          <select id="category" className="form-control" name="eventIsFor" value={eventIsFor} onChange={handleChange}>
                            <option value="select">-- Select Event Type --</option>
                            <option value="generalEvent">Students</option>
                            <option value="sports">Teens</option>
                            <option value="theater">Adults</option>
                            <option value="otherEvent">Childs</option>
                            <option value="otherEvent">All</option>
                            <option value="otherEvent">Forigners Only</option>
                            <option value="otherEvent">Locals Only</option>
                          </select>
                      </div>
                  </div>
                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Limit of Participation </label>
                          <input className="form-control" type="text" name="maxPerson" value={event.maxPerson} onChange={handleChange} />
                      </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <h5 className="card-header">Sports and Match</h5>
              {/* <div className="alert alert-success mx-2 d-flex justify-content-between">
                <i className="fas fa-check-circle pt-1"></i>
              </div> */}
              <hr className="my-0" />
              <div className="card-body">
                <div id="formAccountSettings">

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Team 01 </label>
                          <input className="form-control" type="text" name="eventName" value={event.teamOne} onChange={handleChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Team 02 </label>
                          <input className="form-control" type="text" name="eventName" value={event.teamTwo} onChange={handleChange} />
                      </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <h5 className="card-header">Theater and Drama</h5>
              <hr className="my-0" />
              <div className="card-body">
                <div id="formAccountSettings">

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Theater Time 01 </label>
                          <input className="form-control" type="time" name="theaterTime1" value={event.theaterTime1} onChange={handleChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Theater Time 02 </label>
                          <input className="form-control" type="time" name="theaterTime2" value={event.theaterTime2} onChange={handleChange} />
                      </div>
                  </div>
                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Duration </label>
                          <input className="form-control" type="text" name="duration" value={event.duration} onChange={handleChange} />
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Theater is for </label>
                          <select id="category" className="form-control" name="theaterIsFor" value={event.theaterIsFor} onChange={handleChange}>
                            <option value="select">-- Select Event Type --</option>
                            <option value="generalEvent">Students</option>
                            <option value="sports">Teens</option>
                            <option value="theater">Adults</option>
                            <option value="otherEvent">Childs</option>
                            <option value="otherEvent">All</option>
                            <option value="otherEvent">Forigners Only</option>
                            <option value="otherEvent">Locals Only</option>
                          </select>
                      </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
            <div className="card-body">
                <div id="formAccountSettings">

                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="eventName" className="form-label"> Upload Image </label>
                        <input className="form-control" type="file" name="events" onChange={handleFileChange} required />
                    </div>
                </div>

                </div>
            </div>
        </div>

        <div className="mt-2">
            <button type="submit" className="btn btn-primary me-2">
            Save changes
            </button>
            <button type="reset" className="btn btn-outline-secondary">
            Cancel
            </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
