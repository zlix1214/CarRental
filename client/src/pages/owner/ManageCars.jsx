import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import { Eye, EyeOff, Trash2, Edit, Search, Car } from "lucide-react";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchOwnerCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "available" && car.isAvaliable) ||
      (filterStatus === "unavailable" && !car.isAvaliable);

    return matchesFilter;
  });

  return (
    <div className="min-h-screen px-4 pt-10 md:px-10 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-200 mb-2">
            Manage Cars
          </h1>
          <p className="text-slate-200">
            View, edit, and manage your vehicle listings
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-3 rounded-xl font-medium text-xs transition-all ${
                filterStatus === "all"
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              All ({cars.length})
            </button>
            <button
              onClick={() => setFilterStatus("available")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "available"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              Available ({cars.filter((c) => c.isAvaliable).length})
            </button>
            <button
              onClick={() => setFilterStatus("unavailable")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "unavailable"
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              Unavailable ({cars.filter((c) => !c.isAvaliable).length})
            </button>
          </div>
        </div>

        {/* Cars Grid - Card View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <div
              key={index}
              className="group relative bg-black/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                      car.isAvaliable
                        ? "bg-emerald-500/90 text-white"
                        : "bg-red-500/90 text-white"
                    }`}
                  >
                    {car.isAvaliable ? "Available" : "Unavailable"}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                  <p className="text-white font-bold">
                    {currency}
                    {car.pricePerDay}
                    <span className="text-xs text-white/80 ml-1">/day</span>
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                {/* Car Name */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-slate-200 mb-1">
                    {car.brand} {car.model}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                      {car.category}
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                      {car.year}
                    </span>
                    <span className="text-xs text-slate-300">
                      {car.seating_capacity} seats
                    </span>
                    <span className="text-xs text-slate-300">
                      {car.transmission}
                    </span>
                  </div>
                </div>

                {/* Specs */}
                <div className="mb-4 flex items-center gap-3 text-sm text-slate-300">
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    <span>{car.fuel_type}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => console.log("Toggle visibility", car._id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      car.isAvaliable
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {car.isAvaliable ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Show
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => console.log("Edit", car._id)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => console.log("Delete", car._id)}
                    className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex p-6 rounded-full bg-slate-100 mb-4">
              <Car className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No cars found
            </h3>
            <p className="text-slate-600">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Start by adding your first vehicle"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
