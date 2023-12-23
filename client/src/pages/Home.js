import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Filter from "../components/Filter";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carAction";

export default function Home() {
  const { cars } = useSelector((state) => state.carReducers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCars());
  }, []);
  return (
    <div>
      <Navbar />
      <Filter />
      <Cards />
    </div>
  );
}
