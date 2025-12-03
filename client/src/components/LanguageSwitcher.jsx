import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const switchLanguage = () => {
    const newLang = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(newLang);
  };
  return (
    <button onClick={switchLanguage} className="px-3 py-1 border rounded">
      {i18n.language === "zh" ? "EN" : "中文"}
    </button>
  );
};

export default LanguageSwitcher;
