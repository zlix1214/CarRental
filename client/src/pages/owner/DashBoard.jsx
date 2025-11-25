import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import {
  Car,
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { gs } from "../../style/glassUi.js";
import { useAppContext } from "../../context/AppContext.jsx";

const Dashboard = () => {
  const { currency, axios, isOwner } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
      IconComponent: Car,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+12%",
      isPositive: true,
    },
    {
      title: "Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
      IconComponent: Calendar,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+23%",
      isPositive: true,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
      IconComponent: Clock,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "-5%",
      isPositive: false,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
      IconComponent: CheckCircle,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      change: "+18%",
      isPositive: true,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-transparent px-4 pt-10 md:px-10 flex-1">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-200 mb-2">
            Dashboard
          </h1>
          <p className="text-slate-200 text-sm sm:text-base lg:text-lg">
            Welcome back! Here's what's happening with your rentals.
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => {
            const Icon = card.IconComponent;
            return (
              <div
                key={index}
                className={`${gs.glassCard} group relative overflow-hidden  rounded-2xl p-2 sm:p-4 lg:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="relative flex items-center justify-between">
                  {/* Icon */}
                  <div className="p-2 sm:p-3 rounded-xl">
                    <Icon className="w-2 sm:w-3 md:w-4 lg:w-5 xl:w-6 h-2 sm:h-3 md:h-4 lg:h-5 xl:h-6 text-white " />
                  </div>

                  {/* Value */}
                  <div className="flex items-end justify-between">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200">
                      {card.value}
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-medium text-slate-200 mb-1">
                    {card.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Bookings */}
          <div className={`lg:col-span-2 rounded-2xl p-6 shadow-2xl`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
                  Recent Bookings
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-1">
                  Latest customer bookings
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-50 rounded-xl transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {data.recentBookings.map((booking, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-0 sm:p-1 md:p-2 lg:p-3 xl:p-4  transition-all border border-transparent "
                >
                  <div className="flex items-center gap-4">
                    {/* Car Icon */}
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl group-hover:scale-110 transition-transform">
                      <Car className="w-6 h-6 text-white" />
                    </div>

                    {/* Booking Info */}
                    <div>
                      <p className="font-semibold text-xs sm:text-base md:text-xl lg:text-2xl  text-slate-200">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-xs sm:text-sm lg:text-lg text-slate-200 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {booking.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Price & Status */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-slate-200">Total</p>
                      <p className="font-bold text-slate-200 text-xs md:text-base lg:text-lg xl:text-2xl">
                        {currency}
                        {booking.price}
                      </p>
                    </div>
                    <span
                      className={`px-1.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Revenue Card */}
          <div className="relative overflow-hidden rounded-2xl p-6 shadow-2xl bg-gradient-to-br from-[#1a1a1a] to-[#7a0101]">
            <div className="relative">
              {/* Title */}
              <h2 className="text-lg font-bold text-white mb-1">
                Monthly Revenue
              </h2>
              <p className="text-sm text-slate-200 mb-6">
                Revenue for current month
              </p>

              {/* Revenue Amount */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-white mb-2">
                  {currency}
                  {data.monthlyRevenue.toLocaleString()}
                </p>
                <div className="flex items-center gap-2"></div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-sm lg:text-base text-slate-200 mb-1">
                    Avg. per booking
                  </p>
                  <p className="text-lg font-bold text-white">{currency}292</p>
                </div>
                <div>
                  <p className="text-sm lg:text-base text-slate-200 mb-1">
                    Total bookings
                  </p>
                  <p className="text-lg font-bold text-white">
                    {data.totalBookings}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
