import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import EventAbout from "../content/Events/EventAbout";
import { getUserById, getUserId } from "../../service/UserService";
import { deleteReservation, getReservationsByUserId } from "../../service/ReservationService";
import { getEventById } from "../../service/EventService";
import { Event } from "../../interfaces/Event";
import { Reservation } from "../../interfaces/Reservation";
import useAuthCheck from "../../useAuthCheck";

const MyTickets: React.FC = () => {
  useAuthCheck(["USER", "ADMIN"]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [events, setEvents] = useState<{ [key: string]: Event | null }>({});
  const [filter, setFilter] = useState("upcoming");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        await getUserById(userId);

        const reservationsResponse = await getReservationsByUserId(userId);
        setReservations(reservationsResponse);

        // Fetch event details for each reservation
        const eventPromises = reservationsResponse.map(async (reservation: Reservation) => {
          try {
            const event = await getEventById(reservation.eventId);
            return { eventId: reservation.eventId, event };
          } catch (error) {
            console.error("Error fetching event details for:", reservation.eventId, error);
            return { eventId: reservation.eventId, event: null };
          }
        });

        const eventDataArray = await Promise.all(eventPromises);
        const eventMap = eventDataArray.reduce((acc, { eventId, event }) => {
          acc[eventId] = event;
          return acc;
        }, {} as { [key: string]: Event | null });

        setEvents(eventMap);
      } catch (error) {
        console.error("Error fetching user and events", error);
        setErrorMessage("Failed to load events. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete this reservation?")) {
        await deleteReservation(id);
        setReservations((prev) => prev.filter((res) => res.eventId !== id));
      }
    } catch (error) {
      console.error("Failed to delete reservation:", error);
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    const event = events[reservation.eventId];
    if (!event) return false;
    return filter === "upcoming" ? new Date(event.eventDate) > new Date() : new Date(event.eventDate) < new Date();
  });

  return (
    <div>
      <Header />
      <EventAbout />
      <section id="buy-tickets" className="buy-tickets">
        <div className="container">
          <div className="section-header">
            <h2>My Tickets</h2>
            <div className="text-center">
              {filter === "upcoming"
                ? "You have new upcoming Events for next weeks"
                : "You have reached following Events last few weeks"}
            </div>
            <div className="d-flex justify-content-center my-2">
              <button onClick={() => setFilter("upcoming")} className="btn btn-outline-primary btn-sm mr-2">Upcoming Events</button>
              <button onClick={() => setFilter("past")} className="btn btn-outline-primary btn-sm">Past Events</button>
            </div>
          </div>

          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

          <div className="row">
            <div className="col-lg-12">
              <div className="table-container">
                {filteredReservations.length > 0 ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Venue</th>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th># Tickets</th>
                        <th>Total</th>
                        <th>Organizer</th>
                        <th>Action</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReservations.map((reservation) => {
                        const event = events[reservation.eventId];
                        if (!event) return null;
                        return (
                          <tr key={reservation.eventId}>
                            <td><abbr title={reservation.eventId}>#</abbr></td>
                            <td>{event.eventVenue}</td>
                            <td>
                              <div
                                className="text-white px-2 py-1 rounded"
                                style={{
                                  backgroundColor:
                                    event.eventType === "generalEvent"
                                      ? "#df526c"
                                      : event.eventType === "sports"
                                      ? "#52df81"
                                      : event.eventType === "theater"
                                      ? "#5e52df"
                                      : event.eventType === "otherEvent"
                                      ? "#8d8d8d"
                                      : "black",
                                }}
                              >
                                {event.eventName}
                              </div>
                            </td>
                            <td>{event.eventDate}</td>
                            <td>{event.startTime}</td>
                            <td>{reservation.numOfTickets}</td>
                            <td>Rs.{reservation.totalCharge}.00</td>
                            <td>{event.eventOrganizer}</td>
                            <td className="text-center">
                              <button className="btn btn-outline-dark btn-sm" onClick={() => handleDelete(reservation.eventId)}>
                                <i className="fa-solid fa-ban"></i>
                              </button>
                            </td>
                            <td className="center-column">
                              {event.imageData && (
                                <img src={`data:${event.contentType};base64,${event.imageData}`} alt="Event" className="tableimg" />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div role="alert">No reservations available</div>
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