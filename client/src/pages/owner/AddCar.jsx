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
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const AddCar = () => {
  const { axios, currency, token, isInitialized } = useAppContext();

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

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    if (!token || !isInitialized) {
      toast.error("Please login first");
      return;
    }
    e.preventDefault();
    if (isLoading) return null;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));
      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 md:px-10 flex-1">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-300 mb-2">
            List Your Car
          </h1>
          <p className="text-slate-200">
            Fill in the details below to add your car to the platform
          </p>
        </div>

        <div className="space-y-8 grid-cols-1 md">
          {/* Image Upload Section - Hero Style */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#7a0101] p-8 md:p-12">
            <div className="relative flex flex-col lg:flex-row items-center gap-8">
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
                    <div className="w-45 h-30 sm:w-64 sm:h-40 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm border-2 border-dashed border-white/20 rounded-2xl group-hover:border-white/40 transition-all">
                      <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-white/60 mb-3 group-hover:text-white/80 transition-colors" />
                      <p className="text-white/80 text-xs sm:text-sm font-medium">
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

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Upload Car Image
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  A high-quality image helps attract more renters. Make sure the
                  car is well-lit and clearly visible.
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="hidden sm:block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs">
                    Front view recommended
                  </span>
                  <span className="hidden sm:block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs">
                    Clean background
                  </span>
                  <span className="hidden sm:block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs">
                    High resolution
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
                  Basic Information
                </h2>
                <p className="text-sm text-slate-300">
                  Enter your car's basic details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  placeholder="e.g. BMW, Mercedes, Audi..."
                  required
                  className="px-3 py-2 bg-white/20 rounded-xl outline-none"
                  value={car.brand}
                  onChange={(e) => setCar({ ...car, brand: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  placeholder="e.g. X5, E-Class, M4..."
                  required
                  className="bg-white/20 px-3 py-2 rounded-xl outline-none"
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Details */}
          <div className="bg-white/10 rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
                  Pricing & Details
                </h2>
                <p className="text-sm text-slate-300">
                  Set your rental price and car details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Year
                </label>
                <input
                  type="number"
                  placeholder=""
                  required
                  className="bg-white/20 px-3 py-2 rounded-xl outline-none"
                  value={car.year}
                  onChange={(e) => setCar({ ...car, year: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Daily Price ({currency})
                </label>
                <input
                  type="number"
                  placeholder=""
                  required
                  className="bg-white/20 px-3 py-2 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  value={car.pricePerDay}
                  onChange={(e) =>
                    setCar({ ...car, pricePerDay: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Category
                </label>
                <select
                  onChange={(e) => setCar({ ...car, category: e.target.value })}
                  value={car.category}
                  className="px-3 py-2 rounded-xl outline-none focus:border-blue-500 transition-colors bg-white/20"
                >
                  <option value="">Select a category</option>
                  <option value="Economy">Economy</option>
                  <option value="Compact">Compact</option>
                  <option value="Midsize">Midsize</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sport">Sport</option>
                  <option value="Van">Van</option>
                </select>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white/10 rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
                  Specifications
                </h2>
                <p className="text-sm text-slate-300">
                  Technical details and features
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Transmission
                </label>
                <select
                  onChange={(e) =>
                    setCar({ ...car, transmission: e.target.value })
                  }
                  value={car.transmission}
                  className="px-3 py-2 rounded-xl outline-none bg-white/20"
                >
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Semi-Automatic">Semi-Automatic</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Fuel className="w-4 h-4" />
                  Fuel Type
                </label>
                <select
                  onChange={(e) =>
                    setCar({ ...car, fuel_type: e.target.value })
                  }
                  value={car.fuel_type}
                  className="px-3 py-2 rounded-xl outline-none bg-white/20"
                >
                  <option value="">Select fuel type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Seating Capacity
                </label>
                <input
                  type="number"
                  placeholder="4"
                  required
                  className="px-3 py-2 bg-white/20 rounded-xl outline-none"
                  value={car.seating_capacity}
                  onChange={(e) =>
                    setCar({ ...car, seating_capacity: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Location & Description */}
          <div className="bg-white/10 rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
                  Location & Description
                </h2>
                <p className="text-sm text-slate-300">
                  Where is your car and what makes it special?
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <select
                  onChange={(e) => setCar({ ...car, location: e.target.value })}
                  value={car.location}
                  className="px-3 py-2 rounded-xl outline-none bg-white/20"
                >
                  <option value="">Select a location</option>
                  <option value="Taipei">Taipei</option>
                  <option value="New Taipei">New Taipei</option>
                  <option value="Taoyuan">Taoyuan</option>
                  <option value="Hsinchu">Hsinchu</option>
                  <option value="Taichung">Taichung</option>
                  <option value="Tainan">Tainan</option>
                  <option value="Kaohsiung">Kaohsiung</option>
                  <option value="Keelung">Keelung</option>
                  <option value="Yilan">Yilan</option>
                  <option value="Hualien">Hualien</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  rows={5}
                  placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine. Perfect for family trips or business travel. Features include leather seats, sunroof, and advanced safety systems."
                  required
                  className="bg-white/20 px-3 py-2 rounded-xl outline-none resize-none"
                  value={car.description}
                  onChange={(e) =>
                    setCar({ ...car, description: e.target.value })
                  }
                ></textarea>
                <p className="text-sm text-slate-300 mt-2">
                  Tip: Highlight unique features, recent maintenance, and why
                  renters should choose your car
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={onSubmitHandler}
              className="group relative overflow-hidden px-4 py-3 bg-white/20 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3"
            >
              <Check className="w-5 h-5 relative z-10" />
              <span className="relative z-10">
                {isLoading ? "Listing..." : "List Your Car"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
