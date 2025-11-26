import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";
import { Search } from "lucide-react";
import { gs } from "../style/glassUi";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { axios, cars } = useAppContext();

  const [input, setInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = cars.filter((car) => {
    const keyword = input.toLowerCase();
    return (
      car.brand?.toLowerCase().includes(keyword) ||
      car.model?.toLowerCase().includes(keyword) ||
      car.type?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen ">
      {/* Hero Section with Search */}
      <div className="relative overflow-hidden">
        <div className="relative px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Available Cars
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-5 sm:mb-10 max-w-2xl mx-auto hidden sm:block">
              Choose from our premium selection of vehicles for your next
              journey
            </p>

            {/* Modern Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="pl-6 pr-4 py-2 sm:py-3 md:py-4 lg:py-5">
                  <Search className="w-6 h-6 text-slate-400" />
                </div>

                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="Search by make, model, or features..."
                  className="flex-1 text-slate-900 placeholder:text-slate-400 text-lg outline-none"
                />
              </div>

              {/* Quick Filter Chips */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["All Cars", "Sedan", "SUV", "Sports", "Electric"].map(
                  (filter) => (
                    <button
                      key={filter}
                      className="px-5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium transition-all hover:scale-105"
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cars Grid Section */}
      <div className={`${gs.glassCard} w-fit mx-auto p-4 md:p-8 lg:p-16 pb-16`}>
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div>
              <p className="text-slate-200 text-sm sm:text-base md:text-lg">
                Showing{" "}
                <span className="font-bold text-slate-300">
                  {filteredCars.length}
                </span>{" "}
                vehicles
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select className="px-1 py-1 sm:px-4 sm:py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium outline-none cursor-pointer">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
