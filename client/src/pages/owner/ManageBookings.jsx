import React, { useEffect, useState } from "react";
import {
  Calendar,
  DollarSign,
  CreditCard,
  Check,
  X,
  Clock,
  Search,
  ChevronDown,
} from "lucide-react";
import { dummyMyBookingsData } from "../../assets/assets";

const ManageBookings = () => {
  const currency = "$";
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      // Simulate API call
      console.log("Changing booking status:", bookingId, status);

      // Update local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );

      // In real app: toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      // In real app: toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter =
      filterStatus === "all" || booking.status === filterStatus;

    return matchesFilter;
  });

  const getStatusColor = (status) => {
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

  const getStatusIcon = (status) => {
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-200 mb-2">
            Manage Bookings
          </h1>
          <p className="text-slate-200">
            Review and manage customer reservations
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "all"
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "pending"
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              Pending ({bookings.filter((b) => b.status === "pending").length})
            </button>
            <button
              onClick={() => setFilterStatus("confirmed")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "confirmed"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              Confirmed (
              {bookings.filter((b) => b.status === "confirmed").length})
            </button>
            <button
              onClick={() => setFilterStatus("cancelled")}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                filterStatus === "cancelled"
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              Cancelled (
              {bookings.filter((b) => b.status === "cancelled").length})
            </button>
          </div>
        </div>

        {/* Bookings Grid - Card View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white/10 group relative rounded-2xl  overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row h-full">
                {/* Car Image */}
                <div className="relative sm:w-40">
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="h-50 sm:h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Status Badge on Image */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border flex items-center gap-1.5 ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                  {/* Car Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-200 mb-1">
                      {booking.car.brand} {booking.car.model}
                    </h3>
                    <p className="text-sm text-slate-300">
                      Booked by{" "}
                      <span className="font-medium">
                        {booking.customerName}
                      </span>
                    </p>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-300" />
                      <span>
                        {booking.pickupDate.split("T")[0]} →{" "}
                        {booking.returnDate.split("T")[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <DollarSign className="w-4 h-4 text-slate-300" />
                      <span className="font-semibold text-slate-200">
                        {currency}
                        {booking.price}
                      </span>
                      <span className="text-slate-300">total</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CreditCard className="w-4 h-4 text-slate-300" />
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                        Offline Payment
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="relative">
                    <select
                      onChange={(e) =>
                        changeBookingStatus(booking._id, e.target.value)
                      }
                      value={booking.status}
                      className="w-full appearance-none px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none font-medium text-slate-700 cursor-pointer"
                    >
                      <option value="pending">Pending - Change Status</option>
                      <option value="confirmed">Confirm Booking</option>
                      <option value="cancelled">Cancel Booking</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex p-6 rounded-full bg-slate-100 mb-4">
              <Calendar className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No bookings found
            </h3>
            <p className="text-slate-600">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "You don't have any bookings yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
