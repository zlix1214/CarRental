import React from "react";
import { gs } from "../style/glassUi";
import { assets } from "../assets/assets.js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-12 lg:flex-row  md:justify-center items-center px-8 mt-80">
      <div className="text-white flex flex-col items-center lg:items-start">
        <h1 className="text-4xl sm:text-5xl font-medium text-center lg:text-left">
          {t("banner.title")}
        </h1>
        <p className="my-4 text-base sm:text-xl text-center lg:text-left max-w-130">
          {t("banner.content")}
        </p>
        <button
          className="px-6 py-3 text-basic mt-8 shadow-sm shadow-white rounded-2xl cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300"
          onClick={() => {
            navigate("/owner");
            scrollTo(0, 0);
          }}
        >
          {t("banner.button")}
        </button>
      </div>
      <img src={assets.banner_car_image} alt="" className="max-h-60" />
    </div>
  );
};

export default Banner;
