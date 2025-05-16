import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Registering the necessary components from Chart.js for a Line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ReservationsChart: React.FC = () => {
  const [reservationData, setReservationData] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  const token = sessionStorage.getItem("token");

  // Helper function to get authorization headers
  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Utility function to format dates from ISO format (e.g., 2025-01-25T12:00:00Z -> 2025-01-25)
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Adding leading zero if month < 10
    const day = (`0${date.getDate()}`).slice(-2); // Adding leading zero if day < 10
    return `${year}-${month}-${day}`;
  };

  const API_URL_1 = "https://ticketing-backend-production-b7c4.up.railway.app/api/reservation/getAllReservations";
  const API_URL_2 = "http://localhost:8080/api/reservation/getAllReservations";

  // Helper function to attempt requests on both APIs
  const requestWithFallback = async (apiUrl: string) => {
    try {
      const response = await axios.get(apiUrl, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`API request failed for ${apiUrl}: ${(error as Error).message}`);
      throw error; // Re-throw to fallback
    }
  };

  useEffect(() => {
    // Try the first API, and fall back to the second if it fails
    requestWithFallback(API_URL_1)
      .then((data) => {
        // Assuming the data format is [{ reservationDate: "2025-01-25T12:00:00Z", numOfTickets: 15 }, ...]
        if (data && Array.isArray(data)) {
          const reservationCounts = data.map((item: any) => item.numOfTickets); // Extract reservations count data
          const formattedDates = data.map((item: any) => {
            return item.reservationDate ? formatDate(item.reservationDate) : "Unknown Date";
          });
          setReservationData(reservationCounts);
          setDates(formattedDates);
        }
      })
      .catch(() => {
        console.error("Failed to fetch from the first API, attempting to fetch from the second API.");
        requestWithFallback(API_URL_2)
          .then((data) => {
            if (data && Array.isArray(data)) {
              const reservationCounts = data.map((item: any) => item.numOfTickets); // Extract reservations count data
              const formattedDates = data.map((item: any) => {
                return item.reservationDate ? formatDate(item.reservationDate) : "Unknown Date";
              });
              setReservationData(reservationCounts);
              setDates(formattedDates);
            }
          })
          .catch((error) => {
            console.error("Both API requests failed:", error);
          });
      });
  }, [token]);

  // Chart.js configuration
  const chartData = {
    labels: dates, // X-axis labels (dates)
    datasets: [
      {
        label: "Reservations",
        data: reservationData, // Y-axis data (reservation counts)
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Line fill color
        fill: true, // Enable filling below the line
        tension: 0.4, // Line smoothness
        pointRadius: 5, // Show points on the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw} reservations`; // Tooltip format
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          maxRotation: 45, // Rotate x-axis labels for better visibility
          minRotation: 30,
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Reservations",
        },
        beginAtZero: true, // Start Y-axis from zero
      },
    },
  };

  return (
    <div className="card-body">
      <h5 className="card-title text-primary">Reservations by Date</h5>
      <div className="mb-4">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ReservationsChart;
