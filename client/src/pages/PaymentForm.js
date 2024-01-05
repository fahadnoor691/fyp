import React from "react";
import Payment from "../components/Payment";
import Navbar from "../components/Navbar";

export default function PaymentForm() {
  return (
    <div>
      <Navbar />
      <h1 className="text-center text-3xl font-bold pt-8">Make a payment</h1>

      <Payment />
    </div>
  );
}
