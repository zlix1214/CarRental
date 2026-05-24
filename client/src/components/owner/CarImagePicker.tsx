import { type Dispatch, type SetStateAction, useEffect, useMemo } from "react";
import { Upload, X } from "lucide-react";
import { useTranslation } from "react-i18next";

type CarFormMode = "add" | "edit";

interface CarImagePickerProps {
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  existingImageUrl?: string;
  mode?: CarFormMode;
}

const CarImagePicker = ({
  image,
  setImage,
  existingImageUrl = "",
  mode = "add",
}: CarImagePickerProps) => {
  const { t } = useTranslation();
  const previewUrl = useMemo(
    () => (image ? URL.createObjectURL(image) : ""),
    [image]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const title =
    mode === "edit"
      ? t("editCar.imageUploadTitle") || "Update Car Image"
      : t("addCar.imageUpload.title");

  const description =
    mode === "edit"
      ? image
        ? t("editCar.imageUpload.newImageSelected") ||
          "New image selected. Click submit to update."
        : t("editCar.imageUploadSubTitle") ||
          "Click on the image to upload a new one, or keep the existing image."
      : t("addCar.imageUpload.description");

  return (
    <div className="relative overflow-hidden rounded-3xl p-8 md:p-12">
      <div className="relative flex flex-col lg:flex-row items-center gap-8">
        <label htmlFor="car-image" className="relative group cursor-pointer">
          <div className="relative">
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Car preview"
                  className="w-64 h-40 object-cover rounded-2xl border-4 border-slate-700"
                />
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setImage(null);
                  }}
                  className="absolute -top-3 -right-3 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : existingImageUrl ? (
              <div className="relative">
                <img
                  src={existingImageUrl}
                  alt="Current car"
                  className="w-64 h-40 object-cover rounded-2xl border-4 border-slate-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                  <p className="text-white text-sm font-medium">
                    {t("editCar.imageUpload.changeImage") ||
                      "Click to change image"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-45 h-30 sm:w-64 sm:h-40 flex flex-col items-center justify-center backdrop-blur-sm border-2 border-dashed border-white/20 rounded-2xl group-hover:border-white/40 transition-all">
                <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-white/60 mb-3 group-hover:text-white/80 transition-colors" />
                <p className="text-white/80 text-xs sm:text-sm font-medium">
                  {t("addCar.imageUpload.clickToUpload")}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  {t("addCar.imageUpload.fileFormat")}
                </p>
              </div>
            )}
          </div>
          <input
            type="file"
            id="car-image"
            accept="image/*"
            hidden
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
          />
        </label>

        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-slate-300 text-sm mb-4">{description}</p>
          {(!image || mode === "add") && (
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="hidden sm:block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                {t("addCar.imageUpload.tips.frontView")}
              </span>
              <span className="hidden sm:block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                {t("addCar.imageUpload.tips.cleanBackground")}
              </span>
              <span className="hidden sm:block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                {t("addCar.imageUpload.tips.highResolution")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarImagePicker;
