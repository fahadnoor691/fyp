import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Card = () => {
  const [cars, setCars] = useState([]);
  let { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/cars")
      .then((res) => {
        setCars(res.data.cars);
        console.log("User:  ", user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to={`/car-description/${car._id}`}>Description</Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
