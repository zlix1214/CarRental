import React, { useState } from "react";
import {
  Upload,
  Check,
  Car,
  DollarSign,
  Calendar,
  Users,
  Fuel,
  Settings,
  MapPin,
  FileText,
  X,
} from "lucide-react";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const currency = "$";
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", car);
  };

  return (
    <div className="min-h-screen px-4 py-10 md:px-10 flex-1">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            List Your Car
          </h1>
          <p className="text-slate-600">
            Fill in the details below to add your car to the platform
          </p>
        </div>

        <div className="space-y-8 grid-cols-1 md">
          {/* Image Upload Section - Hero Style */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <label
                htmlFor="car-image"
                className="relative group cursor-pointer"
              >
                <div className="relative">
                  {image ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Car preview"
                        className="w-64 h-40 object-cover rounded-2xl border-4 border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setImage(null);
                        }}
                        className="absolute -top-3 -right-3 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-64 h-40 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm border-2 border-dashed border-white/20 rounded-2xl group-hover:border-white/40 transition-all">
                      <Upload className="w-12 h-12 text-white/60 mb-3 group-hover:text-white/80 transition-colors" />
                      <p className="text-white/80 text-sm font-medium">
                        Click to upload
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="car-image"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Upload Car Image
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  A high-quality image helps attract more renters. Make sure the
                  car is well-lit and clearly visible.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs">
                    Front view recommended
                  </span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs">
                    Clean background
                  </span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs">
                    High resolution
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Basic Information
                </h2>
                <p className="text-sm text-slate-500">
                  Enter your car's basic details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  placeholder="e.g. BMW, Mercedes, Audi..."
                  required
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  value={car.brand}
                  onChange={(e) => setCar({ ...car, brand: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  placeholder="e.g. X5, E-Class, M4..."
                  required
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Details */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Pricing & Details
                </h2>
                <p className="text-sm text-slate-500">
                  Set your rental price and car details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Year
                </label>
                <input
                  type="number"
                  placeholder="2025"
                  required
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  value={car.year}
                  onChange={(e) => setCar({ ...car, year: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Daily Price ({currency})
                </label>
                <input
                  type="number"
                  placeholder="100"
                  required
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  value={car.pricePerDay}
                  onChange={(e) =>
                    setCar({ ...car, pricePerDay: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Category
                </label>
                <select
                  onChange={(e) => setCar({ ...car, category: e.target.value })}
                  value={car.category}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="">Select a category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                </select>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Specifications
                </h2>
                <p className="text-sm text-slate-500">
                  Technical details and features
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Transmission
                </label>
                <select
                  onChange={(e) =>
                    setCar({ ...car, transmission: e.target.value })
                  }
                  value={car.transmission}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Semi-Automatic">Semi-Automatic</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Fuel className="w-4 h-4" />
                  Fuel Type
                </label>
                <select
                  onChange={(e) =>
                    setCar({ ...car, fuel_type: e.target.value })
                  }
                  value={car.fuel_type}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="">Select fuel type</option>
                  <option value="Gas">Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Seating Capacity
                </label>
                <input
                  type="number"
                  placeholder="4"
                  required
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  value={car.seating_capacity}
                  onChange={(e) =>
                    setCar({ ...car, seating_capacity: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Location & Description */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Location & Description
                </h2>
                <p className="text-sm text-slate-500">
                  Where is your car and what makes it special?
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <select
                  onChange={(e) => setCar({ ...car, location: e.target.value })}
                  value={car.location}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="">Select a location</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Houston">Houston</option>
                  <option value="Chicago">Chicago</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  rows={5}
                  placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine. Perfect for family trips or business travel. Features include leather seats, sunroof, and advanced safety systems."
                  required
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors resize-none"
                  value={car.description}
                  onChange={(e) =>
                    setCar({ ...car, description: e.target.value })
                  }
                ></textarea>
                <p className="text-xs text-slate-500 mt-2">
                  Tip: Highlight unique features, recent maintenance, and why
                  renters should choose your car
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={onSubmitHandler}
              className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Check className="w-5 h-5 relative z-10" />
              <span className="relative z-10">List Your Car</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
