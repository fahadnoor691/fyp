import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import OwnerNav from "../components/OwnerNav";
import { toast, Toaster } from "react-hot-toast";

const Card = () => {
  const [cars, setCars] = useState([]);
  let { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/owner/list/${user?._id}`)
      .then((res) => {
        setCars(res.data.cars);
        console.log("User:  ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .post(`http://localhost:8080/owner/delete-car/${id}`)
      .then((res) => {
        console.log("Car Deleted Successfully");
        console.log(res.data.message); // Log the response for debugging
        toast.success("Car Deleted Successfully");
        // After successful deletion, update the cars list by removing the deleted car
        setCars(cars.filter((car) => car._id !== id));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in deleting car");
      });
  };

  return (
    <>
      <OwnerNav />
      <div className="flex flex-wrap justify-center items-stretch">
        {cars.map((car, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 p-4 flex justify-center items-stretch"
          >
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white w-full hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col justify-between">
              <h2 className="text-center py-4">
                {car.brand} {car.name}
              </h2>
              <img
                className="w-full h-56 object-cover object-center"
                src={car.image}
                alt={`Image ${index}`}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Title</div>
                <ul className="text-gray-700 text-base">
                  <li>{car.price}</li>
                  <li>{car.model}</li>
                  <li>{car.type}</li>
                </ul>
              </div>
              <div className="px-6 py-4">
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to={`http://localhost:3001/car-description/${car._id}`}>
                  Description
                </Link>
              </button> */}
                <div>
                  <button className="btn btn-outline btn-info">
                    <Link to={`/edit-car/${car._id}`}>Edit</Link>
                  </button>
                  <span style={{ margin: "0 5px" }}></span>
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => handleDelete(car._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ zIndex: 999999999999999 }}>
        <Toaster position="bottom-center" />
      </div>
    </>
  );
};

export default Card;
