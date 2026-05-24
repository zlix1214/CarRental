import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  DollarSign,
  CreditCard,
  Check,
  X,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useAppContext } from "../../context/appContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  changeOwnerBookingStatus,
  getOwnerBookings,
} from "../../api/bookingApi";
import { getErrorMessage } from "../../api/getErrorMessage";
import { queryKeys } from "../../queries/queryKeys";
import type { Booking } from "../../types/domain";

type BookingFilterStatus = "all" | Booking["status"];

const ManageBookings = () => {
  const { token, isInitialized, currency } = useAppContext();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] =
    useState<BookingFilterStatus>("all");

  const ownerBookingsQuery = useQuery({
    queryKey: queryKeys.ownerBookings,
    queryFn: getOwnerBookings,
    enabled: isInitialized && Boolean(token),
  });

  const bookings: Booking[] = ownerBookingsQuery.data?.success
    ? ownerBookingsQuery.data.bookings
    : [];

  const changeBookingStatusMutation = useMutation({
    mutationFn: changeOwnerBookingStatus,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Booking status updated");
        queryClient.invalidateQueries({ queryKey: queryKeys.ownerBookings });
        queryClient.invalidateQueries({ queryKey: queryKeys.ownerDashboard });
      } else {
        toast.error(data.message || "Failed to update booking status");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  useEffect(() => {
    if (ownerBookingsQuery.data && !ownerBookingsQuery.data.success) {
      toast.error(
        ownerBookingsQuery.data.message || "Failed to load owner bookings"
      );
    }
  }, [ownerBookingsQuery.data]);

  useEffect(() => {
    if (ownerBookingsQuery.error) {
      toast.error(getErrorMessage(ownerBookingsQuery.error));
    }
  }, [ownerBookingsQuery.error]);

  const changeBookingStatus = (
    bookingId: string,
    status: Booking["status"]
  ) => {
    changeBookingStatusMutation.mutate({ bookingId, status });
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter =
      filterStatus === "all" || booking.status === filterStatus;

    return matchesFilter;
  });

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/90 text-white border-emerald-600";
      case "pending":
        return "bg-orange-500/90 text-white border-orange-600";
      case "cancelled":
        return "bg-red-500/90 text-white border-red-600";
      default:
        return "bg-slate-500/90 text-white border-slate-600";
    }
  };

  const getStatusIcon = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return <Check className="w-3.5 h-3.5" />;
      case "pending":
        return <Clock className="w-3.5 h-3.5" />;
      case "cancelled":
        return <X className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen px-4 pt-10 md:px-10 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl sm:text-6xl font-bold text-slate-200 mb-2">
            {t("ownerBooking.pageTitle")}
          </h2>
          <p className="text-slate-200">{t("ownerBooking.pageSubtitle")}</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "all"
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white/5 text-white"
              }`}
            >
              {t("ownerBooking.filters.all")} ({bookings.length})
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "pending"
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white/5 text-white"
              }`}
            >
              {t("ownerBooking.filters.pending")} (
              {bookings.filter((booking) => booking.status === "pending").length})
            </button>
            <button
              onClick={() => setFilterStatus("confirmed")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "confirmed"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-white/5 text-white"
              }`}
            >
              {t("ownerBooking.filters.confirmed")} (
              {bookings.filter((booking) => booking.status === "confirmed").length})
            </button>
            <button
              onClick={() => setFilterStatus("cancelled")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "cancelled"
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white/5 text-white"
              }`}
            >
              {t("ownerBooking.filters.cancelled")} (
              {bookings.filter((booking) => booking.status === "cancelled").length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings
            .filter((booking) => booking.car)
            .map((booking) => (
              <div
                key={booking._id}
                className="bg-white/10 group relative rounded-2xl  overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative sm:w-40">
                    <img
                      src={booking.car.image}
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="h-50 sm:h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border flex items-center gap-1.5 ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        {t(`ownerBooking.status.${booking.status}`)}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-5">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-200 mb-1">
                        {booking.car.brand} {booking.car.model}
                      </h3>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Calendar className="w-4 h-4 text-slate-300" />
                        <span>
                          {booking.pickupDate.split("T")[0]} -{" "}
                          {booking.returnDate.split("T")[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <DollarSign className="w-4 h-4 text-slate-300" />
                        <span className="font-semibold text-slate-200">
                          {currency}
                          {booking.price}
                        </span>
                        <span className="text-slate-300">
                          {t("ownerBooking.bookingCard.total")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CreditCard className="w-4 h-4 text-slate-300" />
                        <span className="px-2 py-0.5 text-white rounded-md text-xs font-medium">
                          {t("ownerBooking.bookingCard.offlinePayment")}
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        onChange={(event) =>
                          changeBookingStatus(
                            booking._id,
                            event.target.value as Booking["status"]
                          )
                        }
                        value={booking.status}
                        className="w-full appearance-none px-4 py-2.5 shadow-md shadow-black/60 rounded-xl  outline-none font-medium text-white/60 cursor-pointer"
                      >
                        <option className="text-gray-500" value="pending">
                          {t("ownerBooking.bookingCard.changeStatus")}
                        </option>
                        <option className="text-gray-500" value="confirmed">
                          {t("ownerBooking.bookingCard.confirmBooking")}
                        </option>
                        <option className="text-gray-500" value="cancelled">
                          {t("ownerBooking.bookingCard.cancelBooking")}
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex p-6 mb-4">
              <Calendar className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              {t("ownerBooking.emptyState.title")}
            </h3>
            <p className="text-slate-400">
              {filterStatus !== "all"
                ? t("ownerBooking.emptyState.withFilters")
                : t("ownerBooking.emptyState.noFilters")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
