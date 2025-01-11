/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { getReservationsByUserId } from "../../service/ReservationService"; 
import { Reservation } from "../../interfaces/Reservation"; 

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

interface LineChartProps {
  userId: string; // User ID to fetch reservation data
}

export const LineChart: React.FC<LineChartProps> = ({ userId }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Ticket Count",
        data: [] as number[],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  });

  const fetchReservations = async () => {
    try {
      const response = await getReservationsByUserId(userId);

      // Process reservation data
      const reservationsGroupedByDate: Record<string, number> = {};
      response.forEach((reservation: Reservation) => {
        if (reservation.reservationDate && reservation.numOfTickets) {
          reservationsGroupedByDate[reservation.reservationDate] =
            (reservationsGroupedByDate[reservation.reservationDate] || 0) + reservation.numOfTickets;
        }
      });

      const labels = Object.keys(reservationsGroupedByDate);
      const data = Object.values(reservationsGroupedByDate);

      setChartData((prevData) => ({
        ...prevData,
        labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data,
          },
        ],
      }));
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div style={{ width: "100%", height: "200px" }}>
      {chartData.labels.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};