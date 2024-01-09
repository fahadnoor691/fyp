import React, { useEffect, useState } from "react";
import AddCarForm from "../components/AddCarForm";
import OwnerNav from "../components/OwnerNav";

export default function AddCar() {
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
          <OwnerNav />
          <AddCarForm />
        </div>
      )}
    </div>
  );
}
