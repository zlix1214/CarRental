import React from "react";
import { gs } from "../style/glassUi";

const testimonialData = [
  {
    id: 1,
    name: "Donald Jackman",
    role: "Graphic Designer",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    rating: 5,
    text: "I've been using this service for over a year, and the experience has been consistently excellent.",
  },
  {
    id: 2,
    name: "Richard Nelson",
    role: "Content Creator",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    rating: 4,
    text: "Very smooth process and professional support. Would recommend to others for sure.",
  },
  {
    id: 3,
    name: "James Washington",
    role: "Co-founder",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    rating: 4,
    text: "Solid platform with great reliability. Looking forward to future improvements.",
  },
];

const RatingStars = ({ rating }) => (
  <div className="flex gap-1 mt-2\1">
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-400"}
      >
        ★
      </span>
    ))}
  </div>
);

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center gap-5 px-8 mt-80">
      <div className="flex flex-col items-center text-center gap-1">
        <h1 className=" text-4xl sm:text-5xl text-white font-medium">
          What our Customer Say
        </h1>
        <p className="text-gray-200 text-base sm:text-xl max-w-130">
          Discover why discerning travelers choose StayVenture for their luxury
          accommodations around the world.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 px-5">
        {testimonialData.map((item, index) => (
          <div
            key={index}
            className="p-6 flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-md w-full max-w-md"
          >
            <img
              src={item.avatar}
              alt="avatar"
              className="h-20 w-20 rounded-full"
            />
            <h3 className="text-white text-lg font-bold">{item.name}</h3>
            <div className="text-sm text-gray-200 mt-1">{item.role}</div>
            <RatingStars rating={item.rating} />
            <p className="text-gray-300 mt-2 text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
