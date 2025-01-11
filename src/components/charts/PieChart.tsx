/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { getReservationsByUserId } from "../../service/ReservationService";
import { Reservation } from "../../interfaces/Reservation";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart: React.FC<{ userId: string }> = ({ userId }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Reservations by Event Type",
        data: [] as number[],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const fetchReservations = async () => {
    try {
      const response = await getReservationsByUserId(userId);

      // Group by eventType
      const eventTypeCounts: Record<string, number> = {};
      response.forEach((reservation: Reservation) => {
        if (reservation.numOfTickets) {
          eventTypeCounts[reservation.numOfTickets] =
            (eventTypeCounts[reservation.numOfTickets] || 0) + 1;
        }
      });

      // Prepare labels and data for the chart
      const labels = Object.keys(eventTypeCounts);
      const data = Object.values(eventTypeCounts);

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
    <div style={{ width: "200px", height: "200px" }}>
      {chartData.labels.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default PieChart;