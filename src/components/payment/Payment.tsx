import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckoutFormProps } from '../../interfaces/CheckoutFormProps';

const Payment: React.FC<CheckoutFormProps> = ({ reservationId, userId, userEmail, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
    <form className="form-group p-3 border shadow rounded" onSubmit={handlePayment}>
      <h4>Total Charge: Rs.{amount}.00</h4>
      <CardElement className="form-control mb-3" />
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