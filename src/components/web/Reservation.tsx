import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../service/EventService";
import { Event } from "../../interfaces/Event";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import useAuthCheck from "../../useAuthCheck";
import { getUserId } from "../../service/UserService";
import { addReservation } from "../../service/ReservationService";

const Reservation: React.FC = () => {
  useAuthCheck(['User', 'Admin']);
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [ticketCount, setTicketCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!eventId) throw new Error("Event ID is missing.");
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

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
          const userId = await getUserId();
          if (!eventId) throw new Error("Event ID is missing.");
          if (event) {
            const totalCharge = event.oneTicketPrice * event.oneTicketPrice;
            const respone = await addReservation(userId, eventId, ticketCount, totalCharge, event.oneTicketPrice);
            if (respone) {
              navigate(`/payment/${respone.data.reservationId}`);
            }
          }
      } catch (error) {
        console.error("Registration error:", error);
      }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event data available.</div>;

  // Conditional rendering based on eventType
  return (
    <body>
      <div className="bg-dark text-white">
        <Header />
        <section className="pt-5">
          <div className="container py-5">
            <hr className="mb-3" />
            <div>
              {event.eventType === "sports" && (
                <div>
                  <div className="row">
                    <div className="col-6">
                      <img
                        src={`data:${event.contentType};base64,${event.imageData}`}
                        alt={event.eventName}
                        className="img-fluid selection-image"
                      />
                      <h2 className="text-white my-5">{event.eventName}</h2>
                    </div>
                    <div className="col-6 mt-3 text-center">
                      <div className="mx-3">
                        <h3 className="text-white">
                          <i className="fa-solid fa-futbol mr-3"></i>Teams:{" "}
                          {event.teamOne} vs. {event.teamTwo}
                        </h3>

                        <div className="w-100 d-flex justify-content-center align-items-center mx-auto">
                          <p className="text-white">
                            <i className="fa-solid fa-map-location-dot mx-2"></i>{" "}
                            {event.eventVenue}
                          </p>
                          <p className="text-white mx-3">
                            <i className="fa-regular fa-clock mx-2"></i>{" "}
                            {event.startTime} - {event.endTime}
                          </p>
                          <p className="text-white">
                            <i className="fa-regular fa-circle-user mx-2"></i>{" "}
                            {event.eventIsFor}
                          </p>
                        </div>
                        <p>Max Persons: {event.maxPerson}</p>
                        <div className="row mx-5">
                          <div className="col-6">
                            <input
                              type="text"
                              name=""
                              id=""
                              className="ticket-input-1"
                              disabled
                              value={`One ticket price is Rs.${event.oneTicketPrice}.00`}
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name=""
                              id=""
                              className="ticket-input-1"
                              disabled
                              value={`Avilable ${event.numOfTickets} out from ${event.maxPerson}`}
                            />
                          </div>
                        </div>

                        <input
                            type="text"
                            name="totalChargeDisplay"
                            className="ticket-input"
                            value={`Total charge is : Rs.${ticketCount * event.oneTicketPrice}.00`}
                            readOnly
                          />
                          <input
                            type="hidden"
                            name="totalCharge"
                            value={ticketCount * event.oneTicketPrice}
                          />
                        <input
                          type="number"
                          name=""
                          id=""
                          className="ticket-input"
                          placeholder="Select number of tickets you want..."
                          onChange={(e) => {
                            setTicketCount(Number(e.target.value));
                          }}
                        />

                        <div className="d-flex justify-content-center">
                          {ticketCount > 0 ? (
                            <button className="ticketcountbutton buttonforres" onClick={handleRegister}>
                              Reserve and Pay
                            </button>
                          ) : (
                            <button
                              className="ticketcountbutton-outline buttonforres"
                              disabled
                            >
                              Reserve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {event.eventType === "generalEvent" && (
                <div>
                <div className="row">
                  <div className="col-6">
                    <img
                      src={`data:${event.contentType};base64,${event.imageData}`}
                      alt={event.eventName}
                      className="img-fluid selection-image"
                    />
                    <h2 className="text-white my-5">{event.eventName}</h2>
                  </div>
                  <div className="col-6 mt-3 text-center">
                    <div className="mx-3">
                      <h3 className="text-white">
                      <i className="fa-solid fa-calendar-days mr-2"></i>{" "}{event.eventName} organized by {event.eventOrganizer}
                      </h3>

                      <div className="w-100 d-flex justify-content-center align-items-center mx-auto">
                        <p className="text-white">
                          <i className="fa-solid fa-map-location-dot mx-2"></i>{" "}
                          {event.eventVenue}
                        </p>
                        <p className="text-white mx-3">
                          <i className="fa-regular fa-clock mx-2"></i>{" "}
                          {event.startTime} - {event.endTime}
                        </p>
                        <p className="text-white">
                          <i className="fa-regular fa-circle-user mx-2"></i>{" "}
                          {event.eventIsFor}
                        </p>
                      </div>
                      <p>Max Persons: {event.maxPerson}</p>
                      <div className="row mx-5">
                        <div className="col-6">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="ticket-input-1"
                            disabled
                            value={`One ticket price is Rs.${event.oneTicketPrice}.00`}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="ticket-input-1"
                            disabled
                            value={`Avilable ${event.numOfTickets} out from ${event.maxPerson}`}
                          />
                        </div>
                      </div>

                      <input
                            type="text"
                            name="totalChargeDisplay"
                            className="ticket-input"
                            value={`Total charge is : Rs.${ticketCount * event.oneTicketPrice}.00`}
                            readOnly
                          />
                          <input
                            type="hidden"
                            name="totalCharge"
                            value={ticketCount * event.oneTicketPrice}
                          />
                      <input
                        type="number"
                        name=""
                        id=""
                        className="ticket-input"
                        placeholder="Select number of tickets you want..."
                        onChange={(e) => {
                          setTicketCount(Number(e.target.value));
                        }}
                      />

                      <div className="d-flex justify-content-center">
                        {ticketCount > 0 ? (
                          <button className="ticketcountbutton buttonforres" onClick={handleRegister}>
                            Reserve and Pay
                          </button>
                        ) : (
                          <button
                            className="ticketcountbutton-outline buttonforres"
                            disabled
                          >
                            Reserve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}

              {event.eventType === "theater" && (
                <div>
                <div className="row">
                  <div className="col-6">
                    <img
                      src={`data:${event.contentType};base64,${event.imageData}`}
                      alt={event.eventName}
                      className="img-fluid selection-image"
                    />
                    <h2 className="text-white my-5">{event.eventName}</h2>
                  </div>
                  <div className="col-6 mt-3 text-center">
                    <div className="mx-3">
                      <h3 className="text-white">
                        <i className="fa-solid fa-compact-disc mr-2"></i>Theater {event.eventName} by {event.eventOrganizer} 
                      </h3>

                      <div className="w-100 d-flex justify-content-center align-items-center mx-auto">
                        <p className="text-white">
                          <i className="fa-solid fa-map-location-dot mx-2"></i>{" "}
                          {event.eventVenue}
                        </p>
                        <p className="text-white mx-3">
                          <i className="fa-regular fa-clock mx-2"></i>{" "}
                          {event.theaterTime1} | {event.theaterTime2} | Duration: {event.duration} Hours
                        </p>
                        <p className="text-white">
                          <i className="fa-regular fa-circle-user mx-2"></i>{" "}
                          For {event.eventIsFor}
                        </p>
                      </div>
                      <p>Max Persons: {event.maxPerson}</p>
                      <div className="row mx-5">
                        <div className="col-6">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="ticket-input-1"
                            disabled
                            value={`One ticket price is Rs.${event.oneTicketPrice}.00`}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="ticket-input-1"
                            disabled
                            value={`Avilable ${event.numOfTickets} out from ${event.maxPerson}`}
                          />
                        </div>
                      </div>

                      <input
                            type="text"
                            name="totalChargeDisplay"
                            className="ticket-input"
                            value={`Total charge is : Rs.${ticketCount * event.oneTicketPrice}.00`}
                            readOnly
                          />
                          <input
                            type="hidden"
                            name="totalCharge"
                            value={ticketCount * event.oneTicketPrice}
                          />
                      <input
                        type="number"
                        name=""
                        id=""
                        className="ticket-input"
                        placeholder="Select number of tickets you want..."
                        onChange={(e) => {
                          setTicketCount(Number(e.target.value));
                        }}
                      />

                      <div className="d-flex justify-content-center">
                        {ticketCount > 0 ? (
                          <button className="ticketcountbutton buttonforres" onClick={handleRegister}>
                            Reserve and Pay
                          </button>
                        ) : (
                          <button
                            className="ticketcountbutton-outline buttonforres"
                            disabled
                          >
                            Reserve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}

              {event.eventType === "otherEvent" && (
                <div>
                <div className="row">
                  <div className="col-6">
                    <img
                      src={`data:${event.contentType};base64,${event.imageData}`}
                      alt={event.eventName}
                      className="img-fluid selection-image"
                    />
                    <h2 className="text-white my-5">{event.eventName}</h2>
                  </div>
                  <div className="col-6 mt-3 text-center">
                    <div className="mx-3">
                      <h3 className="text-white">
                        <i className="fa-regular fa-calendar-check mr-2"></i>{event.eventName} is organized by {event.eventOrganizer}
                      </h3>

                      <div className="w-100 d-flex justify-content-center align-items-center mx-auto">
                        <p className="text-white">
                          <i className="fa-solid fa-map-location-dot mx-2"></i>{" "}
                          {event.eventVenue}
                        </p>
                        <p className="text-white mx-3">
                          <i className="fa-regular fa-clock mx-2"></i>{" "}
                          {event.startTime} - {event.endTime}
                        </p>
                        <p className="text-white">
                          <i className="fa-regular fa-circle-user mx-2"></i>{" "}
                          For {event.eventIsFor}
                        </p>
                      </div>
                      <p>Max Persons: {event.maxPerson}</p>
                      <div className="row mx-5">
                        <div className="col-6">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="ticket-input-1"
                            disabled
                            value={`One ticket price is Rs.${event.oneTicketPrice}.00`}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            name=""
                            id=""
                            className="ticket-input-1"
                            disabled
                            value={`Avilable ${event.numOfTickets} out from ${event.maxPerson}`}
                          />
                        </div>
                      </div>

                      <input
                            type="text"
                            name="totalChargeDisplay"
                            className="ticket-input"
                            value={`Total charge is : Rs.${ticketCount * event.oneTicketPrice}.00`}
                            readOnly
                          />
                          <input
                            type="hidden"
                            name="totalCharge"
                            value={ticketCount * event.oneTicketPrice}
                          />
                      <input
                        type="number"
                        name=""
                        id=""
                        className="ticket-input"
                        placeholder="Select number of tickets you want..."
                        onChange={(e) => {
                          setTicketCount(Number(e.target.value));
                        }}
                      />

                      <div className="d-flex justify-content-center">
                        {ticketCount > 0 ? (
                          <button className="ticketcountbutton buttonforres" onClick={handleRegister}>
                            Reserve and Pay
                          </button>
                        ) : (
                          <button
                            className="ticketcountbutton-outline buttonforres"
                            disabled
                          >
                            Reserve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
          <Footer />
        </section>
      </div>
    </body>
  );
};

export default Reservation;
