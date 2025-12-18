import React from "react";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { gs } from "../style/glassUi";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 mt-80 ">
      <h2 className="text-center text-white text-5xl md:text-7xl">
        {t("featuredSection.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-12 lg:mt-16 p-5 w-full max-w-6xl ">
        {cars
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6)
          .map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
      </div>

      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="px-6 py-3 mt-18 w-auto text-sm sm:text-base md:text-xl lg:text-2xl text-white cursor-pointer shadow-sm shadow-white rounded-2xl hover:scale-105 hover:shadow-md transition-all duration-300"
      >
        {t("featuredSection.expandButton")}
      </button>
    </div>
  );
};

export default FeaturedSection;
