import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const switchLanguage = () => {
    const newLang = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(newLang);
  };
  return (
    <button
      onClick={switchLanguage}
      className="px-1 sm:px-4 py-2 text-xs md:text-sm font-medium text-gray-200 rounded-2xl shadow-sm shadow-white cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300"
    >
      {i18n.language === "zh" ? "EN" : "中文"}
    </button>
  );
};

export default LanguageSwitcher;
