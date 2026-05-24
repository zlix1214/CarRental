import { useMemo, useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { X, Check } from "lucide-react";
import { updateOwnerImage } from "../../api/ownerProfileApi";
import { getErrorMessage } from "../../api/getErrorMessage";

const fallbackUserImage =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300";

const Sidebar = () => {
  const { user, fetchUser } = useAppContext();
  const { t } = useTranslation();
  const location = useLocation();
  const [image, setImage] = useState<File | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const previewImageUrl = useMemo(() => {
    if (!image) return user?.image || fallbackUserImage;
    return URL.createObjectURL(image);
  }, [image, user?.image]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setShowConfirmModal(true);
    }
  };

  const handleCancel = () => {
    setImage(null);
    setShowConfirmModal(false);
    const fileInput = document.getElementById("image") as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
  };

  const updateImage = async () => {
    if (!image) return;

    try {
      const data = await updateOwnerImage(image);

      if (data.success) {
        await fetchUser();
        toast.success(data.message || "Image updated successfully");
        setImage(null);
        setShowConfirmModal(false);
      } else {
        toast.error(data.message || "Unable to update image");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/5 rounded-2xl shadow shadow-white/40 max-w-md w-full p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                {t("sidebar.confirmChangeImage")}
              </h3>
              <button
                onClick={handleCancel}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-slate-300 mb-3">
                {t("sidebar.previewNewImage")}
              </p>
              <div className="flex justify-center">
                <img
                  src={previewImageUrl}
                  alt="Preview"
                  className="h-32 w-32 rounded-full object-cover border-4 border-slate-600 shadow-lg"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-black/30 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <X className="w-4 h-4" />
                {t("sidebar.cancel")}
              </button>
              <button
                onClick={updateImage}
                className="flex-1 px-4 py-2.5 bg-white/30 hover:bg-black/30 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Check className="w-4 h-4" />
                {t("sidebar.confirmUpdate")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative mt-8 h-fit md:flex flex-col items-center py-10 sm:py-16 px-3 max-w-13 md:max-w-60 w-full text-sm rounded-2xl">
        <div className="group relative">
          <label htmlFor="image">
            <img
              src={previewImageUrl}
              alt=""
              className="h-9 md:h-16 w-9 md:w-16 rounded-full mx-auto object-cover border-2 border-slate-600 transition-all duration-200 group-hover:border-blue-500 cursor-pointer"
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleImageSelect}
            />

            <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/50 rounded-full group-hover:flex items-center justify-center cursor-pointer transition-opacity duration-200">
              <img
                src={assets.edit_icon}
                alt=""
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </div>
          </label>
        </div>

        <p className="mt-2 text-neutral-300 max-md:hidden">{user?.name}</p>

        <div className="w-full flex flex-col gap-1.5">
          {ownerMenuLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={`relative flex items-center gap-2 w-full py-3 px-1 first:mt-6 text-white 
              `}
            >
              <img
                src={
                  link.path === location.pathname ? link.coloredIcon : link.icon
                }
                alt="car icon"
              />
              <span className="max-md:hidden">{t(link.name)}</span>
              <div
                className={`${
                  link.path === location.pathname && "bg-primary"
                } w-1.5 h-8 rounded-l right-0 absolute`}
              ></div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
