// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { dummyCarData, assets } from "../assets/assets";
// import Loader from "../components/Loader";
// import { gs } from "../style/glassUi";

// const CarDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [car, setCar] = useState(null);
//   const currency = import.meta.env.VITE_CURRENCY;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     setCar(dummyCarData.find((car) => car._id === id));
//   }, [id]);

//   return car ? (
//     <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-30 max-w-7xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 mb-6 text-gray-200 cursor-pointer"
//       >
//         <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-80" />
//         Back to all cars
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//         {/* Left: Car Image & Details */}
//         <div className={`${gs.glassDark} lg:col-span-2 p-5 rounded-2xl`}>
//           <img
//             src={car.image}
//             alt=""
//             className={`${gs.glass} w-full h-auto md:max-h-100 object-cover mb-6 rounded-2xl`}
//           />
//           <div className="space-y-6">
//             <div className={`${gs.glassCard} p-2 pl-5 rounded-2xl`}>
//               <h1 className="text-3xl font-bold text-white">
//                 {car.brand} {car.model}
//               </h1>
//               <p className="text-gray-200 text-lg">
//                 {car.category} • {car.year}
//               </p>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {[
//                 {
//                   icon: assets.users_icon,
//                   text: `${car.seating_capacity} Seats`,
//                 },
//                 { icon: assets.fuel_icon, text: car.fuel_type },
//                 { icon: assets.car_icon, text: car.transmission },
//                 { icon: assets.location_icon, text: car.location },
//               ].map(({ icon, text }) => (
//                 <div
//                   key={text}
//                   className={`${gs.glassCard} flex flex-col items-center p-4 rounded-lg text-center text-gray-200`}
//                 >
//                   <img src={icon} alt="" className="h-5 mb-2" />
//                   {text}
//                 </div>
//               ))}
//             </div>

//             {/* Description */}
//             <div className={`${gs.glassCard} p-5 rounded-2xl`}>
//               <h1 className="text-2xl font-medium mb-3 text-gray-200">
//                 Description
//               </h1>
//               <p className="text-gray-200">{car.description}</p>
//             </div>

//             {/* Features */}
//             <div className={`${gs.glassCard} p-5 rounded-2xl`}>
//               <h1 className="text-2xl font-medium mb-3 text-gray-200">
//                 Features
//               </h1>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {[
//                   "360 Camera",
//                   "Bluetooth",
//                   "GPS",
//                   "Heated Seats",
//                   "Rear View Mirror",
//                 ].map((item) => (
//                   <li key={item} className="flex items-center text-gray-200">
//                     <img src={assets.check_icon} className="h-4 mr-2" alt="" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Right: Booking Form */}
//         <form
//           className={`${gs.glassDark} h-max sticky top-25 rounded-xl p-6 space-y-6 text-gray-200`}
//         >
//           <p className="flex items-center justify-between text-2xl text-gray-200 font-semibold">
//             {currency}
//             {car.pricePerDay}
//             <span className="text-base text-gray-200 font-normal">per day</span>
//           </p>
//           <hr className="border-gray-400 my-6" />
//           <div className="flex flex-col gap-2">
//             <label htmlFor="pickup-date">Pickup Date</label>
//             <input
//               type="date"
//               className="border px-3 py-2 rounded-lg"
//               required
//               id="pickup-date"
//               min={new Date().toISOString().split("T")[0]}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="return-date">Return Date</label>
//             <input
//               type="date"
//               className="border px-3 py-2 rounded-lg"
//               required
//               id="return-date"
//               min={new Date().toISOString().split("T")[0]}
//             />
//           </div>
//           <button onClick={handleSubmit} className={`${gs.glassButton} w-full`}>
//             Book Now
//           </button>

//           <p className="text-center text-sm">
//             No credit card required to reserver
//           </p>

//           {/* 其他表單內容 */}
//         </form>
//       </div>
//     </div>
//   ) : (
//     <Loader />
//   );
// };

// export default CarDetails;

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

const assets = {
  arrow_icon: "←",
  users_icon: "👥",
  fuel_icon: "⛽",
  car_icon: "🚗",
  location_icon: "📍",
  check_icon: "✓",
};

const dummyCarData = [
  {
    _id: "1",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80",
    brand: "Tesla",
    model: "Model S",
    category: "Sedan",
    year: 2024,
    pricePerDay: 150,
    seating_capacity: 5,
    fuel_type: "Electric",
    transmission: "Automatic",
    location: "San Francisco",
    description:
      "Experience the future of driving with this stunning Tesla Model S. This premium electric sedan combines cutting-edge technology with luxurious comfort. With instant acceleration, autopilot capabilities, and a sleek design, it's perfect for both business trips and leisure drives. The spacious interior features premium leather seats, a massive touchscreen display, and advanced safety features.",
    rating: 4.9,
    totalReviews: 128,
  },
];

const CarDetails = () => {
  const id = "1";
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const currency = "$";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Booking submitted", { pickupDate, returnDate });
  };

  const goBack = () => {
    console.log("Navigate back");
  };

  useEffect(() => {
    setCar(dummyCarData.find((car) => car._id === id));
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const features = [
    "360 Camera",
    "Bluetooth",
    "GPS Navigation",
    "Heated Seats",
    "Rear View Mirror",
    "Parking Sensors",
    "Sunroof",
    "Premium Sound System",
  ];

  const specs = [
    {
      icon: <Users className="w-5 h-5" />,
      text: `${car.seating_capacity} Seats`,
    },
    { icon: <Fuel className="w-5 h-5" />, text: car.fuel_type },
    { icon: <Settings className="w-5 h-5" />, text: car.transmission },
    { icon: <MapPin className="w-5 h-5" />, text: car.location },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 mb-4 text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to all cars</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Car Details (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-auto max-h-[500px] object-cover"
              />

              {/* Gradient Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/80 to-transparent" />

              {/* Price Badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-slate-900">
                  {currency}
                  {car.pricePerDay}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  per day
                </div>
              </div>
            </div>

            {/* Car Name & Category */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">
                    {car.brand}{" "}
                    <span className="text-slate-600">{car.model}</span>
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {car.category}
                    </span>
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                      {car.year}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="text-right">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold text-slate-900">
                      {car.rating}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500">
                    {car.totalReviews} reviews
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {specs.map(({ icon, text }, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="text-slate-600 mb-2">{icon}</div>
                    <span className="text-sm font-medium text-slate-900">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                About This Car
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-700 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insurance Info */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Protected Rental
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Your booking is protected with comprehensive insurance
                    coverage. Drive with peace of mind knowing you're fully
                    covered.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Form (1/3 width - Sticky) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-slate-200">
              {/* Price Header */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-4xl font-bold text-slate-900">
                      {currency}
                      {car.pricePerDay}
                    </div>
                    <div className="text-sm text-slate-500 font-medium mt-1">
                      per day
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">Total est.</div>
                    <div className="text-xl font-bold text-blue-600">
                      {currency}450
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Inputs */}
              <div className="space-y-4 mb-6">
                <div>
                  <label
                    htmlFor="pickup-date"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-1.5" />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    id="pickup-date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label
                    htmlFor="return-date"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-1.5" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    id="return-date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all mb-4"
              >
                Book Now
              </button>

              <p className="text-center text-sm text-slate-500">
                No credit card required to reserve
              </p>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Free cancellation up to 24h before</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>24/7 customer support</span>
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
