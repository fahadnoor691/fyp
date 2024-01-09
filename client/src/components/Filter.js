import React, { useEffect, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css"; // Example: Using Airbnb theme, you can change it as needed
import { Link } from "react-router-dom";

const CarSearchForm = ({ sortByPrice, sortOrder, cars, setFilteredCars }) => {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filtered = cars.filter((car) =>
      Object.values(car).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredCars(filtered);
  }, [searchQuery, cars, setFilteredCars]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-sm">
      {/* ... (other JSX remains unchanged) */}
      <div className="flex flex-col space-y-4">
        <label htmlFor="search" className="font-semibold">
          Search
        </label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for a car"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      {/* ... (rest of the JSX remains unchanged) */}
      <div className="flex justify-center items-center space-x-4">
        <div className="w-full p-4 text-center">
          <button
            onClick={sortByPrice}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"}
            )
          </button>
        </div>

        <div className="w-full p-4 text-center">
          <button
            // onClick={showRecommendedCars}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <Link to={"/recommendation"}>Recommended Cars</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarSearchForm;
