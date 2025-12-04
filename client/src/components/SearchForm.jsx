import React from "react";
import { gs } from "../style/glassUi";
import { useState } from "react";
import { cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";

const SearchForm = () => {
  const { t } = useTranslation();
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white/10 flex flex-col md:flex-row gap-4 p-6 md:w-auto shadow-xl rounded-2xl shadow-black/60`}
    >
      {/* Pickup Location */}
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm text-gray-200">
          {pickupLocation || t("searchForm.placeholderLocation")}
        </p>

        <select
          required
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className={`${gs.glassInput} text-gray-200`}
        >
          <option value="">{t("searchForm.pickupLocation")}</option>
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
          {t("searchForm.pickupDate")}
        </label>

        <input
          id="pickup-date"
          type="date"
          required
          onChange={(e) => setPickupDate(e.target.value)}
          value={pickupDate}
          min={new Date().toISOString().split("T")[0]}
          className={`${gs.glassInput} text-gray-200`}
        />
      </div>

      {/* Return Date */}
      <div className="flex flex-col gap-1 flex-1">
        <label htmlFor="return-date" className="text-sm text-gray-200">
          {t("searchForm.returnDate")}
        </label>

        <input
          id="return-date"
          type="date"
          required
          onChange={(e) => setReturnDate(e.target.value)}
          value={returnDate}
          className={`${gs.glassInput} text-gray-200`}
        />
      </div>

      {/* Search Button */}
      <button
        className={`${gs.glassButton} px-3 py-2 mt-4 md:mt-0 text-white self-stretch cursor-pointer`}
      >
        {t("searchForm.search")}
      </button>
    </form>
  );
};

export default SearchForm;
