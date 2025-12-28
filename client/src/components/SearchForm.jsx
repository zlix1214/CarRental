import React from "react";
import { gs } from "../style/glassUi";
import { useState } from "react";
import { cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const SearchForm = () => {
  const { t } = useTranslation();
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();
  const today = new Date().toISOString().split("T")[0];

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

  useEffect(() => {
    if (returnDate && pickupDate && returnDate < pickupDate) {
      setReturnDate(pickupDate);
    }
  }, [pickupDate, returnDate, setReturnDate]);

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white/5 flex flex-col md:flex-row gap-4 p-6 md:w-auto shadow rounded-2xl shadow-white/40`}
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
              {t(`common.location.${city}`)}
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
          type="date"
          required
          value={returnDate}
          min={pickupDate || today}
          onChange={(e) => setReturnDate(e.target.value)}
          className={`${gs.glassInput} text-gray-200`}
        />
      </div>

      {/* Search Button */}
      <button className="px-1 sm:px-4 py-2 text-xs md:text-sm font-medium text-gray-200 rounded-2xl shadow-sm shadow-white cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300">
        {t("searchForm.search")}
      </button>
    </form>
  );
};

export default SearchForm;
