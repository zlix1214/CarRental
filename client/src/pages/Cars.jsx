import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";
import { Search, X, MapPin, Calendar } from "lucide-react";
import { gs } from "../style/glassUi";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";

const Cars = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { axios, cars, navigate } = useAppContext();

  const [input, setInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("oldest");

  // 檢查是否有預約篩選條件
  const hasBookingFilters = pickupLocation || pickupDate || returnDate;

  // 第一步：根據預約條件篩選（地點、日期）
  let filteredCars = cars.filter((car) => {
    // 地點篩選
    const matchLocation = pickupLocation
      ? car.location?.toLowerCase() === pickupLocation.toLowerCase()
      : true;

    // 日期篩選
    const matchDate =
      pickupDate && returnDate
        ? !(
            new Date(returnDate) < new Date(car.availableFrom) ||
            new Date(pickupDate) > new Date(car.availableTo)
          )
        : true;

    return matchLocation && matchDate;
  });

  // 第二步：在篩選結果中進行關鍵字搜尋（品牌/型號）
  if (input.trim()) {
    const keyword = input.toLowerCase();
    filteredCars = filteredCars.filter(
      (car) =>
        car.brand?.toLowerCase().includes(keyword) ||
        car.model?.toLowerCase().includes(keyword) ||
        car.type?.toLowerCase().includes(keyword)
    );
  }

  // 排序
  if (sortOption === "lowToHigh") {
    filteredCars = [...filteredCars].sort(
      (a, b) => a.pricePerDay - b.pricePerDay
    );
  }
  if (sortOption === "highToLow") {
    filteredCars = [...filteredCars].sort(
      (a, b) => b.pricePerDay - a.pricePerDay
    );
  }
  if (sortOption === "newest") {
    filteredCars = [...filteredCars].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  if (sortOption === "oldest") {
    filteredCars = [...filteredCars].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  // 清除所有篩選條件
  const clearAllFilters = () => {
    navigate("/cars");
    setInput("");
  };

  // 清除預約篩選條件
  const clearBookingFilters = () => {
    navigate("/cars");
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section with Search */}
      <div className="relative overflow-hidden">
        <div className="relative px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              {t("carPage.availableCars")}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-5 sm:mb-10 max-w-2xl mx-auto hidden sm:block">
              {t("carPage.choosePremium")}
            </p>

            {/* Modern Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center rounded-2xl shadow-sm shadow-white overflow-hidden">
                <div className="pl-6 pr-4 py-2 sm:py-3 md:py-4 lg:py-5">
                  <Search className="w-6 h-6 text-slate-100" />
                </div>

                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder={t("carPage.searchPlaceholder")}
                  className="flex-1 text-white placeholder:text-neutral-300 text-lg outline-none"
                />

                {input && (
                  <button
                    onClick={() => setInput("")}
                    className="pr-6 pl-4 py-2 sm:py-3 md:py-4 lg:py-5 hover:bg-white/5 transition-colors rounded-r-2xl"
                  >
                    <X className="w-5 h-5 text-slate-300" />
                  </button>
                )}
              </div>
            </div>

            {/* 篩選條件標籤 */}
            {hasBookingFilters && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="text-slate-300 text-sm">
                  {t("carPage.bookingFilters")}
                </span>

                {pickupLocation && (
                  <div className="flex items-center gap-2 border border-white/30 rounded-full px-4 py-2 text-sm text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {t(`common.location.${pickupLocation}`) || pickupLocation}
                    </span>
                  </div>
                )}

                {pickupDate && returnDate && (
                  <div className="flex items-center gap-2 border border-white/30 rounded-full px-4 py-2 text-sm text-white/80">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {pickupDate} ~ {returnDate}
                    </span>
                  </div>
                )}

                <button
                  onClick={clearBookingFilters}
                  className="flex items-center gap-1 bg-red-500/20 border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 hover:bg-red-500/30 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  {t("carPage.clearBookingFilters")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cars Grid Section */}
      <div className="w-fit mx-auto p-4 md:p-8 lg:p-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Results Header - 只在有結果時顯示 */}
          {filteredCars.length > 0 && (
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <div>
                <p className="text-slate-200 text-sm sm:text-base md:text-lg">
                  {t("carPage.showing")}{" "}
                  <span className="font-bold text-slate-300">
                    {filteredCars.length}
                  </span>{" "}
                  {t("carPage.vehicles")}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {(hasBookingFilters || input) && (
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-2 text-xs md:text-sm text-slate-300 hover:text-white border border-slate-500 rounded-xl hover:border-slate-400 transition-colors"
                  >
                    {t("carPage.clearAllFilters")}
                  </button>
                )}

                <select
                  className="px-1 py-1 sm:px-4 sm:py-2 border-white rounded-xl text-neutral-300 font-medium outline-none cursor-pointer"
                  onChange={(e) => setSortOption(e.target.value)}
                  value={sortOption}
                >
                  <option value="oldest" className="text-black/80">
                    {t("carPage.oldestFirst")}
                  </option>
                  <option value="newest" className="text-black/80">
                    {t("carPage.newestFirst")}
                  </option>
                  <option value="lowToHigh" className="text-black/80">
                    {t("carPage.priceLowToHigh")}
                  </option>
                  <option value="highToLow" className="text-black/80">
                    {t("carPage.priceHighToLow")}
                  </option>
                </select>
              </div>
            </div>
          )}

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("carPage.noResults")}
              </h3>
              <p className="text-slate-300 mb-6">
                {hasBookingFilters || input
                  ? t("carPage.tryAdjustFilters")
                  : t("carPage.noAvailableCars")}
              </p>
              {/* 只有在預約條件篩選沒結果時才顯示清除按鈕 */}
              {hasBookingFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/15 transition-colors"
                >
                  {t("carPage.clearAllFilters")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
