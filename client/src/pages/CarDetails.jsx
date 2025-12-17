import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Users,
  Fuel,
  Settings,
  MapPin,
  Check,
  Calendar,
  Shield,
  Star,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyCarData, assets } from "../assets/assets";
import Loader from "../components/Loader";
import { gs } from "../style/glassUi";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const CarDetails = () => {
  const {
    cars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    currency,
  } = useAppContext();
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [totalPrice, setToatalPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);

  useEffect(() => {
    if (!car || !pickupDate || !returnDate) {
      setToatalPrice(0);
      return;
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = end - start;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const price = days * car.pricePerDay;

    setToatalPrice(price);
  }, [pickupDate, returnDate, car]);

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
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-slate-200 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">{t("carDetail.backButton")}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Car Details (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>

            {/* Car Name & Category */}
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

              {/* Specs Grid */}
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

            {/* Description */}
            <div className="rounded-2xl p-6 bg-white/5 shadow shadow-white/40">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">
                {t("carDetail.aboutThisCar")}
              </h2>
              <p className="text-slate-200 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {car.description}
              </p>
            </div>

            {/* Features */}
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
                    <div className="flex-shrink-0 w-6 h-6  rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-slate-200 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insurance Info */}
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

          {/* Right: Booking Form (1/3 width - Sticky) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl p-6 bg-white/5 shadow shadow-white/40">
              {/* Price Header */}
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

              {/* Date Inputs */}
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
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 shadow-lg shadow-black/40 bg-black/30 text-slate-200 rounded-xl outline-none cursor-pointer"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => e.target.showPicker?.()}
                    required
                    min={new Date().toISOString().split("T")[0]}
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
                    onChange={(e) => setReturnDate(e.target.value)}
                    onClick={(e) => e.target.showPicker?.()}
                    className="w-full px-4 py-3 bg-black/30 shadow-lg shadow-black/40 rounded-xl outline-none text-slate-200 cursor-pointer"
                    onMouseDown={(e) => e.preventDefault()}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Book Button */}
              <p className=" mb-5 text-center text-sm text-slate-200">
                {t("carDetail.booking.noCreditCard")}
              </p>
              <button
                onClick={handleSubmit}
                className="w-full text-white shadow-sm shadow-white font-bold py-4 rounded-xl hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all mb-4"
              >
                {t("carDetail.booking.bookNow")}
              </button>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-white flex-shrink-0" />
                  <span>
                    {t("carDetail.booking.benefits.freeCancellation")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-white flex-shrink-0" />
                  <span>
                    {t("carDetail.booking.benefits.instantConfirmation")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-white flex-shrink-0" />
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
