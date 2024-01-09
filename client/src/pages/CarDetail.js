import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const ProductDetail = () => {
  let { user } = useContext(AuthContext);
  let navigate = useNavigate();
  const [selectedDate, setselectedDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);

  const [carData, setCarData] = useState([]);
  const id = useParams();
  console.log("ID; ", id.id);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/car-description/${id.id}`)
      .then((res) => {
        setCarData(res.data.car);
        console.log("USER ID: ", user);
      })
      .catch((err) => {
        console.log("Error:  ", err);
      });
  }, [id]);
  const [index, setIndex] = useState(0);

  const [calculatedPrice, setCalculatedPrice] = useState(0); // State for calculated price

  const handleStartDateChange = (event) => {
    const { value } = event.target;
    // Validation: Start date should not be before the current date
    const currentDate = moment().format("YYYY-MM-DD");
    if (value < currentDate) {
      toast.error("Start date cannot be before the current date");
      return;
    }

    setselectedDate(value);
  };

  const handleEndDateChange = (event) => {
    const { value } = event.target;
    const startDate = moment(selectedDate, "YYYY-MM-DD");
    const endDate = moment(value, "YYYY-MM-DD");

    // Validation: End date should not be before the start date
    if (endDate < startDate) {
      toast.error("End date cannot be before the start date");
      return;
    }

    setEndDate(value);

    // Calculate price based on start and end date
    const duration = endDate.diff(startDate, "days");
    setDuration(duration);
    const calculatedPrice = carData.price * duration || 0;
    setCalculatedPrice(calculatedPrice);
  };
  const handleBooking = () => {
    if (!selectedDate && !enddate) {
      toast.error("Please select pick and return date before booking");
      return;
    }
    axios
      .post("http://localhost:8080/book-car", {
        userId: user._id,
        carId: id.id,
        startdate: selectedDate,
        endDate: enddate,
        price: calculatedPrice,
        carName: carData.name,
        carBrand: carData.brand,
        carModel: carData.model,
        carTransmission: carData.transmission,
        carSeats: carData.seats,
        carPrice: carData.price,
        ownerId: carData.ownerId,
        status: true,
      })
      .then((res) => {
        if (res.status === 201) {
          setTimeout(() => {
            navigate("/payment");
          });
        } else if (res.status === 405) {
          toast.error("Car Already Booked!");
        } else {
          // Handle other statuses if needed
        }
      })
      .catch((err) => {
        console.error("Failed to book: ", err);
        toast.error("Car Already Booked! " + err.message);
      });
  };

  const productDetailItem = {
    images: [
      {
        original: carData.image,
        thumbnail: carData.image,
      },
      {
        original: carData.image,
        thumbnail: carData.image,
      },

      // {
      //   original:
      //     "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   thumbnail:
      //     "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      // },
      // {
      //   original:
      //     "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
      //   thumbnail:
      //     "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
      // },
    ],
  };
  const product = {
    name: "Example Product",
    image: "product-image-url.jpg",
    description:
      "This is an example product description highlighting its features and benefits.",
    price: "$99.99",
    details: [
      { label: "Color", value: "Blue" },
      { label: "Size", value: "Medium" },
      { label: "Material", value: "Cotton" },
      // Add more details as needed
    ],
  };

  const [loading, setLoading] = useState(true);
  const [subloading, setSubLoading] = useState(false);

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
          <Navbar />

          <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
            {/* image gallery */}
            <div className="container mx-auto px-4">
              <ReactImageGallery
                showBullets={false}
                showFullscreenButton={false}
                showPlayButton={false}
                items={productDetailItem.images}
              />

              {/* /image gallery  */}
            </div>
            {/* description  */}

            <div className="mx-auto px-5 lg:px-5">
              <h2 className="pt-3 text-2xl font-bold lg:pt-0">
                {carData.brand} {carData.name}
              </h2>
              <div className="mt-1">
                <div className="flex items-center">
                  <Rater
                    style={{ fontSize: "20px" }}
                    total={5}
                    interactive={false}
                    rating={3.5}
                  />

                  <p className="ml-3 text-sm text-gray-400">
                    ({productDetailItem.reviews})
                  </p>
                </div>
              </div>

              <p className="mt-4 text-4xl font-bold text-violet-900">
                ${calculatedPrice}{" "}
                <span className="text-xs text-gray-400 line-through">
                  for {duration} days
                </span>
              </p>
              <p className="pt-5 text-sm leading-5 text-gray-500">
                {productDetailItem.description}
              </p>
              <label htmlFor="">Start date:</label>
              <input type="date" onChange={handleStartDateChange} />

              <label htmlFor="">End date:</label>
              <input type="date" onChange={handleEndDateChange} />
              <div className="mt-7 flex flex-row items-center gap-6">
                <button
                  className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300"
                  onClick={handleBooking}
                >
                  Booking
                </button>
              </div>
            </div>
          </section>
          <div className="w-full mt-6 px-16">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-200 px-4 py-3">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-black">
                  Car Details
                </h3>
              </div>
              <table className="w-full border-collapse border-t border-gray-300">
                <tbody>
                  <tr className={"bg-white"}>
                    <td className="px-2 py-2 font-medium text-gray-700">
                      Model
                    </td>
                    <td className="px-10 py-2 text-gray-600">
                      {carData.model}
                    </td>
                  </tr>
                  <tr className={"bg-gray-100"}>
                    <td className="px-2 py-2 font-medium text-gray-700">
                      Seats
                    </td>
                    <td className="px-10 py-2 text-gray-600">
                      {carData.seats}
                    </td>
                  </tr>
                  <tr className={"bg-white"}>
                    <td className="px-2 py-2 font-medium text-gray-700">
                      Mileage
                    </td>
                    <td className="px-10 py-2 text-gray-600">
                      {carData.mileage}
                    </td>
                  </tr>
                  <tr className={"bg-gray-100"}>
                    <td className="px-2 py-2 font-medium text-gray-700">
                      Car Type
                    </td>
                    <td className="px-10 py-2 text-gray-600">
                      {carData.carType}
                    </td>
                  </tr>
                  <tr className={"bg-white"}>
                    <td className="px-2 py-2 font-medium text-gray-700">
                      Transmission
                    </td>
                    <td className="px-10 py-2 text-gray-600">
                      {carData.transmission}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ zIndex: 999999999999999 }}>
              <Toaster position="bottom-center" />
            </div>
          </div>
          <div style={{ paddingTop: "64px" }}>
            {/* Other content components */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
