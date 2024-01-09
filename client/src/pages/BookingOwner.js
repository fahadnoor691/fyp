import React, { useEffect } from "react";
import Navbar from "../components/OwnerNav";
import Cards from "../components/BookingsOwner";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Cards />
    </div>
  );
}
