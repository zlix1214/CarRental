import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets, cityList } from "../assets/assets";
import { gs } from "../style/glassUi";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center gap-4 text-center">
      <img src={assets.main_car} alt="car" className="" />
      <h1 className="text-3xl md:text-8xl text-white">Luxury cars on Rent.</h1>

      <form
        className={`${gs.glassCard}  flex flex-col md:flex-row gap-4 justify-center items-start md:items-center p-6`}
      >
        {/* Pickup Location */}
        <div className="flex flex-col gap-1">
          <select
            required
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className={`${gs.glassInput} text-gray-200`}
          >
            <option value="">Pickup Location</option>
            {cityList.map((city) => (
              <option key={city} value={city} className="text-gray-600">
                {city}
              </option>
            ))}
          </select>

          <p className="text-sm text-gray-200">
            {pickupLocation || "Please select a location"}
          </p>
        </div>

        {/* Pickup Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="pickup-date" className="text-sm text-gray-200">
            Pick-up Date
          </label>
          <input
            id="pickup-date"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className={`${gs.glassInput} text-gray-200`}
          />
        </div>

        {/* Return Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="return-date" className="text-sm text-gray-200">
            Return Date
          </label>
          <input
            id="return-date"
            type="date"
            required
            className={`${gs.glassInput} text-gray-200`}
          />
        </div>

        <button className="px-6 py-2 rounded-md text-white cursor-pointer md:w-32">
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
