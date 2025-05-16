import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CongratulationsCard: React.FC = () => {
  const [income, setIncome] = useState<number | null>(null);
  const token = sessionStorage.getItem("token");

  // Helper function to get authorization headers
  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    axios
      .get(
        "https://ticketing-backend-production-b7c4.up.railway.app/api/reservation/totalCharge/today",
        { headers: getAuthHeaders() }
      )
      .then((response) => {
        setIncome(response.data);
      })
      .catch((error) => {
        console.error("Error with first link, trying second link:", error);
        axios
        .get(
          "http://localhost:8080/api/reservation/totalCharge/today",
          { headers: getAuthHeaders() }
        )
          .then((response) => {
            setIncome(response.data);
          })
          .catch((error) => {
            console.error("Error with second link:", error);
          });
      });
  }, [token]); // Adding token as a dependency to refetch if it changes

  return (
    <div className="card-body">
      <h5 className="card-title text-primary">
        Congratulations! 🎉
      </h5>
      <p className="mb-4">
        We have earned{" "}
        <span className="fw-bold text-success">Rs.{income ?? 0}.00</span> more
        sales today. Check all incomes under income page.
      </p>
      <Link to="/adminPayment" className="btn btn-sm btn-outline-primary">
        View Badges
      </Link>
    </div>
  );
};

export default CongratulationsCard;
