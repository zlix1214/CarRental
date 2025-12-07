import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Hash } from "lucide-react";
import { dummyMyBookingsData } from "../assets/assets";
import { gs } from "../style/glassUi";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const MyBookings = () => {
  const { t } = useTranslation();
  const { axios, currency, user } = useAppContext();
  const [bookings, setBookings] = useState([]);

  // 計算租車天數的函數
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays; // 至少1天
  };

  // 格式化日期：從 ISO 格式轉換成 YYYY-MM-DD
  const formatDate = (isoDate) => {
    return new Date(isoDate).toISOString().split("T")[0];
  };

  // 格式化建立時間：顯示年月日和時分
  const formatCreatedAt = (isoDate) => {
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

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.Bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    user && fetchBookings();
  }, [user]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 max-w-7xl mx-auto">
      {/* header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white mb-3 tracking-tight">
          {t("userBooking.myBookings")}
        </h1>
      </div>

      {/* 訂單卡片 - 交錯排版 */}
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
                key={index}
                className={` bg-gradient-to-br from-[#2a2a2a] to-[#df0a0a] shadow-2xl rounded-3xl overflow-hidden group hover:scale-[1.01] transition-all duration-300 ${
                  isEven ? "md:mr-12" : "md:ml-12"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  {/* 圖片區塊 - 偶數在左，奇數在右 */}
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
                      {/* 狀態標籤 */}
                      <div className="absolute top-6 right-6">
                        <div
                          className={`bg-white px-5 py-2 rounded-full text-black font-bold text-sm shadow-lg .glow}`}
                        >
                          {t(`userBooking.status.${booking.status}`)}
                        </div>
                      </div>

                      {/* 價格標籤 */}
                      <div className="absolute bottom-6 left-6">
                        <div className="bg-black/50 backdrop-blur-sm px-3 sm:px-5 py-1 sm:py-3 rounded-2xl border border-white/20">
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

                  {/* 資訊區塊 */}
                  <div
                    className={`md:col-span-3 px-8  ${!isEven && "md:order-1"}`}
                  >
                    {/* 訂單編號 */}
                    <div className="flex items-center gap-2 my-4">
                      <Hash className="w-4 h-4 text-gray-200" />
                      <span className="text-gray-100 text-sm font-mono">
                        {orderNumber}
                      </span>
                    </div>

                    {/* 車輛名稱 */}
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {car.brand} {car.model}
                    </h2>

                    {/* 車輛基本資訊 */}
                    <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                      <span className="text-lg">{car.year}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-lg">{car.category}</span>
                      <span className="text-gray-500">•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-lg">{car.location}</span>
                      </div>
                    </div>

                    {/* 租車時間 */}
                    <div className={`${gs.glassCard} p-5 rounded-2xl mb-4`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <Calendar className="w-6 h-6 text-black" />
                        </div>
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

                    {/* 訂單成立時間 */}
                    <div className="flex items-center gap-2 text-gray-200 text-base mb-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {t("userBooking.bookedOn", {
                          date: formatCreatedAt(booking.createdAt),
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* 空狀態 */}
      {bookings.length === 0 && (
        <div className={`${gs.glass} p-16 rounded-3xl text-center`}>
          <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center opacity-50">
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
