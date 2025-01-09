import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import EventAbout from "../content/Events/EventAbout";
import { getUserById, getUserId } from "../../service/UserService";
import { getReservationsByUserId } from "../../service/ReservationService";
import { deleteEvent, getEventById } from "../../service/EventService";
import { Event } from "../../interfaces/Event";
import { Reservation } from "../../interfaces/Reservation";

const MyTickets: React.FC = () => {
  const [, setUser] = useState(null);
  const [, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState("upcoming");
  const [errorMessage, setErrorMessage] = useState("");
  
  // state to store reservations data
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const userResponse = await getUserById(userId);
        setUser(userResponse);

        const reservationsResponse = await getReservationsByUserId(userId);
        const eventPromises = reservationsResponse.map((reservation: { eventId: string }) =>
          getEventById(reservation.eventId)
        );
        const eventsResponse = await Promise.all(eventPromises);
        
        if (eventsResponse && eventsResponse.length > 0) {
          setEvents(eventsResponse);
          const upcomingEvents = eventsResponse.filter((event) => new Date(event.eventDate) > new Date());
          const pastEvents = eventsResponse.filter((event) => new Date(event.eventDate) < new Date());
          
          // Store reservations data separately to later map it to the events
          setReservations(reservationsResponse);

          setFilteredEvents(filter === "upcoming" ? upcomingEvents : pastEvents);
        } else {
          setErrorMessage("No events found.");
        }
      } catch (error) {
        console.error("Error fetching user and events", error);
        setErrorMessage("Failed to load events. Please try again.");
      }
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleDelete = async (id: string) => {
    try {
      const confirmRespond = confirm("Are you sure you want to delete this record?");
      if (confirmRespond) {
        await deleteEvent(id);
        setEvents((prevEvents) => prevEvents.filter((event) => event.eventId !== id));
        setFilteredEvents((prevEvents) => prevEvents.filter((event) => event.eventId !== id));
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  // Helper function to get reservation details
  const getReservationDetails = (eventId: string) => {
    const reservation = reservations.find((res) => res.eventId === eventId);
    return reservation ? { numOfTickets: reservation.numOfTickets, totalCharge: reservation.totalCharge } : { numOfTickets: 0, totalCharge: 0 };
  };

  return (
    <div>
      <Header />
      <EventAbout />
      <section id="buy-tickets" className="buy-tickets">
        <div className="container">
          <div className="section-header">
            <h2>My Tickets</h2>
            <div className="text-center">{filter === "upcoming" ? "You have new upcoming Events for next weeks" : "You have reached following Events last few weeks"}</div>
            <div className="d-flex justify-content-center my-2">
                <button onClick={() => handleFilterChange("upcoming")} className="btn btn-outline-primary btn-sm mr-2">Upcoming Events</button>
                <button onClick={() => handleFilterChange("past")} className="btn btn-outline-primary btn-sm">Past Events</button>
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="row">
            <div className="col-lg-12">
              <div className="table-container">
                {filteredEvents.length > 0 ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Venue</th>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Max</th>
                        <th>#</th>
                        <th>Total</th>
                        <th>Organizer</th>
                        <th>Action</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event) => {
                        const { numOfTickets, totalCharge } = getReservationDetails(event.eventId);
                        return (
                          <tr key={event.eventId}>
                            <td>
                              <abbr title={event.eventId}>#</abbr>
                            </td>
                            <td>{event.eventVenue}</td>
                            <td> 
                                <div className="text-white px-2 py-1 rounded" style={{ backgroundColor: event.eventType === "generalEvent" ? "#df526c" : 
                                    event.eventType === "sports" ? "#52df81" : 
                                    event.eventType === "theater" ? "#5e52df" : 
                                    event.eventType === "otherEvent" ? "#8d8d8d" : "black" }}>{event.eventName}
                                </div>
                            </td>

                            <td>{event.eventDate}</td>
                            <td>{event.startTime}</td>
                            <td>{event.numOfTickets}</td>
                            <td>{numOfTickets}</td>
                            <td>Rs.{totalCharge}.00</td>
                            <td>{event.eventOrganizer}</td>
                            <td className="text-center">
                              <button onClick={() => handleDelete(event.eventId)} className="btn btn-outline-secondary btn-sm">
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                            {event.imageData && (
                              <td className="center-column">
                                <img
                                  src={`data:${event.contentType};base64,${event.imageData}`}
                                  alt="Event"
                                  className="tableimg"
                                />
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="" role="alert">
                    No events available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MyTickets;
