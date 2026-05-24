import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { assets } from "../assets/assets.js";
import { gs } from "../style/glassUi.js";
import { useAppContext } from "../context/appContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const { setShowLogin, user, logout } = useAppContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goToOwnerDashboard = () => {
    navigate("/owner");
    scrollTo(0, 0);
  };

  return (
    <div className={`${gs.glassDark} fixed right-0 left-0 text-gray-200 z-1`}>
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-8" />
        </Link>

        <div className="hidden sm:flex items-center gap-4 md:gap-8 lg:gap-12 text-sm md:text-base lg:text-xl">
          <Link to="/">{t("navbar.home")}</Link>
          <Link to="/cars">{t("navbar.car")}</Link>
          <Link to="/my-bookings">{t("navbar.booking")}</Link>

          <button onClick={goToOwnerDashboard} className="p-2 cursor-pointer">
            {t("navbar.dashboard")}
          </button>
          <LanguageSwitcher />
          <button
            onClick={() => (user ? logout() : setShowLogin(true))}
            className="px-1 sm:px-4 py-2 text-xs md:text-sm font-medium text-gray-200 rounded-2xl shadow-sm shadow-white cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300"
          >
            {user ? t("navbar.logout") : t("navbar.login")}
          </button>
        </div>

        <button
          className="sm:hidden"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 px-6 py-4 sm:hidden">
          <Link to="/" onClick={() => setOpen(false)}>
            {t("navbar.home")}
          </Link>
          <Link to="/cars" onClick={() => setOpen(false)}>
            {t("navbar.car")}
          </Link>
          <Link to="/my-bookings" onClick={() => setOpen(false)}>
            {t("navbar.booking")}
          </Link>

          <button onClick={goToOwnerDashboard} className="cursor-pointer text-left">
            {t("navbar.dashboard")}
          </button>
          <LanguageSwitcher />
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="px-1 sm:px-4 py-2 text-xs md:text-sm font-medium text-gray-200 rounded-2xl shadow-sm shadow-white cursor-pointer hover:scale-105 transition-all duration-300"
          >
            {user ? t("navbar.logout") : t("navbar.login")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
