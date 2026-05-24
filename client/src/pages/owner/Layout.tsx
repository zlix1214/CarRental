import SideBar from "../../components/owner/SideBar";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";

const Layout = () => {
  const { t } = useTranslation();
  const { token, isInitialized, navigate } = useAppContext();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-10 md:px-10">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900"></div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center pointer-events-auto">
        <div className="bg-black p-6 rounded-lg shadow-md w-80 text-center shadow-white/50 pointer-events-auto">
          <h1 className="text-lg text-neutral-200 font-semibold mb-4">
            {t("dashboard.loginRequired")}
          </h1>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-white rounded-lg cursor-pointer shadow-xs shadow-white hover:scale-105 transition-all "
          >
            {t("dashboard.confirm")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
