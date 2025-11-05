import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

// Mock assets for demo
const assets2 = {
  users_icon:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='9' cy='7' r='4'%3E%3C/circle%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'%3E%3C/path%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'%3E%3C/path%3E%3C/svg%3E",
  fuel_icon:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor'%3E%3Cpath d='M3 22V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14'%3E%3C/path%3E%3Cpath d='M13 12h3a2 2 0 0 1 2 2v2a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-4a2 2 0 0 0-2-2h-1V6a1 1 0 0 0-1-1'%3E%3C/path%3E%3C/svg%3E",
  car_icon:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor'%3E%3Cpath d='M5 11L7 3h10l2 8'%3E%3C/path%3E%3Cpath d='M2 11h20v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8Z'%3E%3C/path%3E%3Ccircle cx='7' cy='17' r='2'%3E%3C/circle%3E%3Ccircle cx='17' cy='17' r='2'%3E%3C/circle%3E%3C/svg%3E",
  location_icon:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor'%3E%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E",
};

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="group relative overflow-hidden rounded-3xl cursor-pointer bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300 hover:-translate-y-2"
    >
      {/* Large Image Section - 60% height */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src={car.image}
          alt="Car"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Floating Tags on Image */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="backdrop-blur-xl bg-emerald-500/90 px-4 py-2 rounded-full shadow-lg">
            <span className="text-white text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Available Now
            </span>
          </div>

          <div className="backdrop-blur-xl bg-slate-900/90 px-5 py-3 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-white">
              {currency}
              {car.pricePerDay}
            </div>
            <div className="text-xs text-white/80 font-medium">per day</div>
          </div>
        </div>

        {/* Bottom gradient for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Info Section - 40% height, clean white background */}
      <div className="relative bg-white p-6 space-y-4">
        {/* Car Name & Tags */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {car.brand} <span className="text-slate-600">{car.model}</span>
          </h3>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
              {car.category}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
              {car.year}
            </span>
          </div>
        </div>

        {/* Specs Grid - Compact & Clean */}
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <img
              src={assets.users_icon}
              alt=""
              className="h-5 w-5 mb-1 opacity-60"
            />
            <div className="text-xs font-semibold text-slate-900">
              {car.seating_capacity}
            </div>
            <div className="text-[10px] text-slate-500">Seats</div>
          </div>

          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <img
              src={assets.fuel_icon}
              alt=""
              className="h-5 w-5 mb-1 opacity-60"
            />
            <div className="text-xs font-semibold text-slate-900 truncate w-full text-center">
              {car.fuel_type}
            </div>
            <div className="text-[10px] text-slate-500">Fuel</div>
          </div>

          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <img
              src={assets.car_icon}
              alt=""
              className="h-5 w-5 mb-1 opacity-60"
            />
            <div className="text-xs font-semibold text-slate-900 truncate w-full text-center">
              {car.transmission}
            </div>
            <div className="text-[10px] text-slate-500">Type</div>
          </div>

          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <img
              src={assets.location_icon}
              alt=""
              className="h-5 w-5 mb-1 opacity-60"
            />
            <div className="text-xs font-semibold text-slate-900 truncate w-full text-center">
              {car.location}
            </div>
            <div className="text-[10px] text-slate-500">Location</div>
          </div>
        </div>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl ring-2 ring-blue-400" />
    </div>
  );
};
export default CarCard;
