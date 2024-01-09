import React, { useEffect, useState } from "react";
import Payment from "../components/Payment";
import Navbar from "../components/Navbar";

export default function PaymentForm() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500); // Adjust the delay as needed
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex items-center gap-4 justify-center h-screen">
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
        </div>
      ) : (
        <div>
          <Navbar />
          <h1 className="text-center text-3xl font-bold pt-8">
            Make a payment
          </h1>

          <Payment />
        </div>
      )}
    </div>
  );
}
