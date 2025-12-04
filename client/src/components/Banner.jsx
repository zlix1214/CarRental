import React from "react";
import { gs } from "../style/glassUi";
import { assets } from "../assets/assets.js";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-12 lg:flex-row  md:justify-center items-center px-8 mt-80">
      <div className="text-white flex flex-col items-center lg:items-start">
        <h2 className="text-4xl sm:text-5xl font-medium text-center lg:text-left">
          {t("banner.title")}
        </h2>
        <p className="mt-2 text-base sm:text-xl text-center lg:text-left max-w-130">
          {t("banner.content")}
        </p>
        <button
          className={`bg-white/10 px-6 py-3 text-basic mt-4 w-1/2 shadow-2xl rounded-2xl`}
        >
          {t("banner.button")}
        </button>
      </div>
      <img src={assets.banner_car_image} alt="" className="max-h-60" />
    </div>
  );
};

export default Banner;
