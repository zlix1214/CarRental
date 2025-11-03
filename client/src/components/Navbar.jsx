import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { gs } from "../style/glassUi.js";

const Navbar = ({ setShowLogin }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`${gs.glassNav}  fixed left-0 right-0 text-gray-200 m-5 rounded-2xl z-1`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-8" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/my-bookings">My bookings</Link>

          <button
            onClick={() => navigate("/owner")}
            className={`${gs.glassButton} text-white  cursor-pointer`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setShowLogin(true)}
            className={`${gs.glassButton} px-6 py-2 text-white cursor-pointer`}
          >
            Login
          </button>
        </div>

        {/* Hamburger */}
        <button className="sm:hidden" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="flex flex-col gap-4 px-6 py-4  sm:hidden ">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/cars" onClick={() => setOpen(false)}>
            Cars
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>

          <button
            onClick={() => {
              navigate("/owner");
              setOpen(false);
            }}
            className="text-left"
          >
            Dashboard
          </button>

          <button
            onClick={() => {
              setShowLogin(true);
              setOpen(false);
            }}
            className={`${gs.glassButton}`}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
