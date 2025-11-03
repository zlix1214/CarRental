import React from "react";
import { dummyCarData, assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { gs } from "../style/glassUi";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-white text-3xl md:text-7xl">Featured Cars</h1>
      <div
        className={`${gs.glassCard} grid grid-cols-1 sm:grid-cols-2 gap-8 mt-18 p-5 w-full`}
      >
        {dummyCarData.slice(0, 6).map((car) => (
          <div key={car._id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className={`${gs.glassButton} flex items-center justify-center gap-2 px-6 py-2 rounded-md mt-18 text-white cursor-pointer`}
      >
        Explore all cars
      </button>
    </div>
  );
};

export default FeaturedSection;
