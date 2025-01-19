import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CongratulationsCard: React.FC = () => {
    const [income, setIncome] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:8080/reservation/totalCharge/today")
        .then(response => {
          setIncome(response.data);
        })
        .catch(error => {
          console.error("Error with first link, trying second link:", error);
          axios.get("https://ticketing-backend-production-088a.up.railway.app/reservation/totalCharge/today")
            .then(response => {
              setIncome(response.data);
            })
            .catch(error => {
              console.error("Error with second link:", error);
            });
        });
    }, []);
  return (
    <div className="card-body">
      <h5 className="card-title text-primary">
        Congratulations! 🎉
      </h5>
      <p className="mb-4">
        We have earn <span className="fw-bold text-success">Rs.{income}.00 </span> more sales today. Check all incomes under income page.
      </p>
      <Link to="/payment" className="btn btn-sm btn-outline-primary">
        View Badges
      </Link>
    </div>
  );
};
export default CongratulationsCard;
