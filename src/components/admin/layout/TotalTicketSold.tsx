import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalTicketsSold: React.FC = () => {
  const [totalTickets, setTotalTickets] = useState<number>(0); // To hold the total ticket count
  const token = sessionStorage.getItem("token");

  // Helper function to get authorization headers
  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    // Fetch reservation data (e.g., the number of reservations by date)
    axios
      .get("https://ticketing-backend-production-b7c4.up.railway.app/api/reservation/getAllReservations", {
        headers: getAuthHeaders(),
      })
      .then((response) => {
        const data = response.data; // Assuming the data format is [{ reservationDate: "2025-01-25T12:00:00Z", numOfTickets: 15 }, ...]

        // Ensure the data is valid and calculate the total ticket sales
        if (data && Array.isArray(data)) {
          const total = data.reduce((acc: number, item: any) => acc + item.numOfTickets, 0);
          setTotalTickets(total); // Set the total tickets count
        }
      })
      .catch((error) => {
        console.error("Error with first link, trying second link:", error);
        axios
          .get("http://localhost:8080/api/reservation/getAllReservations", {
            headers: getAuthHeaders(),
          })
          .then((response) => {
            const total = response.data.reduce((acc: number, item: any) => acc + item.numOfTickets, 0);
            setTotalTickets(total);
          })
          .catch((error) => {
            console.error("Error with second link:", error);
          });
      });
  }, [token]);

  return (
    <div className="card-body">
      <h5 className="card-title text-primary">Total Tickets Sold</h5>
      <div className="mb-4">
        <p><strong></strong> {totalTickets} tickets</p>
      </div>
    </div>
  );
};

export default TotalTicketsSold;
