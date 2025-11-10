import React from "react";
import { gs } from "../style/glassUi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cityList } from "../assets/assets";

const SearchForm = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const navigate = useNavigate();
  return (
    <form
      className={`bg-white/10 flex flex-col md:flex-row gap-4 p-6 md:w-auto shadow-xl rounded-2xl shadow-black/60`}
    >
      {/* Pickup Location */}
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm text-gray-200">
          {pickupLocation || "select a location"}
        </p>
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
      </div>

      {/* Pickup Date */}
      <div className="flex flex-col gap-1 flex-1">
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
      <div className="flex flex-col gap-1 flex-1">
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

      {/* Search Button */}
      <button
        className={`${gs.glassButton} px-3 py-2 mt-4 md:mt-0 text-white self-stretch cursor-pointer`}
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
