import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Trash2, Edit, Car as CarIcon } from "lucide-react";
import { useAppContext } from "../../context/appContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  deleteOwnerCar,
  getOwnerCars,
  toggleOwnerCarAvailability,
} from "../../api/ownerApi";
import { getErrorMessage } from "../../api/getErrorMessage";
import { queryKeys } from "../../queries/queryKeys";
import type { Car } from "../../types/domain";

type CarFilterStatus = "all" | "available" | "unavailable";

const ManageCars = () => {
  const { currency, token, isInitialized, navigate } = useAppContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [filterStatus, setFilterStatus] = useState<CarFilterStatus>("all");

  const ownerCarsQuery = useQuery({
    queryKey: queryKeys.ownerCars,
    queryFn: getOwnerCars,
    enabled: isInitialized && Boolean(token),
  });

  const cars: Car[] = ownerCarsQuery.data?.success
    ? ownerCarsQuery.data.cars
    : [];

  const refreshOwnerCarViews = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.ownerCars });
    queryClient.invalidateQueries({ queryKey: queryKeys.ownerDashboard });
    queryClient.invalidateQueries({ queryKey: queryKeys.cars });
  };

  const toggleAvailabilityMutation = useMutation({
    mutationFn: toggleOwnerCarAvailability,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Availability updated");
        refreshOwnerCarViews();
      } else {
        toast.error(data.message || "Failed to update availability");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const deleteCarMutation = useMutation({
    mutationFn: deleteOwnerCar,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Car removed");
        refreshOwnerCarViews();
      } else {
        toast.error(data.message || "Failed to remove car");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const toggleAvailability = (carId: string) => {
    toggleAvailabilityMutation.mutate(carId);
  };

  const deleteCar = (carId: string) => {
    const confirm = window.confirm(t("manageCars.deleteConfirm"));

    if (!confirm) return;

    deleteCarMutation.mutate(carId);
  };

  useEffect(() => {
    if (ownerCarsQuery.data && !ownerCarsQuery.data.success) {
      toast.error(ownerCarsQuery.data.message || "Failed to load cars");
    }
  }, [ownerCarsQuery.data]);

  useEffect(() => {
    if (ownerCarsQuery.error) {
      toast.error(getErrorMessage(ownerCarsQuery.error));
    }
  }, [ownerCarsQuery.error]);

  const filteredCars = cars.filter((car) => {
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "available" && car.isAvaliable) ||
      (filterStatus === "unavailable" && !car.isAvaliable);

    return matchesFilter;
  });

  if (!isInitialized || ownerCarsQuery.isLoading) {
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
        <div className="mb-8">
          <h2 className="text-4xl sm:text-6xl font-bold text-slate-200 mb-2">
            {t("manageCars.pageTitle")}
          </h2>
          <p className="text-slate-200">{t("manageCars.pageSubtitle")}</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`cursor-pointer px-4 py-3 rounded-xl font-medium text-xs transition-all ${
                filterStatus === "all"
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white/5 text-white"
              }`}
            >
              {t("manageCars.filters.all")} ({cars.length})
            </button>
            <button
              onClick={() => setFilterStatus("available")}
              className={`cursor-pointer px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "available"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-white/5 text-white"
              }`}
            >
              {t("manageCars.filters.available")} (
              {cars.filter((car) => car.isAvaliable).length})
            </button>
            <button
              onClick={() => setFilterStatus("unavailable")}
              className={`cursor-pointer px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "unavailable"
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white/5 text-white"
              }`}
            >
              {t("manageCars.filters.unavailable")} (
              {cars.filter((car) => !car.isAvaliable).length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="group relative bg-white/5 rounded-2xl overflow-hidden shadow shadow-white/40 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

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

                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                  <p className="text-white font-bold">
                    {currency}
                    {car.pricePerDay}
                    <span className="text-xs text-white/80 ml-1">
                      {t("manageCars.carCard.perDay")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-slate-200 mb-1">
                    {car.brand} {car.model}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-white/30 text-white/90 rounded-lg text-xs font-medium">
                      {t(`common.categories.${car.category}`)}
                    </span>
                    <span className="px-2 py-1 bg-white/30 text-white/90 rounded-lg text-xs font-medium">
                      {car.year}
                    </span>
                    <span className="text-xs text-slate-300">
                      {car.seating_capacity} {t("manageCars.carCard.seats")}
                    </span>
                    <span className="text-xs text-slate-300">
                      {t(`common.transmission.${car.transmission}`)}
                    </span>
                    <span className="text-xs text-slate-300">
                      {t(`common.fuel.${car.fuel_type}`)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAvailability(car._id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm cursor-pointer  transition-all ${
                      car.isAvaliable
                        ? "bg-white/5 text-white/60 hover:bg-black/80"
                        : "bg-black/60 text-white/60 hover:bg-black/20"
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

                  <button
                    onClick={() => navigate(`/owner/edit-car/${car._id}`)}
                    className="px-4 py-2.5 text-white/60 hover:bg-black/80 cursor-pointer rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteCar(car._id)}
                    className="px-4 py-2.5 text-red-500 hover:bg-black/80 rounded-xl cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex p-6 mb-4">
              <CarIcon className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              {t("manageCars.emptyState.title")}
            </h3>
            <p className="text-slate-400">
              {filterStatus !== "all"
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
