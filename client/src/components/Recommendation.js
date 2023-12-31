import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import styles from "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "./RecommendationPage.css";
import axios from "axios";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CarSlider = () => {
  const [cars, setLatestCars] = useState([]);

  useEffect(() => {
    const fetchLatestCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/latest");
        console.log(response.data);
        setLatestCars(response.data.cars);
      } catch (error) {
        console.error("Error fetching latest cars: ", error);
      }
    };

    fetchLatestCars();
  }, []);
  return (
    <div className="page">
      <Navbar />
      <div className="recommend-container">
        <h1 style={{ textAlign: "center" }}>Recommendations</h1>

        <AwesomeSlider cssModule={styles}>
          {cars.map((car) => (
            <div key={car.id}>
              <a href={`/car-description/${car._id}`}>
                <img
                  src={car.image}
                  alt={car.name}
                  data-src={car.image}
                  className="slider-image"
                />
                <div className="car-overlay">
                  <div className="car-details">
                    <h3>{car.brand}</h3>
                    <p>Name: {car.name}</p>
                    <p>Model: {car.model}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </AwesomeSlider>
      </div>
    </div>
  );
};

export default CarSlider;
