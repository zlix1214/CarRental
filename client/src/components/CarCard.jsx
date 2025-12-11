import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { gs } from "../style/glassUi";
import { useTranslation } from "react-i18next";
import { Users, Fuel, Car, MapPin } from "lucide-react";

const CarCard = ({ car }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const specs = [
    {
      icon: Users,
      value: car.seating_capacity,
      label: t("carCard.labelSeats"),
    },
    {
      icon: Fuel,
      value: t(`carCard.fuel.${car.fuel_type}`),
      label: t("carCard.labelFuel"),
    },
    {
      icon: Car,
      value: t(`carCard.transmission.${car.transmission}`),
      label: t("carCard.labelType"),
    },
    {
      icon: MapPin,
      value: t(`carCard.location.${car.location}`),
      label: t("carCard.labelLocation"),
    },
  ];

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500
      hover:shadow-2xl hover:-translate-y-2 shadow-black/90"
    >
      {/* Image */}
      <div className="relative h-45 sm:h-55 lg:h-65 xl:h-75 overflow-hidden">
        <img
          src={car.image}
          alt="Car"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Floating Tags */}
        <div className="absolute top-4 left-4 right-4 flex lg:flex-col xl:flex-row gap-2 justify-between items-start">
          <div className="bg-black/80 px-4 py-1 sm:py-2 rounded-full shadow-xl">
            <span className="text-neutral-300 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              {t("carCard.availableNow")}
            </span>
          </div>

          <div className="bg-black/80  px-5 sm:py-1 rounded-2xl shadow-xl flex-col items-center gap-2">
            <div className="text-xs sm:text-base font-semibold text-neutral-300 py-1 sm:py-0">
              {currency} {car.pricePerDay}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Info Section */}
      <div className="relative bg-black/30 p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {car.brand} <span className="text-white-400">{car.model}</span>
          </h3>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gray-100/20 text-neutral-300 rounded-full text-xs font-medium">
              {t(`carCard.category.${car.category}`)}
            </span>
            <span className="px-3 py-1 bg-gray-100/20 text-neutral-300 rounded-full text-xs font-semibold">
              {car.year}
            </span>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <div
                key={index}
                className="flex items-center lg:justify-between p-3 rounded-xl"
              >
                <Icon
                  className="w-5 h-5 mr-1 text-neutral-100"
                  strokeWidth={1.5}
                />
                <div className="text-xs md:text-sm font-semibold text-slate-200 truncate w-full text-center">
                  {spec.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
