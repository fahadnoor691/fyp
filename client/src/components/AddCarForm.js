import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link, Navigate, Redirect, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (values) => {
    axios
      .post("http://localhost:8080/owner/add-car", data) // Directly sending 'data' object here
      .then((res) => {
        toast.success("Car Added successfully:");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Error in adding car");
        console.log(err);
      });
    // Handle form submission logic here
    console.log(values);
    navigate(-1);
  };

  const [files, setFiles] = useState("");
  const handleFileUpload = async (e) => {
    const formData = new FormData();
    // files.forEach((file) => {
    formData.append("files", e.target.files[0]);
    // });

    try {
      const res = await axios.post("http://localhost:8080/upload", formData);
      // const uploadedImages = res.data.map((image) => image.filePath);
      // setData({
      //   ...data,
      //   images: [...data.images, ...uploadedImages],
      // });
      // setFiles([]);
      toast.success("Files Uploaded Successfully!");
    } catch (err) {
      toast.error("Error in uploading files");
    }
  };

  return (
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
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="brand"
          name="brand"
          placeholder="Enter car brand"
          onChange={handleChange}
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
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="name"
          name="name"
          placeholder="Enter car name"
          onChange={handleChange}
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
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="model"
          name="model"
          placeholder="Enter car model"
          onChange={handleChange}
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
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="price"
          name="price"
          placeholder="Enter car price"
          onChange={handleChange}
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
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="mileage"
          name="mileage"
          placeholder="Enter car mileage"
          onChange={handleChange}
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
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="seats"
          name="seats"
          placeholder="Enter car seats"
          onChange={handleChange}
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
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="carType"
          name="carType"
          placeholder="Enter car car type"
          onChange={handleChange}
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
          onChange={handleChange}
          id="image"
          name="image"
          className="input input-bordered w-full max-w-xs"
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
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="location"
          name="location"
          placeholder="Enter car location"
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center">
        <button
          className="btn btn-warning btn-block"
          type="submit"
          onClick={handleSubmit}
        >
          Add Car
        </button>
      </div>
      <div style={{ zIndex: 999999999999999 }}>
        <Toaster position="bottom-center" />
      </div>
    </div>
  );
};

export default AddCarForm;
