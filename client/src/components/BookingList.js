import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const Card = () => {
  const [booking, setbooking] = useState([]);
  let { user } = useContext(AuthContext);

  const fetchBookings = () => {
    axios
      .get(`http://localhost:8080/get-bookings/${user._id}`)
      .then((res) => {
        setbooking(res.data.bookings);
        console.log("User:  ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getSubById, setgetSubById] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleEdit = (id) => {
    const price = 10; // Assuming this is intentional
    axios
      .post(`http://localhost:8080/edit-booking/${id}`, {
        bookingId: id,
        startDate: startDate,
        endDate: endDate,
        price: calculatedPrice,
      })
      .then((res) => {
        closeModal();
        toast.success("Booking Edited Successfully");
      })
      .catch((err) => {
        closeModal();
        toast.error("Error editing booking");
      });
  };

  const openModal = (item) => {
    setIsModalOpen(true);
    setgetSubById(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setgetSubById({});
  };

  const handleDelete = (id) => {
    axios
      .post(`http://localhost:8080/delete-booking/${id}`)
      .then((res) => {
        toast.success("Booking delete successfully");
        fetchBookings();
      })
      .catch((err) => {
        toast.error("Error in deleting booking");
      });
  };
  const [duration, setDuration] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(0); // State for calculated price
  const [price, setPrice] = useState(0); // State for calculated price

  const handleStartDateChange = (event) => {
    const { value } = event.target;
    const currentDate = moment().format("YYYY-MM-DD");
    if (value < currentDate) {
      toast.error("Start date cannot be before the current date");
      return;
    }

    setStartDate(value);
  };

  const handleEndDateChange = (event) => {
    const { value } = event.target;
    const startdate = moment(startDate, "YYYY-MM-DD");
    const endDate = moment(value, "YYYY-MM-DD");

    // Validation: End date should not be before the start date
    if (endDate < startdate) {
      toast.error("End date cannot be before the start date");
      return;
    }

    setEndDate(value);

    // Calculate price based on start and end date
    const duration = endDate.diff(startDate, "days");
    setDuration(duration);
    const calculatedPrice = price * duration || 0;
    setCalculatedPrice(calculatedPrice);
  };

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
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {booking?.map((car, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 darki:text-gray-200">
                        {car.carBrand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 darki:text-gray-200">
                        {car.carName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 darki:text-gray-200">
                        {car.carModel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 darki:text-gray-200">
                        {car?.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 darki:text-gray-200">
                        {car.endDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 darki:text-gray-200">
                        {car.price}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            className="btn btn-outline btn-info"
                            onClick={() => {
                              setPrice(car.carPrice);
                              openModal(car);
                              document.getElementById("my_modal_5").showModal();
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline btn-error"
                            onClick={() => {
                              handleDelete(car._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
          <div className="modal-box p-0">
            <div className="modal-action absolute top-0 right-0  z-[99999]">
              <form method="dialog">
                <button className="btn btn-circle">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </form>
            </div>

            <div className="w-full bg-white  transform   duration-200 easy-in-out rounded-t-2xl ">
              <div className=" ">
                <div className=" px-14 bg-white">
                  <div style={{ paddingTop: "20px" }}>
                    {/* Other content components */}
                  </div>
                  <p className="text-gray-400  mt-2 hover:text-blue-500 text-center">
                    {getSubById?.email === "" ? "not found" : getSubById?.email}
                  </p>

                  <div class="flow-root mt-8">
                    <dl class="-my-3 divide-y divide-gray-100 text-sm">
                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Car </dt>
                        <dd class="text-gray-700 sm:col-span-2">
                          {getSubById?.carName}
                        </dd>
                      </div>

                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Price</dt>
                        <dd class="text-gray-700 sm:col-span-2">
                          {getSubById?.price}
                        </dd>
                      </div>
                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Start Date</dt>
                        <dd class="text-gray-700 sm:col-span-2">
                          {getSubById?.startDate}
                          <input type="date" onChange={handleStartDateChange} />
                        </dd>
                      </div>
                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">End Date</dt>
                        <dd class="text-gray-700 sm:col-span-2">
                          {getSubById?.endDate}{" "}
                          <input type="date" onChange={handleEndDateChange} />
                        </dd>
                      </div>
                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">New Price</dt>
                        <dd class="text-gray-700 sm:col-span-2">
                          {calculatedPrice}{" "}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <hr className="mt-6" />
                <div className="flex  bg-gray-50 ">
                  <div className="border" />
                  <div
                    className="text-center w-full p-4 bg-yellow-100 hover:bg-yellow-400 cursor-pointer "
                    onClick={(e) => handleEdit(getSubById._id)}
                  >
                    <p>
                      {" "}
                      <span className="font-semibold">Edit Changes</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div> */}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Card;
