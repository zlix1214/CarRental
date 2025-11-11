import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { gs } from "../style/glassUi";

const CarCard = ({ car }) => {
  const specs = [
    {
      icon: assets.users_icon,
      value: car.seating_capacity,
      label: "Seats",
      hover: false,
    },
    {
      icon: assets.fuel_icon,
      value: car.fuel_type,
      label: "Fuel",
      hover: true,
    },
    {
      icon: assets.car_icon,
      value: car.transmission,
      label: "Type",
      hover: true,
    },
    {
      icon: assets.location_icon,
      value: car.location,
      label: "Location",
      hover: true,
    },
  ];

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500
      hover:shadow-2xl hover:-translate-y-2 shadow-black/90"
    >
      {/* Large Image Section - 60% height */}
      <div className="relative h-45 sm:h-55 lg:h-65 xl:h-75 overflow-hidden">
        <img
          src={car.image}
          alt="Car"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Floating Tags on Image */}
        <div className="absolute top-4 left-4 right-4 flex lg:flex-col xl:flex-row gap-2 justify-between  items-start ">
          <div className="bg-white/80 sm:bg-white px-4 py-1 sm:py-2 rounded-full shadow-xl">
            <span className="text-black text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
              Available Now
            </span>
          </div>

          <div className="bg-white/80 sm:bg-white px-5 sm:py-1 rounded-2xl shadow-xl flex-col items-center gap-2">
            <div className="text-xs sm:text-base font-semibold text-black py-1 sm:py-0">
              {currency} {car.pricePerDay}
            </div>
            {/* <div className=" hidden sm:block text-xs sm:text-base text-black/80 font-medium">
              per day
            </div> */}
          </div>
        </div>

        {/* Bottom gradient for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Info Section - 40% height, clean white background */}
      <div className="relative bg-gradient-to-b from-[#000000] to-[#910b0b] p-6 space-y-4">
        {/* Car Name & Tags */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {car.brand} <span className="text-white-400">{car.model}</span>
          </h3>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              {car.category}
            </span>
            <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-semibold">
              {car.year}
            </span>
          </div>
        </div>

        {/* Specs Grid - Compact & Clean */}
        <div className="grid grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-2">
          {specs.map((spec, index) => (
            <div
              key={index}
              className={`${gs.glassDark} flex items-center lg:justify-between p-3 rounded-xl
              }`}
            >
              <img src={spec.icon} alt="" className="h-5 w-5 mb-1" />
              <div className="text-xs md:text-sm font-semibold text-slate-200 truncate w-full text-center">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CarCard;
