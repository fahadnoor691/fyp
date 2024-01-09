import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const Card = () => {
  const [cars, setcars] = useState([]);
  let { user } = useContext(AuthContext);

  const fetchcarss = () => {
    axios
      .get(`http://localhost:8080/cars`)
      .then((res) => {
        setcars(res.data.cars);
        console.log("User:  ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .post(`http://localhost:8080/owner/delete-car/${id}`)
      .then((res) => {
        console.log("Car Deleted Successfully");
        console.log(res.data.message); // Log the response for debugging
        toast.success("Car Deleted Successfully");
        // After successful deletion, update the cars list by removing the deleted car
        setcars(cars.filter((car) => car._id !== id));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in deleting car");
      });
  };
  useEffect(() => {
    fetchcarss();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-stretch">
      <div style={{ paddingBottom: "64px" }}>
        {/* Other content components */}
      </div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 darki:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Car
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Transmission
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Mileage
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Seats
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cars?.map((car, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 darki:text-gray-200">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 darki:text-gray-200">
                        {car.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 darki:text-gray-200">
                        {car.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 darki:text-gray-200">
                        {car.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 darki:text-gray-200">
                        {car?.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 darki:text-gray-200">
                        {car.transmission}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 darki:text-gray-200">
                        {car.mileage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 darki:text-gray-200">
                        {car.seats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 darki:text-gray-200">
                        {car.carType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 darki:text-gray-200">
                        {car.location}
                      </td>
                      <button
                        className="btn btn-error"
                        onClick={() => handleDelete(car._id)}
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
