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
                    <ul className="text-gray-700 text-base">
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        {car.transmission}
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                          />
                        </svg>
                        {car.carType}
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        {car.price}/day
                      </li>
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
      )}
    </div>
  );
};

export default Card;
