import React, { useState } from "react";
import "./Payments.css"; // Your CSS file for styling
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryChange = (e) => {
    setExpiry(e.target.value);
  };

  const handleCVVChange = (e) => {
    setCVV(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    toast.success("Your car has been successfully booked!");
    navigate("/home");
  };

  setTimeout(() => {}, 1500);

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <label htmlFor="cardNumber">Card Number</label>
      <input
        type="text"
        id="cardNumber"
        value={cardNumber}
        onChange={handleCardNumberChange}
        placeholder="1234 5678 9012 3456"
        required
      />

      <label htmlFor="expiry">Expiry</label>
      <input
        type="text"
        id="expiry"
        value={expiry}
        onChange={handleExpiryChange}
        placeholder="MM/YY"
        required
      />

      <label htmlFor="cvv">CVV</label>
      <input
        type="text"
        id="cvv"
        value={cvv}
        onChange={handleCVVChange}
        placeholder="123"
        required
      />

      <label htmlFor="name">Name on Card</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        placeholder="John Doe"
        required
      />

      <button className="btn btn-warning btn-block">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
