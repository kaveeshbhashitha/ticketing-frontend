import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import Payment from './Payment';
import { Event } from '../../interfaces/Event';
import { getReservationById } from '../../service/ReservationService';
import { getEventById } from '../../service/EventService';
import { getUserById } from '../../service/UserService';
import { Reservation } from '../../interfaces/Reservation';
import { User } from '../../interfaces/User';

const stripePromise = loadStripe('pk_test_51NHnWuSCKBfIrcyXTDjnlJ02Q1NrzvaXIcxUYJnMzxhs6m3YlOI6086oNufEMnQd76GPnFYFp3F4tpj74rShq3lH00L3MDtZ5i');

const Checkout: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>(); 
  const [reservationData, setReservationData] = useState<Reservation | null>(null);
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
          console.error('Error fetching reservation details', error);
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
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
                src={`data:${eventData.contentType};base64,${eventData.imageData}`}
                alt={eventData.eventName}
                className="img-fluid selection-image"
              />
            <h3 className="mt-3">{eventData.eventName}</h3>
            <p>
              Organized by <span className="font-weight-bold">{eventData.eventOrganizer}</span>
            </p>
            <p>
              <span className="text-muted">Date:</span> {eventData.eventDate} | Time: {eventData.startTime}
            </p>
            <p>
              <span className="text-muted">Venue:</span> {eventData.eventVenue}
            </p>
          </div>
          <div className="col-md-6">
            {reservationId && (
              <Elements stripe={stripePromise}>
                <Payment
                  reservationId={reservationId}
                  userId={reservationData.userId}
                  userEmail={userData.userEmail}
                  amount={reservationData.totalCharge}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
