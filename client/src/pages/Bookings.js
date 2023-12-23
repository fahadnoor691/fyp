import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/BookingList";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Cards />
    </div>
  );
}
