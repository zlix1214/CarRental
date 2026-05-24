import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Clock, Hash } from "lucide-react";
import { useAppContext } from "../context/appContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { getUserBookings } from "../api/bookingApi";
import { getErrorMessage } from "../api/getErrorMessage";
import { queryKeys } from "../queries/queryKeys";
import type { Booking } from "../types/domain";

const calculateDays = (start: string, end: string) => {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? 1 : diffDays;
};

const formatDate = (isoDate: string) => {
  return new Date(isoDate).toISOString().split("T")[0];
};

const formatCreatedAt = (isoDate: string) => {
  const date = new Date(isoDate);
  return date
    .toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-");
};

const MyBookings = () => {
  const { t } = useTranslation();
  const { currency, user } = useAppContext();

  const userBookingsQuery = useQuery({
    queryKey: queryKeys.userBookings,
    queryFn: getUserBookings,
    enabled: Boolean(user),
  });

  const bookings: Booking[] = userBookingsQuery.data?.success
    ? userBookingsQuery.data.Bookings
    : [];

  useEffect(() => {
    if (userBookingsQuery.data && !userBookingsQuery.data.success) {
      toast.error(userBookingsQuery.data.message || "Unable to load bookings");
    }
  }, [userBookingsQuery.data]);

  useEffect(() => {
    if (userBookingsQuery.error) {
      toast.error(getErrorMessage(userBookingsQuery.error));
    }
  }, [userBookingsQuery.error]);

  if (userBookingsQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-7xl mx-auto">
      <div className="my-8 text-center">
        <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white mb-3 tracking-tight">
          {t("userBooking.myBookings")}
        </h2>
      </div>

      <div className="space-y-8">
        {bookings
          .filter((booking) => booking.car)
          .map((booking, index) => {
            const car = booking.car;
            const days = calculateDays(booking.pickupDate, booking.returnDate);
            const isEven = index % 2 === 0;
            const orderNumber = `ORD-${String(index + 1).padStart(3, "0")}`;

            return (
              <div
                key={booking._id}
                className={`bg-white/5 shadow-lg shadow-white/20 rounded-3xl overflow-hidden group hover:scale-[1.01] transition-all duration-300 ${
                  isEven ? "md:mr-12" : "md:ml-12"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  <div
                    className={`md:col-span-2  relative ${
                      isEven ? "" : "md:order-2"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-75  object-cover"
                      />
                      <div className="absolute top-6 right-6">
                        <div
                          className={`
                            px-5 py-2 rounded-full
                            ${
                              booking.status === "pending"
                                ? "bg-orange-500"
                                : ""
                            }
                            ${
                              booking.status === "confirmed"
                                ? "bg-green-500"
                                : ""
                            }
                            ${
                              booking.status === "cancelled" ? "bg-red-600" : ""
                            }
                          `}
                        >
                          <p className="text-white font-bold text-sm">
                            {t(`userBooking.status.${booking.status}`)}
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-6 left-6">
                        <div className="bg-black/30 backdrop-blur-sm px-3 sm:px-5 py-1 sm:py-3 rounded-2xl border border-white/20">
                          <p className="text-gray-300 text-xs mb-1">
                            {t("userBooking.totalPrice")}
                          </p>
                          <p className="text-white sm:text-xl md:text-2xl font-bold">
                            {currency} {booking.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`md:col-span-3 px-8  ${!isEven && "md:order-1"}`}
                  >
                    <div className="flex items-center gap-2 my-4">
                      <Hash className="w-4 h-4 text-gray-200" />
                      <span className="text-gray-100 text-sm font-mono">
                        {orderNumber}
                      </span>
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">
                      {car.brand} {car.model}
                    </h1>

                    <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                      <span className="text-lg">{car.year}</span>
                      <span className="text-gray-500">/</span>
                      <span className="text-lg">{car.category}</span>
                      <span className="text-gray-500">/</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-lg">{car.location}</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl mb-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <p className="text-gray-200 text-sm mb-2">
                            {t("userBooking.rentalPeriod", {
                              days: days,
                              dayText:
                                days === 1
                                  ? t("userBooking.day")
                                  : t("userBooking.days"),
                            })}
                          </p>
                          <div className="flex items-center gap-3 text-white">
                            <span className="font-semibold">
                              {formatDate(booking.pickupDate)}
                            </span>
                            <div className="flex-1 h-px bg-white hidden sm:block"></div>
                            <span className="font-semibold">
                              {formatDate(booking.returnDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-200 text-base mb-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {t("userBooking.bookedOn", {
                          date: formatCreatedAt(
                            booking.createdAt || booking.pickupDate
                          ),
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {bookings.length === 0 && (
        <div className="p-16 rounded-3xl text-center">
          <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center opacity-50">
            <Calendar className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {t("userBooking.noBookings")}
          </h3>
          <p className="text-gray-300">{t("userBooking.noBookingsDesc")}</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
