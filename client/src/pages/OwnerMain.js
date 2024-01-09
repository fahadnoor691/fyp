import React, { useEffect, useState } from "react";
import OwnerNav from "../components/OwnerNav";
import OwnerCar from "../components/OwnerCarDetail";

export default function OwnerMain() {
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
          <OwnerCar />
        </div>
      )}
    </div>
  );
}
