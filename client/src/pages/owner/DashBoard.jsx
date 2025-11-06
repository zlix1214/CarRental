// import React, { useEffect, useState } from "react";
// import { assets, dummyDashboardData } from "../../assets/assets";

// const Dashboard = () => {
//   const currency = import.meta.env.VITE_CRUUENCY;

//   const [data, setData] = useState({
//     totalCars: 0,
//     totalBookings: 0,
//     pendingBookings: 0,
//     completedBookings: 0,
//     recentBookings: [],
//     monthlyRevenue: 0,
//   });

//   const dashboardCards = [
//     { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
//     {
//       title: "Total Bookings",
//       value: data.totalBookings,
//       icon: assets.listIconColored,
//     },
//     {
//       title: "Pending",
//       value: data.pendingBookings,
//       icon: assets.cautionIconColored,
//     },
//     {
//       title: "Confirmed",
//       value: data.completedBookings,
//       icon: assets.listIconColored,
//     },
//   ];

//   useEffect(() => {
//     setData(dummyDashboardData);
//   }, []);

//   return (
//     <div className="px-4 pt-10 md:px-10 flex-1">
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
//         {dashboardCards.map((card, index) => (
//           <div
//             key={index}
//             className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
//           >
//             <div>
//               <h1 className="text-xs text-gray-500">{card.title}</h1>
//               <p className="text-lg font-semibold">{card.value}</p>
//             </div>
//             <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
//               <img src={card.icon} alt="" className="h-4 w-4" />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
//         {/* recent booking  */}
//         <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
//           <h1 className="text-lg font-medium">Recent Bookings</h1>
//           <p className="text-gray-500">Latest customer bookings</p>
//           {data.recentBookings.map((booking, index) => (
//             <div key={index} className="mt-4 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
//                   <img
//                     src={assets.listIconColored}
//                     alt=""
//                     className="h-5 w-5"
//                   />
//                 </div>
//                 <div>
//                   <p>
//                     {booking.car.brand} {booking.car.model}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {booking.createdAt.split("T")[0]}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 font-medium">
//                 <p className="text-sm text-gray-500">
//                   {currency}
//                   {booking.price}
//                 </p>
//                 <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
//                   {booking.status}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* monthly revenue */}
//         <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
//           <h1 className="text-lg font-medium">Monthly Revenue</h1>
//           <p className="text-gray-500">Revenue for current month</p>
//           <p className="text-3xl mt-6 font-semibold text-primary">
//             {currency}
//             {data.monthlyRevenue}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

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

const Dashboard = () => {
  const currency = "$";

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
      title: "Total Bookings",
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

  useEffect(() => {
    setData(dummyDashboardData);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 pt-10 md:px-10 flex-1">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">
            Welcome back! Here's what's happening with your rentals.
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => {
            const Icon = card.IconComponent;
            return (
              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Background Gradient Effect */}
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-medium text-slate-600 mb-1">
                    {card.title}
                  </h3>

                  {/* Value */}
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-slate-900">
                      {card.value}
                    </p>

                    {/* Change Indicator */}
                    <div
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        card.isPositive ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {card.isPositive ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span>{card.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Recent Bookings
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Latest customer bookings
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {data.recentBookings.map((booking, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                >
                  <div className="flex items-center gap-4">
                    {/* Car Icon */}
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform">
                      <Car className="w-6 h-6 text-white" />
                    </div>

                    {/* Booking Info */}
                    <div>
                      <p className="font-semibold text-slate-900">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {booking.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Price & Status */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-slate-900">
                        {currency}
                        {booking.price}
                      </p>
                      <p className="text-xs text-slate-500">Total</p>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
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
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative">
              {/* Icon */}
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-white mb-1">
                Monthly Revenue
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Revenue for current month
              </p>

              {/* Revenue Amount */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-white mb-2">
                  {currency}
                  {data.monthlyRevenue.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 rounded-full">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">
                      +32%
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">vs last month</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    Avg. per booking
                  </p>
                  <p className="text-lg font-bold text-white">{currency}292</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Total bookings</p>
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
