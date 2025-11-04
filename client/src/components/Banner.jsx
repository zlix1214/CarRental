import React from "react";
import { gs } from "../style/glassUi";
import { assets } from "../assets/assets.js";

const Banner = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start items-center justify-between px-8 pt-10 w-auto">
      <div className="text-white">
        <h2 className="text-3xl font-medium">Do you own a Luxury Car?</h2>
        <p className="mt-2">
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>
        <p className="max-w-130">
          We take care of insurance, driver vertification and secure payments -
          so you can earn passive income, stress free.
        </p>
        <button className={`${gs.glassButton} px-6 py-2 text-sm mt-4`}>
          List your car
        </button>
      </div>
      <img src={assets.banner_car_image} alt="" className="max-h-45" />
    </div>
  );
};

export default Banner;
