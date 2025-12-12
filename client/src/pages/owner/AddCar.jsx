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
import { useTranslation } from "react-i18next";

const AddCar = () => {
  const { axios, currency, token, isInitialized } = useAppContext();
  const { t } = useTranslation();

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
      toast.error(t("addCar.loginRequired"));
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
            {t("addCar.pageTitle")}
          </h1>
          <p className="text-slate-200">{t("addCar.pageSubtitle")}</p>
        </div>

        <div className="space-y-8 grid-cols-1 md">
          {/* Image Upload Section - Hero Style */}
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12">
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
                    <div className="w-45 h-30 sm:w-64 sm:h-40 flex flex-col items-center justify-center backdrop-blur-sm border-2 border-dashed border-white/20 rounded-2xl group-hover:border-white/40 transition-all">
                      <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-white/60 mb-3 group-hover:text-white/80 transition-colors" />
                      <p className="text-white/80 text-xs sm:text-sm font-medium">
                        {t("addCar.imageUpload.clickToUpload")}
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        {t("addCar.imageUpload.fileFormat")}
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
                  {t("addCar.imageUpload.title")}
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  {t("addCar.imageUpload.description")}
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="hidden sm:block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                    {t("addCar.imageUpload.tips.frontView")}
                  </span>
                  <span className="hidden sm:block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                    {t("addCar.imageUpload.tips.cleanBackground")}
                  </span>
                  <span className="hidden sm:block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                    {t("addCar.imageUpload.tips.highResolution")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="rounded-3xl bg-white/5 p-6 md:p-8 shadow-md shadow-white/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
                  {t("addCar.basicInfo.title")}
                </h2>
                <p className="text-sm text-slate-300">
                  {t("addCar.basicInfo.subtitle")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2">
                  {t("addCar.basicInfo.brand")}
                </label>
                <input
                  type="text"
                  placeholder={t("addCar.basicInfo.brandPlaceholder")}
                  required
                  className="px-3 py-2 bg-white/20 rounded-xl outline-none"
                  value={car.brand}
                  onChange={(e) => setCar({ ...car, brand: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2">
                  {t("addCar.basicInfo.model")}
                </label>
                <input
                  type="text"
                  placeholder={t("addCar.basicInfo.modelPlaceholder")}
                  required
                  className="bg-white/20 px-3 py-2 rounded-xl outline-none"
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Details */}
          <div className="rounded-3xl bg-white/5 shadow-md shadow-white/40 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
                  {t("addCar.pricingDetails.title")}
                </h2>
                <p className="text-sm text-slate-300">
                  {t("addCar.pricingDetails.subtitle")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t("addCar.pricingDetails.year")}
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
                  {t("addCar.pricingDetails.dailyPrice")} ({currency})
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
                  {t("addCar.pricingDetails.category")}
                </label>
                <select
                  onChange={(e) => setCar({ ...car, category: e.target.value })}
                  value={car.category}
                  className="px-3 py-2 rounded-xl outline-none focus:border-blue-500 transition-colors bg-white/20"
                >
                  <option value="">
                    {t("addCar.pricingDetails.selectCategory")}
                  </option>
                  <option value="Economy">
                    {t("addCar.pricingDetails.categories.economy")}
                  </option>
                  <option value="Compact">
                    {t("addCar.pricingDetails.categories.compact")}
                  </option>
                  <option value="Midsize">
                    {t("addCar.pricingDetails.categories.midsize")}
                  </option>
                  <option value="SUV">
                    {t("addCar.pricingDetails.categories.suv")}
                  </option>
                  <option value="Luxury">
                    {t("addCar.pricingDetails.categories.luxury")}
                  </option>
                  <option value="Sport">
                    {t("addCar.pricingDetails.categories.sport")}
                  </option>
                  <option value="Van">
                    {t("addCar.pricingDetails.categories.van")}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="rounded-3xl bg-white/5 shadow-md shadow-white/40 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
                  {t("addCar.specifications.title")}
                </h2>
                <p className="text-sm text-slate-300">
                  {t("addCar.specifications.subtitle")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  {t("addCar.specifications.transmission")}
                </label>
                <select
                  onChange={(e) =>
                    setCar({ ...car, transmission: e.target.value })
                  }
                  value={car.transmission}
                  className="px-3 py-2 rounded-xl outline-none bg-white/20"
                >
                  <option value="">
                    {t("addCar.specifications.selectTransmission")}
                  </option>
                  <option value="Automatic">
                    {t("addCar.specifications.transmissionTypes.automatic")}
                  </option>
                  <option value="Manual">
                    {t("addCar.specifications.transmissionTypes.manual")}
                  </option>
                  <option value="Semi-Automatic">
                    {t("addCar.specifications.transmissionTypes.semiAutomatic")}
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Fuel className="w-4 h-4" />
                  {t("addCar.specifications.fuelType")}
                </label>
                <select
                  onChange={(e) =>
                    setCar({ ...car, fuel_type: e.target.value })
                  }
                  value={car.fuel_type}
                  className="px-3 py-2 rounded-xl outline-none bg-white/20"
                >
                  <option value="">
                    {t("addCar.specifications.selectFuelType")}
                  </option>
                  <option value="Gasoline">
                    {t("addCar.specifications.fuelTypes.gasoline")}
                  </option>
                  <option value="Diesel">
                    {t("addCar.specifications.fuelTypes.diesel")}
                  </option>
                  <option value="Hybrid">
                    {t("addCar.specifications.fuelTypes.hybrid")}
                  </option>
                  <option value="Electric">
                    {t("addCar.specifications.fuelTypes.electric")}
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t("addCar.specifications.seatingCapacity")}
                </label>
                <input
                  type="number"
                  placeholder={t("addCar.specifications.seatingPlaceholder")}
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
          <div className="rounded-3xl bg-white/5 shadow-md shadow-white/40 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
                  {t("addCar.locationDescription.title")}
                </h2>
                <p className="text-sm text-slate-300">
                  {t("addCar.locationDescription.subtitle")}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {t("addCar.locationDescription.location")}
                </label>
                <select
                  onChange={(e) => setCar({ ...car, location: e.target.value })}
                  value={car.location}
                  className="px-3 py-2 rounded-xl outline-none bg-white/20"
                >
                  <option value="">
                    {t("addCar.locationDescription.selectLocation")}
                  </option>
                  <option value="Taipei">
                    {t("addCar.locationDescription.locations.taipei")}
                  </option>
                  <option value="New Taipei">
                    {t("addCar.locationDescription.locations.newTaipei")}
                  </option>
                  <option value="Taoyuan">
                    {t("addCar.locationDescription.locations.taoyuan")}
                  </option>
                  <option value="Hsinchu">
                    {t("addCar.locationDescription.locations.hsinchu")}
                  </option>
                  <option value="Taichung">
                    {t("addCar.locationDescription.locations.taichung")}
                  </option>
                  <option value="Tainan">
                    {t("addCar.locationDescription.locations.tainan")}
                  </option>
                  <option value="Kaohsiung">
                    {t("addCar.locationDescription.locations.kaohsiung")}
                  </option>
                  <option value="Keelung">
                    {t("addCar.locationDescription.locations.keelung")}
                  </option>
                  <option value="Yilan">
                    {t("addCar.locationDescription.locations.yilan")}
                  </option>
                  <option value="Hualien">
                    {t("addCar.locationDescription.locations.hualien")}
                  </option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t("addCar.locationDescription.description")}
                </label>
                <textarea
                  rows={5}
                  placeholder={t(
                    "addCar.locationDescription.descriptionPlaceholder"
                  )}
                  required
                  className="bg-white/20 px-3 py-2 rounded-xl outline-none resize-none"
                  value={car.description}
                  onChange={(e) =>
                    setCar({ ...car, description: e.target.value })
                  }
                ></textarea>
                <p className="text-sm text-slate-300 mt-2">
                  {t("addCar.locationDescription.descriptionTip")}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={onSubmitHandler}
              className="group relative overflow-hidden px-4 py-3 text-white bg-white/10 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-lg transition-all hover:scale-105 flex items-center gap-3 cursor-pointer"
            >
              <Check className="w-5 h-5 relative z-10" />
              <span className="relative z-10">
                {isLoading
                  ? t("addCar.submit.loading")
                  : t("addCar.submit.button")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
