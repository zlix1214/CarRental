import SearchForm from "./SearchForm";
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center gap-4 text-center">
      <img src={assets.main_car} alt="car" className="" />
      <h2 className="text-4xl sm:text-6xl lg:text-9xl text-white/90 mb-4">
        {t("hero.title")}
      </h2>
      <SearchForm />
    </div>
  );
};

export default Hero;
