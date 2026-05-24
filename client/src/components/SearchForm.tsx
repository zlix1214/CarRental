import { useEffect, useState, type FormEvent } from "react";
import { gs } from "../style/glassUi";
import { cityList } from "../assets/assets";
import { useAppContext } from "../context/appContext";
import { useTranslation } from "react-i18next";

const SearchForm = () => {
  const { t } = useTranslation();
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();
  const today = new Date().toISOString().split("T")[0];

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(
      `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
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
      className="bg-white/5 flex flex-col md:flex-row gap-4 p-6 md:w-auto shadow rounded-2xl shadow-white/40"
    >
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm text-gray-200">
          {pickupLocation || t("searchForm.placeholderLocation")}
        </p>

        <select
          required
          value={pickupLocation}
          onChange={(event) => setPickupLocation(event.target.value)}
          className={`${gs.glassInput} text-gray-200`}
        >
          <option value="">{t("searchForm.pickupLocation")}</option>
          {cityList.map((city: string) => (
            <option key={city} value={city} className="text-gray-600">
              {t(`common.location.${city}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <label htmlFor="pickup-date" className="text-sm text-gray-200">
          {t("searchForm.pickupDate")}
        </label>

        <input
          type="date"
          required
          onChange={(event) => setPickupDate(event.target.value)}
          value={pickupDate}
          min={today}
          className={`${gs.glassInput} text-gray-200`}
        />
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <label htmlFor="return-date" className="text-sm text-gray-200">
          {t("searchForm.returnDate")}
        </label>

        <input
          type="date"
          required
          value={returnDate}
          min={pickupDate || today}
          onChange={(event) => setReturnDate(event.target.value)}
          className={`${gs.glassInput} text-gray-200`}
        />
      </div>

      <button className="px-1 sm:px-4 py-2 text-xs md:text-sm font-medium text-gray-200 rounded-2xl shadow-sm shadow-white cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300">
        {t("searchForm.search")}
      </button>
    </form>
  );
};

export default SearchForm;
