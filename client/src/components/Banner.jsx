import React from "react";
import { gs } from "../style/glassUi";
import { assets } from "../assets/assets.js";

const Banner = () => {
  return (
    <div className="flex flex-col gap-12 lg:flex-row  md:justify-center items-center px-8 mt-80">
      <div className="text-white flex flex-col items-center lg:items-start">
        <h2 className="text-4xl sm:text-5xl font-medium text-center lg:text-left">
          Do you own a Luxury Car?
        </h2>
        <p className="mt-2 text-base sm:text-xl text-center lg:text-left max-w-130">
          Monetize your vehicle effortlessly by listing it on CarRental. We take
          care of insurance, driver vertification and secure payments - so you
          can earn passive income, stress free.
        </p>
        <button className={`${gs.glassButton} px-6 py-2 text-basic mt-4 w-1/2`}>
          List your car
        </button>
      </div>
      <img src={assets.banner_car_image} alt="" className="max-h-60" />
    </div>
  );
};

export default Banner;
