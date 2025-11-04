import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyCarData, assets } from "../assets/assets";
import Loader from "../components/Loader";
import { gs } from "../style/glassUi";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    setCar(dummyCarData.find((car) => car._id === id));
  }, [id]);

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-30 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-200 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-80" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Car Image & Details */}
        <div className={`${gs.glass} lg:col-span-2 p-5 rounded-2xl`}>
          <img
            src={car.image}
            alt=""
            className={`${gs.glass} w-full h-auto md:max-h-100 object-cover mb-6 rounded-2xl`}
          />
          <div className="space-y-6">
            <div className={`${gs.glassCard} p-2 pl-5 rounded-2xl`}>
              <h1 className="text-3xl font-bold text-white">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-200 text-lg">
                {car.category} • {car.year}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className={`${gs.glassCard} flex flex-col items-center p-4 rounded-lg text-center text-gray-300`}
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className={`${gs.glassCard} p-2 rounded-2xl`}>
              <h1 className="text-2xl font-medium mb-3 text-gray-200">
                Description
              </h1>
              <p className="text-gray-300">{car.description}</p>
            </div>

            {/* Features */}
            <div className={`${gs.glassCard} p-2 rounded-2xl`}>
              <h1 className="text-2xl font-medium mb-3 text-gray-200">
                Features
              </h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-300">
                    <img src={assets.check_icon} className="h-4 mr-2" alt="" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div></div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
