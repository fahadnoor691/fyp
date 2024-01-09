import React, { useEffect, useState } from "react";
import Navbar from "../components/OwnerNav";
import Cards from "../components/BookingsOwner";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed
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
          <Cards />
        </div>
      )}
    </div>
  );
}
