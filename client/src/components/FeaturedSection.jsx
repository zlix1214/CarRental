import React from "react";
import { dummyCarData, assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { gs } from "../style/glassUi";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 mt-80 ">
      <h1 className="text-center text-white text-5xl md:text-7xl">
        Featured Cars
      </h1>
      <div
        className={`${gs.glassCard} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-12 lg:mt-16 p-5 w-full`}
      >
        {dummyCarData.slice(0, 6).map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className={`bg-white/10 p-3 md:p-5 mt-18 w-auto text-sm sm:text-base md:text-xl lg:text-2xl text-white cursor-pointer shadow-2xl rounded-2xl`}
      >
        Explore all cars
      </button>
    </div>
  );
};

export default FeaturedSection;
