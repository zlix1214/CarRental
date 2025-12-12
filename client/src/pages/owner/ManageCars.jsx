import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import { Eye, EyeOff, Trash2, Edit, Search, Car } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const ManageCars = () => {
  const { currency, axios, isOwner, token, isInitialized } = useAppContext();
  const { t } = useTranslation();

  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetchOwnerCars = async () => {
    try {
      if (!token) {
        console.log("Token not ready yet");
        return;
      }

      console.log(
        "Fetching cars with token:",
        token ? "Token exists" : "No token"
      );
      console.log("axios headers", axios.defaults.headers.common);

      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm(t("manageCars.deleteConfirm"));

      if (!confirm) return null;

      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isInitialized && token) {
      fetchOwnerCars();
    } else if (isInitialized && !token) {
      setIsLoading(false);
    }
  }, [isInitialized, token]);

  const filteredCars = cars.filter((car) => {
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "available" && car.isAvaliable) ||
      (filterStatus === "unavailable" && !car.isAvaliable);

    return matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 pt-10 md:px-10 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900 mb-4"></div>
          <p className="text-slate-600">{t("manageCars.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pt-10 md:px-10 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-200 mb-2">
            {t("manageCars.pageTitle")}
          </h1>
          <p className="text-slate-200">{t("manageCars.pageSubtitle")}</p>
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
              {t("manageCars.filters.all")} ({cars.length})
            </button>
            <button
              onClick={() => setFilterStatus("available")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "available"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              {t("manageCars.filters.available")} (
              {cars.filter((c) => c.isAvaliable).length})
            </button>
            <button
              onClick={() => setFilterStatus("unavailable")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "unavailable"
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              {t("manageCars.filters.unavailable")} (
              {cars.filter((c) => !c.isAvaliable).length})
            </button>
          </div>
        </div>

        {/* Cars Grid - Card View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <div
              key={index}
              className="group relative bg-white/10 rounded-2xl overflow-hidden shadow shadow-white/40 transition-all duration-300 hover:-translate-y-1"
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
                    {car.isAvaliable
                      ? t("manageCars.status.available")
                      : t("manageCars.status.unavailable")}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                  <p className="text-white font-bold">
                    {currency}
                    {car.pricePerDay}
                    <span className="text-xs text-white/80 ml-1">
                      {t("manageCars.carCard.perDay")}
                    </span>
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
                      {t(`common.categories.${car.category}`)}
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                      {car.year}
                    </span>
                    <span className="text-xs text-slate-300">
                      {car.seating_capacity} {t("manageCars.carCard.seats")}
                    </span>
                    <span className="text-xs text-slate-300">
                      {t(`common.transmission.${car.transmission}`)}
                    </span>
                  </div>
                </div>

                {/* Specs */}
                <div className="mb-4 flex items-center gap-3 text-sm text-slate-300">
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    <span>{t(`common.fuel.${car.fuel_type}`)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAvailability(car._id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      car.isAvaliable
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {car.isAvaliable ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        {t("manageCars.carCard.actions.hide")}
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        {t("manageCars.carCard.actions.show")}
                      </>
                    )}
                  </button>

                  <button className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteCar(car._id)}
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
            <h3 className="text-xl font-semibold text-slate-200 mb-2">
              {t("manageCars.emptyState.title")}
            </h3>
            <p className="text-slate-300">
              {searchTerm || filterStatus !== "all"
                ? t("manageCars.emptyState.withFilters")
                : t("manageCars.emptyState.noFilters")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
