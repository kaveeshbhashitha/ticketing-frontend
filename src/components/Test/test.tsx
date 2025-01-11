import React from "react";

const test: React.FC = () => {
  return (
    <div>
      
    </div>
  );
};
export default test;


// import React, { useState } from "react";
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   CardCvcElement,
//   CardExpiryElement,
//   CardNumberElement,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { CheckoutFormProps } from "../../interfaces/CheckoutFormProps";
// import { cardBrandIcons } from "../../data/CardData";
// import { makePayment } from "../../service/PaymentService";

// // Function to insert payment data into the backend
// const insertPaymentData = async (paymentDetails: {
//   userId: string;
//   reservationId: string;
//   userEmail: string;
//   amount: number;
//   numOfTickets: number;
//   paymentStatus: string;
//   transactionId: string;
// }) => {
//   try {
//     const formData = new FormData();
//     formData.append("userId", paymentDetails.userId);
//     formData.append("reservationId", paymentDetails.reservationId);
//     formData.append("userEmail", paymentDetails.userEmail);
//     formData.append("amount", paymentDetails.amount.toString());
//     formData.append("numOfTickets", paymentDetails.numOfTickets.toString());
//     formData.append("paymentStatus", paymentDetails.paymentStatus);
//     formData.append("transactionId", paymentDetails.transactionId);

//     const response = await makePayment(formData);
//     return response;
//   } catch (error) {
//     console.error("Error inserting payment data:", error);
//     throw new Error("Failed to insert payment data");
//   }
// };

// const Payment: React.FC<CheckoutFormProps> = ({
//   reservationId,
//   userId,
//   userEmail,
//   amount,
//   numOfTickets,
//   perTicketCharge,
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [cardBrand, setCardBrand] = useState<string | null>(null);

//   const handlePayment = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       alert("Stripe is not loaded properly.");
//       return;
//     }

//     if (!isChecked) {
//       alert("Please accept the terms and conditions to proceed.");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const { data: clientSecret } = await axios.post(
//         "http://localhost:8080/payment/process",
//         {
//           reservationId,
//           userEmail,
//           amount,
//           numOfTickets,
//           perTicketCharge
//         }
//       );

//       const cardElement = elements.getElement(CardElement);
//       if (!cardElement) throw new Error("CardElement not found");

//       const { paymentIntent, error } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: cardElement,
//             billing_details: {
//               email: userEmail,
//             },
//           },
//         }
//       );

//       if (error) {
//         console.error("Payment error:", error);
//         alert("Payment failed.");
//       } else if (paymentIntent?.status === "succeeded") {
//         alert("Payment successful!");

//         // Insert payment data into the backend
//         await insertPaymentData({
//           userId,
//           reservationId,
//           userEmail,
//           amount,
//           numOfTickets,
//           paymentStatus: paymentIntent.status,
//           transactionId: paymentIntent.id,
//         });

//         navigate("/myTickets");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("An error occurred during the payment process.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <form className="px-3 pb-3" onSubmit={handlePayment}>
//       <div className="payment-container">
//         <div className="form-element">
//           <div className="mb-3 text-white bg-dark text-center width-70">
//             Payment Form
//           </div>
//           <div className="d-flex justify-content-between width-70 alert alert-dark">
//             <span>Selected: {numOfTickets}</span>|
//             <span>One is: Rs.{perTicketCharge}.00</span>|
//             <span>Total: Rs.{amount}.00</span>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="card-number" className="form-label mt-2">
//               Email
//             </label>
//             <br />
//             <input
//               type="email"
//               className="emailinput"
//               value={userEmail}
//               disabled
//             />
//           </div>

//           <div>
//             <div className="d-flex justify-content-between marginright">
//               <label htmlFor="card-number" className="form-label mt-2">
//                 Card Information
//               </label>
//               {cardBrand && (
//                 <img
//                   src={cardBrandIcons[cardBrand] || cardBrandIcons["unknown"]}
//                   alt={cardBrand}
//                   className="ms-2"
//                   style={{ height: "40px", width: "auto" }}
//                 />
//               )}
//             </div>

//             <CardNumberElement
//               id="card-number"
//               className="form-control-cardnum"
//               options={{ style: { base: { fontSize: "16px" } } }}
//               onChange={(event) => {
//                 setCardBrand(event?.brand || "unknown");
//               }}
//             />
//           </div>

//           <div className="d-flex mb-3">
//             <CardExpiryElement
//               id="card-expiry"
//               className="form-control-date"
//               options={{ style: { base: { fontSize: "16px" } } }}
//             />
//             <CardCvcElement
//               id="card-cvc"
//               className="form-control-cvc"
//               options={{ style: { base: { fontSize: "16px" } } }}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="postal-code" className="form-label">
//               Name on the Card
//             </label>
//             <br />
//             <input
//               type="text"
//               id="postal-code"
//               className="form-control-name"
//               placeholder="Zhang San"
//             />
//           </div>

//           <div className="form-check mb-3">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="termsCheck"
//               checked={isChecked}
//               onChange={(e) => setIsChecked(e.target.checked)}
//             />
//             <label htmlFor="termsCheck" className="form-check-label">
//               I accept the terms and conditions
//             </label>
//           </div>

//           <button type="submit" className="pay-button" disabled={isProcessing}>
//             {isProcessing ? "Processing..." : "Pay Now"}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Payment;
