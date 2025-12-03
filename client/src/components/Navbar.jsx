import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { gs } from "../style/glassUi.js";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`${gs.glassDark} fixed right-0 left-0 text-gray-200 z-1`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-8" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4 md:gap-8 lg:gap-12 text-sm md:text-base lg:text-xl">
          <Link to="/">{t("navbar.home")}</Link>
          <Link to="/cars">{t("navbar.car")}</Link>
          <Link to="/my-bookings">{t("navbar.booking")}</Link>

          <button
            onClick={() => navigate("/owner")}
            className={`p-2 cursor-pointer`}
          >
            {t("navbar.dashboard")}
          </button>
          <LanguageSwitcher />
          <button
            onClick={() => (user ? logout() : setShowLogin(true))}
            className={`${gs.glassButton} px-2 py-1 md:px-3 md:py-2 cursor-pointer`}
          >
            {user ? `${t("navbar.logout")}` : `${t("navbar.login")}`}
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
          <Link to="/my-bookings" onClick={() => setOpen(false)}>
            My Bookings
          </Link>

          <button
            onClick={() => {
              isOwner ? navigate("/owner") : changeRole();
            }}
            className="text-left"
          >
            Dashboard
          </button>
          <LanguageSwitcher />
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className={`${gs.glassButton} p-1.5 w-1/2 self-center`}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
