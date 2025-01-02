import React, { useEffect, useState } from "react";
import { getAllOtherEventDataForFrontEnd } from "../../service/EventService";
import { Event } from "../../interfaces/Event";

const HomeSpeecker: React.FC = () => {

  const [events, setEvents] = useState<Event[]>([]);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const eventList = await getAllOtherEventDataForFrontEnd();
          if (eventList && eventList.length > 0) {
            setEvents(eventList);
            console.error(""); 
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
          <h2>Event Speakers</h2>
          <p>Here are some of our speakers</p>
        </div>

        <div className="row">
          {events.map((event) => (
            <div className="col-lg-4 col-md-6" key={event.eventId}>
              <div className="speaker">
                <img src={`data:${event.contentType};base64,${event.imageData}`} alt={event.eventName} className="img-fluid" style={{height:"280px", width:"100%"}}/>
                <div className="details">
                  <h3>
                    <a href="/">{event.eventName}</a>
                  </h3>
                  <p>{event.eventName}</p>
                  <div className="social">
                      <a href="/">
                        <i className="fa-solid fa-cart-shopping"></i>
                      </a>
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
