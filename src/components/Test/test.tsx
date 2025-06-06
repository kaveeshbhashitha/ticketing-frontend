import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckoutFormProps } from "../../interfaces/CheckoutFormProps";
import { cardBrandIcons } from "../../data/CardData";

// API URLs
const API_URL_1 = "https://ticketing-backend-production-088a.up.railway.app/api/payment";
const API_URL_2 = "http://localhost:8080/api/payment"; // Replace with your second API URL

// Helper function to handle fallback
const requestWithFallback = async (
  requestFunc: (apiUrl: string) => Promise<any>
): Promise<any> => {
  try {
    return await requestFunc(API_URL_1);
  } catch (error) {
    console.error(`API 1 failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    try {
      return await requestFunc(API_URL_2);
    } catch (fallbackError) {
      console.error(`API 2 also failed: ${fallbackError instanceof Error ? fallbackError.message : "Unknown error"}`);
      throw new Error("Both API URLs failed.");
    }
  }
};

// Function to send data to backend
const insertPaymentData = async (paymentDetails: {
  userId: string;
  reservationId: string;
  userEmail: string;
  amount: number;
}) => {
  return await requestWithFallback((apiUrl) =>
    axios.post(`${apiUrl}/process`, paymentDetails)
  );
};

const Payment: React.FC<CheckoutFormProps> = ({
  reservationId,
  userId,
  userEmail,
  amount,
  numOfTickets,
  perTicketCharge,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [cardBrand, setCardBrand] = useState<string | null>(null);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not loaded properly.");
      return;
    }

    if (!isChecked) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare payment details
      const paymentDetails = {
        userId,
        reservationId,
        userEmail,
        amount,
      };

      // Call function to insert payment details into the backend
      await insertPaymentData(paymentDetails);

      // Navigate to another page after successful payment
      alert("Payment data saved successfully!");
      navigate("/myTickets");
    } catch (error) {
      console.error("Error during payment process:", error);
      alert("An error occurred while saving payment data.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form className="px-3 pb-3" onSubmit={handlePayment}>
      <div className="payment-container">
        <div className="form-element">
          <div className="mb-3 text-white bg-dark text-center width-70">
            Payment Form
          </div>
          <div className="d-flex justify-content-between width-70 alert alert-dark">
            <span>Selected: {numOfTickets}</span>|<span>One is: Rs.{perTicketCharge}.00</span>|<span>Total: Rs.{amount}.00</span>
          </div>
          <div className="mb-3">
            <label htmlFor="card-number" className="form-label mt-2">Email</label><br />
            <input type="email" className="emailinput" value={userEmail} disabled />
          </div>

          {/* Card Details */}
          <div>
            <div className="d-flex justify-content-between marginright">
              <label htmlFor="card-number" className="form-label mt-2">
                Card Information
              </label>
              {cardBrand && (
                <img
                  src={cardBrandIcons[cardBrand] || cardBrandIcons["unknown"]}
                  alt={cardBrand}
                  className="ms-2"
                  style={{ height: "40px", width: "auto" }}
                />
              )}
            </div>

            <CardNumberElement
              id="card-number"
              className="form-control-cardnum"
              options={{ style: { base: { fontSize: "16px" } } }}
              onChange={(event) => {
                setCardBrand(event?.brand || "unknown");
              }}
            />
          </div>

          <div className="d-flex mb-3">
            <CardExpiryElement
              id="card-expiry"
              className="form-control-date"
              options={{ style: { base: { fontSize: "16px" } } }}
            />
            <CardCvcElement
              id="card-cvc"
              className="form-control-cvc"
              options={{ style: { base: { fontSize: "16px" } } }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="postal-code" className="form-label">
              Name on the Card
            </label>
            <br />
            <input
              type="text"
              id="postal-code"
              className="form-control-name"
              placeholder="Zhang San"
            />
          </div>

          {/* Terms & Conditions */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheck"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="termsCheck" className="form-check-label">
              I accept the terms and conditions
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="pay-button" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Payment;
