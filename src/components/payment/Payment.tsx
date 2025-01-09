import React, { useState } from 'react';
import { CardElement, useStripe, useElements, CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckoutFormProps } from '../../interfaces/CheckoutFormProps';
import { cardBrandIcons } from '../../data/CardData';

const Payment: React.FC<CheckoutFormProps> = ({ reservationId, userId, userEmail, amount, numOfTickets, perTicketCharge }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [cardBrand, setCardBrand] = useState<string | null>(null);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      alert('Stripe is not loaded properly.');
      console.error(userId);
      return;
    }

    if (!isChecked) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }

    setIsProcessing(true);

    try {
      const { data: clientSecret } = await axios.post('http://localhost:8080/payment/create-intent', {
        amount,
        reservationId,
      });

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('CardElement not found');

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: userEmail,
          },
        },
      });

      if (error) {
        console.error('Payment error:', error);
        alert('Payment failed.');
      } else if (paymentIntent?.status === 'succeeded') {
        alert('Payment successful!');
        navigate('/myTickets');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred during the payment process.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form className="form-group p-3 border shadow" onSubmit={handlePayment}>
      <div className="bg-dark rounded">
        <h5 className="text-light p-3 text-center">Payment Details</h5>
      </div>
      <div className="d-flex justify-content-between text-dark px-2">
        <p className="h5 text-end btn btn-outline-dark disabled">One ticket price: Rs.{perTicketCharge}.00</p>
        <p className="h5 text-end btn btn-outline-dark disabled">Num of tickets: {numOfTickets}</p>
        <p className="h5 text-end btn btn-outline-dark disabled">Total: Rs.{amount}.00</p>
      </div>
      
      {/* <CardElement className="form-control mb-3 py-3" /> */}

      <div className="mb-3">
          {cardBrand && (
            <div className="mt-1 text-muted d-flex align-items-center">
              <label htmlFor="card-number" className="form-label">Card Number <i className={`${cardBrandIcons[cardBrand] || cardBrandIcons['unknown']} m-2`}></i></label>
            </div>
          )}
          <CardNumberElement
            id="card-number"
            className="form-control py-3"
            options={{
              style: { base: { fontSize: '16px' } },
            }}
            onChange={(event) => {
              setCardBrand(event?.brand || "unknown");
            }}
          />
        </div>


        <div className="mb-3">
          <label htmlFor="card-expiry" className="form-label">Expiration Date</label>
          <CardExpiryElement
            id="card-expiry"
            className="form-control"
            options={{
              style: { base: { fontSize: '16px' } }
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="card-cvc" className="form-label">CVC</label>
          <CardCvcElement
            id="card-cvc"
            className="form-control"
            options={{
              style: { base: { fontSize: '16px' } }
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="postal-code" className="form-label">Postal Code</label>
          <input
            type="text"
            id="postal-code"
            className="form-control"
            placeholder="Enter your postal code"
          />
        </div>


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
      <button type="submit" className="btn btn-primary w-100" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default Payment;