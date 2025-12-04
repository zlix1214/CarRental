import SearchForm from "./SearchForm";
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center gap-4 text-center">
      <img src={assets.main_car} alt="car" className="" />
      <h1 className="text-4xl sm:text-6xl lg:text-8xl text-white">
        {t("hero.title")}
      </h1>
      <SearchForm />
    </div>
  );
};

export default Hero;
