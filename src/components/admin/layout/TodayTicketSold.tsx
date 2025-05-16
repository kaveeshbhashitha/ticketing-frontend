import React, { useEffect, useState } from "react";
import axios from "axios";

const TicketsSoldToday: React.FC = () => {
  const [ticketsSoldToday, setTicketsSoldToday] = useState<number>(0); // To hold today's ticket count
  const token = sessionStorage.getItem("token");

  // Helper function to get authorization headers
  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Utility function to get today's date in "YYYY-MM-DD" format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (`0${today.getMonth() + 1}`).slice(-2); // Add leading zero for months < 10
    const day = (`0${today.getDate()}`).slice(-2); // Add leading zero for days < 10
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Fetch reservation data
    axios
      .get("https://ticketing-backend-production-b7c4.up.railway.app/api/reservation/getAllReservations", {
        headers: getAuthHeaders(),
      })
      .then((response) => {
        const data = response.data; // Assuming the data format is [{ reservationDate: "2025-01-25T12:00:00Z", numOfTickets: 15 }, ...]

        // Ensure the data is valid
        if (data && Array.isArray(data)) {
          // Get today's date
          const todayDate = getTodayDate();

          // Filter reservations for today's date
          const todayReservations = data.filter((item: any) => {
            const reservationDate = new Date(item.reservationDate);
            const formattedDate = `${reservationDate.getFullYear()}-${(`0${reservationDate.getMonth() + 1}`).slice(-2)}-${(`0${reservationDate.getDate()}`).slice(-2)}`;
            return formattedDate === todayDate;
          });

          // Calculate the total number of tickets sold today
          const totalToday = todayReservations.reduce((acc: number, item: any) => acc + item.numOfTickets, 0);
          setTicketsSoldToday(totalToday); // Set the tickets sold today
        }
      })
      .catch((error) => {
        console.error("Error with first link, trying second link:", error);
        axios
          .get("http://localhost:8080/api/reservation/getAllReservations", {
            headers: getAuthHeaders(),
          })
          .then((response) => {
            const data = response.data;
            const todayDate = getTodayDate();

            const todayReservations = data.filter((item: any) => {
              const reservationDate = new Date(item.reservationDate);
              const formattedDate = `${reservationDate.getFullYear()}-${(`0${reservationDate.getMonth() + 1}`).slice(-2)}-${(`0${reservationDate.getDate()}`).slice(-2)}`;
              return formattedDate === todayDate;
            });

            const totalToday = todayReservations.reduce((acc: number, item: any) => acc + item.numOfTickets, 0);
            setTicketsSoldToday(totalToday);
          })
          .catch((error) => {
            console.error("Error with second link:", error);
          });
      });
  }, [token]);

  return (
    <div className="card-body">
      <h5 className="card-title text-primary">Tickets Sold Today</h5>
      <div className="mb-4">
        <p><strong></strong> {ticketsSoldToday} tickets</p>
      </div>
    </div>
  );
};

export default TicketsSoldToday;
