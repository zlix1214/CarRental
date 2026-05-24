import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Users,
  Fuel,
  Settings,
  MapPin,
  Check,
  Calendar,
  Shield,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { createBooking } from "../api/bookingApi";
import { getErrorMessage } from "../api/getErrorMessage";
import { queryKeys } from "../queries/queryKeys";
import type { Car } from "../types/domain";

const CarDetails = () => {
  const context = useAppContext();
  const {
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    currency,
  } = context;
  const cars = (context.cars ?? []) as Car[];
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [car, setCar] = useState<Car | null>(null);
  const [totalPrice, setToatalPrice] = useState(0);
  const today = new Date().toISOString().split("T")[0];

  const createBookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Booking created successfully");
        queryClient.invalidateQueries({ queryKey: queryKeys.userBookings });
        queryClient.invalidateQueries({ queryKey: queryKeys.ownerBookings });
        queryClient.invalidateQueries({ queryKey: queryKeys.ownerDashboard });
        navigate("/my-bookings");
      } else {
        toast.error(data.message || "Booking failed");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!id) {
      toast.error("Car not found");
      return;
    }

    createBookingMutation.mutate({
      car: id,
      pickupDate,
      returnDate,
    });
  };

  useEffect(() => {
    setCar(cars.find((carItem) => carItem._id === id) ?? null);
  }, [cars, id]);

  useEffect(() => {
    if (!car || !pickupDate || !returnDate) {
      setToatalPrice(0);
      return;
    }

    const start = new Date(pickupDate).getTime();
    const end = new Date(returnDate).getTime();

    const diffInMs = end - start;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    const days = Math.max(1, diffInDays);

    setToatalPrice(days * car.pricePerDay);
  }, [pickupDate, returnDate, car]);

  useEffect(() => {
    if (returnDate && pickupDate && returnDate < pickupDate) {
      setReturnDate(pickupDate);
    }
  }, [pickupDate, returnDate, setReturnDate]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const features = [
    t("carDetail.features.360Camera"),
    t("carDetail.features.bluetooth"),
    t("carDetail.features.gpsNavigation"),
    t("carDetail.features.heatedSeats"),
    t("carDetail.features.rearViewMirror"),
    t("carDetail.features.parkingSensors"),
    t("carDetail.features.sunroof"),
    t("carDetail.features.premiumSoundSystem"),
  ];

  const specs = [
    {
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: `${car.seating_capacity} ${t("carDetail.specs.seats")}`,
    },
    {
      icon: <Fuel className="w-5 h-5 sm:w-5 sm:h-5" />,
      text: t(`carDetail.specs.fuel.${car.fuel_type}`),
    },
    {
      icon: <Settings className="w-5 h-5 sm:w-5 sm:h-5" />,
      text: t(`carDetail.specs.transmission.${car.transmission}`),
    },
    {
      icon: <MapPin className="w-5 h-5 sm:w-5 sm:h-5" />,
      text: t(`carDetail.specs.location.${car.location}`),
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-slate-200 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">{t("carDetail.backButton")}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>

            <div className="rounded-2xl p-6 bg-white/5 shadow shadow-white/40">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200 mb-2">
                    {car.brand}{" "}
                    <span className="text-slate-300">{car.model}</span>
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-white/20 text-neutral-300 rounded-full text-xs font-medium">
                      {t(`carDetail.category.${car.category}`)}
                    </span>
                    <span className="px-3 py-1.5 bg-white/20 text-neutral-300 rounded-full text-xs font-semibold">
                      {car.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {specs.map(({ icon, text }, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-2 sm:p-3 rounded-xl transition-colors bg-black/30 shadow shadow-white/20"
                  >
                    <div className="text-slate-200 mb-2">{icon}</div>
                    <span className="text-sm font-medium text-slate-200">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-white/5 shadow shadow-white/40">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">
                {t("carDetail.aboutThisCar")}
              </h2>
              <p className="text-slate-200 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {car.description}
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-white/5 shadow shadow-white/40">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-4">
                {t("carDetail.featuresAmenities")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded-xl shadow-lg shadow-black/40"
                  >
                    <div className="shrink-0 w-6 h-6  rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-slate-200 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/60 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-300 rounded-xl">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-200 mb-2">
                    {t("carDetail.protectedRental")}
                  </h3>
                  <p className="text-slate-200 text-sm">
                    {t("carDetail.protectedRentalDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl p-6 bg-white/5 shadow shadow-white/40">
              <div className="mb-6 pb-6 border-b border-slate-900">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-4xl font-bold text-slate-100">
                      {currency}
                      {car.pricePerDay}
                    </div>
                    <div className="text-sm text-slate-200 font-medium mt-1">
                      {t("carDetail.booking.perDay")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-100">
                      {t("carDetail.booking.totalEst")}
                    </div>

                    <div className="text-xl font-bold text-white">
                      {currency}
                      {totalPrice}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label
                    htmlFor="pickup-date"
                    className="block text-sm font-semibold text-slate-100 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-1.5" />
                    {t("carDetail.booking.pickupDate")}
                  </label>
                  <input
                    type="date"
                    id="pickup-date"
                    value={pickupDate}
                    onChange={(event) => setPickupDate(event.target.value)}
                    className="w-full px-4 py-3 shadow-lg shadow-black/40 bg-white/10 text-slate-200 rounded-xl outline-none"
                    required
                    min={today}
                  />
                </div>

                <div>
                  <label
                    htmlFor="return-date"
                    className="block text-sm font-semibold text-slate-100 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-1.5" />
                    {t("carDetail.booking.returnDate")}
                  </label>
                  <input
                    type="date"
                    id="return-date"
                    value={returnDate}
                    onChange={(event) => setReturnDate(event.target.value)}
                    className="w-full px-4 py-3 bg-white/10 shadow-lg shadow-black/40 rounded-xl outline-none text-slate-200"
                    required
                    min={pickupDate || today}
                  />
                </div>
              </div>

              <p className=" mb-5 text-center text-sm text-slate-200">
                {t("carDetail.booking.noCreditCard")}
              </p>
              <button
                onClick={handleSubmit}
                disabled={createBookingMutation.isPending}
                className="w-full text-white shadow-sm shadow-white font-bold py-4 rounded-xl hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all mb-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {t("carDetail.booking.bookNow")}
              </button>

              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-white shrink-0" />
                  <span>
                    {t("carDetail.booking.benefits.freeCancellation")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-white shrink-0" />
                  <span>
                    {t("carDetail.booking.benefits.instantConfirmation")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-white shrink-0" />
                  <span>{t("carDetail.booking.benefits.support247")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
