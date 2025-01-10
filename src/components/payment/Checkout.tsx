import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import Payment from "./Payment";
import { Event } from "../../interfaces/Event";
import { getReservationById } from "../../service/ReservationService";
import { getEventById } from "../../service/EventService";
import { getUserById } from "../../service/UserService";
import { Reservation } from "../../interfaces/Reservation";
import { User } from "../../interfaces/User";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import EventAbout from "../content/Events/EventAbout";
import Chatbot from "../chatbot/Chatbot";
import useAuthCheck from "../../useAuthCheck";

const stripePromise = loadStripe(
  "pk_test_51NHnWuSCKBfIrcyXTDjnlJ02Q1NrzvaXIcxUYJnMzxhs6m3YlOI6086oNufEMnQd76GPnFYFp3F4tpj74rShq3lH00L3MDtZ5i"
);

const Checkout: React.FC = () => {
  useAuthCheck(["User", "Admin"]);
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservationData, setReservationData] = useState<Reservation | null>(
    null
  );
  const [eventData, setEventData] = useState<Event | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (reservationId) {
        try {
          const response = await getReservationById(reservationId);
          setReservationData(response);
          fetchEventData(response.eventId);
          fetchUserData(response.userId);
        } catch (error) {
          console.error("Error fetching reservation details", error);
        }
      }
    };

    fetchData();
  }, [reservationId]);

  const fetchEventData = async (eventId: string) => {
    const response = await getEventById(eventId);
    setEventData(response);
  };

  const fetchUserData = async (userId: string) => {
    const response = await getUserById(userId);
    setUserData(response);
  };

  if (!reservationData || !eventData || !userData) {
    console.log(eventData, reservationData, userData);
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <EventAbout />

      <div className="container mt-5">
        <div className="p-4">
          <div className="row">
            <div className="col-md-6 text-dark">
              <img
                src={`data:${eventData.contentType};base64,${eventData.imageData}`}
                alt={eventData.eventName}
                className="img-fluid selection-image"
              />
              <h2 className="my-3">{eventData.eventName}</h2>

              <p>
                {" "}
                Organized by{" "}
                <span className="font-weight-bold">
                  {eventData.eventOrganizer}
                </span>{" "}
              </p>
              <div className="d-flex">
                <p>
                  {" "}
                  <span className="text-dark">Date:</span> {eventData.eventDate}{" "}
                  | Time: {eventData.startTime}{" "}
                </p>
                <p className="mx-2">
                  {" "}
                  | <span className="text-dark">Venue:</span>{" "}
                  {eventData.eventVenue}{" "}
                </p>
                <p className="mx-2">
                  {" "}
                  | <span className="text-dark">Max Participation</span>{" "}
                  {eventData.maxPerson}{" "}
                </p>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-md-5">
              {reservationId && (
                <Elements stripe={stripePromise}>
                  <Payment
                    reservationId={reservationId}
                    userId={reservationData.userId}
                    userEmail={userData.userEmail}
                    amount={reservationData.totalCharge}
                    numOfTickets={reservationData.numOfTickets}
                    perTicketCharge={reservationData.perTicketCharge}
                  />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Checkout;
