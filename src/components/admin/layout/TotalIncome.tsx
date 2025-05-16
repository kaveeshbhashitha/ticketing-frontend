import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalIncome: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const token = sessionStorage.getItem("token");

  // Helper function to get authorization headers
  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    axios
      .get(
        "https://ticketing-backend-production-b7c4.up.railway.app/api/reservation/totalCharge",
        { headers: getAuthHeaders() }
      )
      .then((response) => {
        setTotalIncome(response.data);
      })
      .catch((error) => {
        console.error("Error with first link, trying second link:", error);
        axios
          .get("http://localhost:8080/api/reservation/totalCharge", {
            headers: getAuthHeaders(),
          })
          .then((response) => {
            setTotalIncome(response.data);
          })
          .catch((error) => {
            console.error("Error with second link:", error);
          });
      });
  }, [token]); // Adding token as a dependency to refetch if it changes
  sessionStorage.setItem("totalIncome",totalIncome.toFixed(2));

  return (
    <div>
        <span className="fw-bold text-success">Rs.{totalIncome.toFixed(2)}</span>
    </div>
    
  );
};

export default TotalIncome;
