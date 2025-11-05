import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";
import { Search, SlidersHorizontal, Car } from "lucide-react";

const Cars = () => {
  const [input, setInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen ">
      {/* Hero Section with Search */}
      <div className="relative overflow-hidden">
        <div className="relative px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title with Animation */}
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm font-medium mb-6">
                Premium Car Rental
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Available Cars
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Choose from our premium selection of vehicles for your next
              journey
            </p>

            {/* Modern Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500" />

                <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="pl-6 pr-4 py-5">
                    <Search className="w-6 h-6 text-slate-400" />
                  </div>

                  <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder="Search by make, model, or features..."
                    className="flex-1 py-5 text-slate-900 placeholder:text-slate-400 text-lg outline-none"
                  />

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-6 py-5 hover:bg-slate-50 transition-colors border-l border-slate-200 flex items-center gap-2 group/btn"
                  >
                    <SlidersHorizontal className="w-5 h-5 text-slate-600 group-hover/btn:text-blue-500 transition-colors" />
                    <span className="text-slate-700 font-medium hidden sm:inline">
                      Filters
                    </span>
                  </button>
                </div>
              </div>

              {/* Quick Filter Chips */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["All Cars", "Sedan", "SUV", "Sports", "Electric"].map(
                  (filter) => (
                    <button
                      key={filter}
                      className="px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium transition-all hover:scale-105"
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
      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-slate-600 text-lg">
                Showing{" "}
                <span className="font-bold text-slate-900">
                  {dummyCarData.length}
                </span>{" "}
                vehicles
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium outline-none focus:border-blue-400 transition-colors cursor-pointer">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {dummyCarData.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
