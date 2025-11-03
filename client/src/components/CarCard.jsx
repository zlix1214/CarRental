import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { gs } from "../style/glassUi";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  return (
    <div className={`${gs.glassCard} flex cursor-pointer overflow-hidden h-58`}>
      <div className="relative w-1/2 overflow-hidden">
        <img
          src={car.image}
          alt="Car Image"
          className="w-full h-full object-cover"
        />

        {car.isAvaliable && (
          <p
            className={`${gs.glass} absolute top-4 left-4  text-white text-xs px-2.5 py-1 rounded-full`}
          >
            Available Now
          </p>
        )}

        <div
          className={`${gs.glass} absolute bottom-4 right-4 px-2.5 py-1 rounded-full`}
        >
          <span className="font-semibold text-white">
            {currency}
            {car.pricePerDay}
          </span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 w-1/2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">
              {car.brand} {car.model}
            </h3>
            <p className="text-muted-foreground text-sm">
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-y-2 md:gap-y-4 text-gray-600">
          <div className="flex gap-1 items-center text-sm text-muted-foreground md:flex-col md:text-center ">
            <img src={assets.users_icon} alt="" className="h-4 mr-2" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-muted-foreground md:flex-col md:text-center">
            <img src={assets.fuel_icon} alt="" className="h-4 mr-2" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-muted-foreground md:flex-col md:text-center">
            <img src={assets.car_icon} alt="" className="h-4 mr-2" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground md:flex-col">
            <img src={assets.location_icon} alt="" className="h-4 mr-2" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
