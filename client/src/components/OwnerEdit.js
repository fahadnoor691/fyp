import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  Link,
  Navigate,
  Redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import OwnerNav from "../components/OwnerNav";

const AddCarForm = () => {
  let { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [data, setData] = useState({
    brand: "",
    name: "",
    model: "",
    price: "",
    transmission: "",
    mileage: "",
    seats: "",
    carType: "",
    image: "",
    location: "",
    ownerId: user._id,
  });
  const { id } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/car-description/${id}`).then((res) => {
      const data = res.data.car;
      setData({
        brand: data.brand,
        name: data.name,
        model: data.model,
        price: data.price,
        carType: data.carType,
        image: data.image,
        transmission: data.transmission,
        mileage: data.mileage,
        seats: data.seats,
        location: data.location,
        carId: id,
      });
      console.log("DATA: ", res.data);
    });
  }, [id]);

  const handleSubmit = (values) => {
    axios
      .post(`http://localhost:8080/edit-car/${id}`, data) // Directly sending 'data' object here
      .then((res) => {
        toast.success("Car Edit successfully:");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Error in editing car");
        console.log(err);
      });
    // Handle form submission logic here
    console.log(values);
    navigate(-1);
  };

  return (
    <>
      <OwnerNav />
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Add a Car</h2>
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="Enter car brand"
            onChange={handleChange}
            value={data.brand}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter car name"
            onChange={handleChange}
            value={data.name}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            placeholder="Enter car model"
            onChange={handleChange}
            value={data.model}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Enter car price"
            onChange={handleChange}
            value={data.price}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Transmission
          </label>
          <input
            type="text"
            id="transmission"
            name="transmission"
            placeholder="Enter car transmission"
            onChange={handleChange}
            value={data.transmission}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Mileage
          </label>
          <input
            type="text"
            id="mileage"
            name="mileage"
            placeholder="Enter car mileage"
            onChange={handleChange}
            value={data.mileage}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Seats
          </label>
          <input
            type="text"
            id="seats"
            name="seats"
            placeholder="Enter car seats"
            onChange={handleChange}
            value={data.seats}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Car Type
          </label>
          <input
            type="text"
            id="carType"
            name="carType"
            placeholder="Enter car car type"
            onChange={handleChange}
            value={data.carType}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter car image"
            onChange={handleChange}
            value={data.image}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter car location"
            onChange={handleChange}
            value={data.location}
          />
        </div>

        {/* Repeat similar pattern for other input fields */}
        <div className="flex justify-center">
          <button
            className="btn btn-warning btn-block"
            type="submit"
            onClick={handleSubmit}
          >
            Edit Car
          </button>
        </div>
        <div style={{ zIndex: 999999999999999 }}>
          <Toaster position="bottom-center" />
        </div>
      </div>
    </>
  );
};

export default AddCarForm;
