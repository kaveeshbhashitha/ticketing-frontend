import React, { useState} from "react";
import { addEvent } from "../../../service/EventService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewEvent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ id: { videoId: string }; snippet: { title: string } }[]>([]);
  

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
    videoId: "",
});

const [file, setFile] = useState<File | null>(null);
const [eventType, setEventType] = useState<string>("select");
const [eventIsFor, setEventIsFor] = useState<string>("");
const [successMessege, setSuccessMessege] = useState<string>("");
const [errorMessege, setErrorMessege] = useState<string>("");
const navigate = useNavigate();

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

const isFormValid = () => {
  const requiredFields = [
    "eventName",
    "eventType",
    "eventDate",
    "eventVenue",
    "startTime",
    "endTime",
    "eventOrganizer",
    "numOfTickets",
    "oneTicketPrice",
    "eventIsFor",
    "videoId",
    
    
  ];

  for (const field of requiredFields) {
    if (!event[field as keyof typeof event]) {
      return false;
    }
  }
  return true; 
};

const handleSearch = async () => {
  try {
    const API_KEY = "AIzaSyCbT-UdwjhpmyfcxZdTGZWhdh9VYDXZ18o"; // Replace with your YouTube API key
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${API_KEY}`
    );
    setSearchResults(response.data.items);
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
  }
};


const handleSelectVideo = (videoId: string) => {
  setEvent({ ...event, videoId });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
        setErrorMessege("Please fill in all required fields indicated with '*'");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSuccessMessege("New event added successfully!");
    }

    const formData = new FormData();
    
    formData.append("event", JSON.stringify(event));
    if (file) {
        formData.append("imageFile", file);
    }

    try {
        const response = await addEvent(formData);
        setSuccessMessege("Data inserted successfully!");
        setErrorMessege("");
        navigate('/dashboard');
        // window.scrollTo({ top: 0, behavior: "smooth" });
        console.log(response);
    } catch (error) {
        const msg = "An error occurred! Insertion not successful" + error;
        setErrorMessege(msg);
        window.scrollTo({ top: 0, behavior: "smooth" });
        //console.error("There was an error uploading the event!", error);
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
                        <label htmlFor="eventName" className="form-label"> Event Name <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="eventName" value={event.eventName} onChange={handleChange}/>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="category" className="form-label"> Event Type <span className="text-danger">*</span></label>
                      <select id="category" name="eventType" value={eventType} onChange={handleChange} className="form-control">
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
                          <label htmlFor="eventName" className="form-label"> Event Date <span className="text-danger">*</span></label>
                          <input className="form-control" type="date" name="eventDate" value={event.eventDate} onChange={handleChange}/>
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Venue <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" name="eventVenue" value={event.eventVenue} onChange={handleChange}/>
                      </div>
                  </div>

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Start Time <span className="text-danger">*</span></label>
                          <input className="form-control" type="time" name="startTime" value={event.startTime} onChange={handleChange}/>
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event End Time <span className="text-danger">*</span></label>
                          <input className="form-control" type="time" name="endTime" value={event.endTime} onChange={handleChange}/>
                      </div>
                  </div>

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event Organizer <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" name="eventOrganizer" value={event.eventOrganizer} onChange={handleChange}/>
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Available Tickets <span className="text-danger">*</span></label>
                          <input className="form-control" type="number" name="numOfTickets" value={event.numOfTickets} onChange={handleChange}/>
                      </div>
                  </div>

                  <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> One Ticket Price <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" name="oneTicketPrice" value={event.oneTicketPrice} onChange={handleChange}/>
                      </div>
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Event is for <span className="text-danger">*</span></label>
                          <select id="category" className="form-control" name="eventIsFor" value={eventIsFor} onChange={handleChange}>
                            <option value="select">-- Select Event Type --</option>
                            <option value="Students">Students</option>
                            <option value="Teens">Teens</option>
                            <option value="Adults">Adults</option>
                            <option value="Childs">Childs</option>
                            <option value="All">All</option>
                            <option value="Forigners Only">Forigners Only</option>
                            <option value="Locals Only">Locals Only</option>
                          </select>
                      </div>
                  </div>
                  {/* <div className="row">
                      <div className="mb-3 col-md-6">
                          <label htmlFor="eventName" className="form-label"> Limit of Participation <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" name="maxPerson" value={event.maxPerson} onChange={handleChange}/>
                      </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {eventType === "sports" && (
        <div className="">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <h5 className="card-header">Sports and Match</h5>
                <hr className="my-0" />
                <div className="card-body">
                  <div id="formAccountSettings">

                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label htmlFor="eventName" className="form-label"> Team 01 </label>
                            <input className="form-control" type="text" name="teamOne" value={event.teamOne} onChange={handleChange} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="eventName" className="form-label"> Team 02 </label>
                            <input className="form-control" type="text" name="teamTwo" value={event.teamTwo} onChange={handleChange} />
                        </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        {eventType === "theater" && (
        <div className="">
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
                              <option value="Students">Students</option>
                              <option value="Teens">Teens</option>
                              <option value="Adults">Adults</option>
                              <option value="Childs">Childs</option>
                              <option value="All">All</option>
                              <option value="Forigners Only">Forigners Only</option>
                              <option value="Locals Only">Locals Only</option>
                            </select>
                        </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
         <div className="row">
      <div className="mb-3 col-md-6">
        <label htmlFor="searchQuery" className="form-label">
          Search YouTube Videos
        </label>
        <input
          className="form-control"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="mb-3 col-md-6">
        <label htmlFor="eventName" className="form-label">
          Upload Video <span className="text-danger">*</span>
        </label>
        <input
          className="form-control"
          type="text"
          name="videoId"
          value={event.videoId}
          onChange={handleFileChange}
          required
        />
      </div>

      <div className="col-md-12">
        <h5>Search Results</h5>
        <ul className="list-group">
          {searchResults.map((video) => (
            <li
              key={video.id.videoId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{video.snippet.title}</span>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleSelectVideo(video.id.videoId)}
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>

        <div className="card mb-4">
            <div className="card-body">
                <div id="formAccountSettings">

                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="eventName" className="form-label"> Upload Image <span className="text-danger">*</span></label>
                        <input className="form-control" type="file" name="events" onChange={handleFileChange} required />
                    </div>
                </div>

                </div>
            </div>
        </div>

       

        <div className="mt-2">
            <button type="submit" className="btn btn-primary me-2" name="submit">
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
