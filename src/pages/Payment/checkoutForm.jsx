import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.log(error.message);
      } else {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5005/api/payment", {
          //const response = await axios.post('https://petapp.fly.dev/api/payment', {
          id,
          // amount: totalPrice * 100,
          // client_secret: clientSecret,
        });

        if (response.data.success) {
          console.log("Payment successful");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
