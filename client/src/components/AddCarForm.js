import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AddCarForm = () => {
  let { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    brand: "",
    name: "",
    model: "",
    price: "",
    transmission: "",
    mileage: "",
    seats: "",
    carType: "",
    images: [],
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

  const handleFileChange = (event, index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = event.target.files[0];
    setFiles(updatedFiles);
  };

  const addFileInput = () => {
    setFiles([...files, null]);
  };

  const removeFileInput = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      if (file) {
        formData.append("files", file);
      }
    });

    try {
      const res = await axios.post("http://localhost:8080/upload", formData);
      const uploadedImages = res.data.map((image) => image.filePath);
      setData({
        ...data,
        images: [...data.images, ...uploadedImages],
      });
      setFiles([]);
      toast.success("Files Uploaded Successfully!");
    } catch (err) {
      toast.error("Error in uploading files");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleFileUpload();
    try {
      await axios.post("http://localhost:8080/owner/add-car", data);
      toast.success("Car Added successfully:");
      navigate(-1);
    } catch (err) {
      toast.error("Error in adding car");
      console.log(err);
    }
  };

  return (
    // <div className="max-w-md mx-auto">
    //   <h2 className="text-3xl font-bold text-center mb-6">Add a Car</h2>
    //   {/* ...other input fields */}
    //   <div>
    //     <div className="mb-4">
    //       <label
    //         htmlFor="image"
    //         className="block text-gray-700 text-sm font-semibold mb-2"
    //       >
    //         Images
    //       </label>
    //       {files.map((file, index) => (
    //         <div key={index}>
    //           <input type="file" onChange={(e) => handleFileChange(e, index)} />
    //           <button onClick={() => removeFileInput(index)}>Remove</button>
    //         </div>
    //       ))}
    //       <button onClick={addFileInput}>Add More</button>
    //     </div>
    //     {/* ...rest of the code remains the same */}
    //   </div>
    //   {/* ...rest of the code remains the same */}
    // </div>

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
          type="text"
          id="carType"
          name="carType"
          placeholder="Enter car car type"
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Images
        </label>
        {files.map((file, index) => (
          <div key={index}>
            <input type="file" onChange={(e) => handleFileChange(e, index)} />
            <button onClick={() => removeFileInput(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addFileInput}>Add More</button>
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
        />
      </div>

      {/* Repeat similar pattern for other input fields */}
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
