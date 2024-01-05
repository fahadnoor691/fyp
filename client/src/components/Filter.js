import React, { useEffect, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css"; // Example: Using Airbnb theme, you can change it as needed

const CarSearchForm = ({ sortByPrice, sortOrder }) => {
  const [location, setLocation] = useState("");
  const [pickDate, setPickDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const searchButton = document.getElementById("searchButton");
    if (location) {
      searchButton.disabled = false;
    } else {
      searchButton.disabled = true;
    }
  }, [location, pickDate, returnDate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-sm">
      <div className="bg-white rounded shadow-md p-6">
        <h1 className="text-3xl font-semibold mb-4">
          Find the perfect car for your journey
        </h1>
        <form className="filter space-y-4">
          <div className="flex flex-col space-y-4">
            <label htmlFor="location" className="font-semibold">
              Pick-up Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <div className="flex items-center space-x-4">
            <label htmlFor="pickdate" className="font-semibold">
              Pick-up Date
            </label>
            <Flatpickr
              value={pickDate}
              onChange={(date) => setPickDate(date[0] || "")}
              options={{ dateFormat: "Y-m-d", minDate: "today" }}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="retdate" className="font-semibold">
              Return Date
            </label>
            <Flatpickr
              value={returnDate}
              onChange={(date) => setReturnDate(date[0] || "")}
              options={{ dateFormat: "Y-m-d" }}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div> */}
          <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
          <button
            type="submit"
            id="searchButton"
            disabled
            className="w-full p-4 bg-blue-500 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </form>
        <div className="w-full p-4 text-center">
          <button
            onClick={sortByPrice}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"}
            )
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarSearchForm;
