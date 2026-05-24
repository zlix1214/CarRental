import React, { type Dispatch, type SetStateAction } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Car,
  Check,
  DollarSign,
  FileText,
  Fuel,
  MapPin,
  Settings,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  type CarFormValues,
  categoryOptions,
  fuelOptions,
  locationOptions,
  transmissionOptions,
} from "../../forms/carForm";
import CarImagePicker from "./CarImagePicker";

type CarFormMode = "add" | "edit";

interface TranslatedOption {
  value: string;
  label: string;
}

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

interface TextFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number";
  placeholder?: string;
  icon?: LucideIcon;
}

interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: TranslatedOption[];
  placeholder: string;
  icon?: LucideIcon;
}

interface CarFormProps {
  car: CarFormValues;
  setCar: Dispatch<SetStateAction<CarFormValues>>;
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  existingImageUrl?: string;
  currency: string;
  mode?: CarFormMode;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel?: () => void;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
}

const fieldClass =
  "px-3 py-2 bg-white/20 rounded-xl outline-none text-white/80";
const selectClass =
  "px-3 py-2 rounded-xl outline-none bg-white/20 text-white/80";

const SectionHeader = ({ icon: Icon, title, subtitle }: SectionHeaderProps) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-3 bg-black/30 rounded-xl">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-200">
        {title}
      </h2>
      <p className="text-sm text-slate-300">{subtitle}</p>
    </div>
  </div>
);

const TextField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  icon: Icon,
}: TextFieldProps) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      required
      className={fieldClass}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}: SelectFieldProps) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </label>
    <select
      required
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={selectClass}
    >
      <option value="" className="text-black/80">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-black/80">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const CarForm = ({
  car,
  setCar,
  image,
  setImage,
  existingImageUrl,
  currency,
  mode = "add",
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel,
  submittingLabel,
}: CarFormProps) => {
  const { t } = useTranslation();

  const updateCarField = (field: keyof CarFormValues, value: string) => {
    setCar((currentCar) => ({ ...currentCar, [field]: value }));
  };

  const translatedOptions = (
    options: { value: string; labelKey: string }[]
  ): TranslatedOption[] =>
    options.map((option) => ({
      ...option,
      label: t(option.labelKey),
    }));

  return (
    <div className="space-y-8">
      <CarImagePicker
        image={image}
        setImage={setImage}
        existingImageUrl={existingImageUrl}
        mode={mode}
      />

      <div className="rounded-3xl bg-white/5 p-6 md:p-8 shadow-md shadow-white/40">
        <SectionHeader
          icon={Car}
          title={t("addCar.basicInfo.title")}
          subtitle={t("addCar.basicInfo.subtitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label={t("addCar.basicInfo.brand")}
            placeholder={t("addCar.basicInfo.brandPlaceholder")}
            value={car.brand}
            onChange={(value) => updateCarField("brand", value)}
          />
          <TextField
            label={t("addCar.basicInfo.model")}
            placeholder={t("addCar.basicInfo.modelPlaceholder")}
            value={car.model}
            onChange={(value) => updateCarField("model", value)}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-white/5 shadow-md shadow-white/40 p-6 md:p-8">
        <SectionHeader
          icon={DollarSign}
          title={t("addCar.pricingDetails.title")}
          subtitle={t("addCar.pricingDetails.subtitle")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <TextField
            icon={Calendar}
            type="number"
            label={t("addCar.pricingDetails.year")}
            value={car.year}
            onChange={(value) => updateCarField("year", value)}
          />
          <TextField
            icon={DollarSign}
            type="number"
            label={`${t("addCar.pricingDetails.dailyPrice")} (${currency})`}
            value={car.pricePerDay}
            onChange={(value) => updateCarField("pricePerDay", value)}
          />
          <SelectField
            icon={Car}
            label={t("addCar.pricingDetails.category")}
            placeholder={t("addCar.pricingDetails.selectCategory")}
            value={car.category}
            onChange={(value) => updateCarField("category", value)}
            options={translatedOptions(categoryOptions)}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-white/5 shadow-md shadow-white/40 p-6 md:p-8">
        <SectionHeader
          icon={Settings}
          title={t("addCar.specifications.title")}
          subtitle={t("addCar.specifications.subtitle")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SelectField
            icon={Settings}
            label={t("addCar.specifications.transmission")}
            placeholder={t("addCar.specifications.selectTransmission")}
            value={car.transmission}
            onChange={(value) => updateCarField("transmission", value)}
            options={translatedOptions(transmissionOptions)}
          />
          <SelectField
            icon={Fuel}
            label={t("addCar.specifications.fuelType")}
            placeholder={t("addCar.specifications.selectFuelType")}
            value={car.fuel_type}
            onChange={(value) => updateCarField("fuel_type", value)}
            options={translatedOptions(fuelOptions)}
          />
          <TextField
            icon={Users}
            type="number"
            label={t("addCar.specifications.seatingCapacity")}
            placeholder={t("addCar.specifications.seatingPlaceholder")}
            value={car.seating_capacity}
            onChange={(value) => updateCarField("seating_capacity", value)}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-white/5 shadow-md shadow-white/40 p-6 md:p-8">
        <SectionHeader
          icon={MapPin}
          title={t("addCar.locationDescription.title")}
          subtitle={t("addCar.locationDescription.subtitle")}
        />
        <div className="space-y-6">
          <SelectField
            icon={MapPin}
            label={t("addCar.locationDescription.location")}
            placeholder={t("addCar.locationDescription.selectLocation")}
            value={car.location}
            onChange={(value) => updateCarField("location", value)}
            options={translatedOptions(locationOptions)}
          />
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {t("addCar.locationDescription.description")}
            </label>
            <textarea
              rows={5}
              placeholder={t("addCar.locationDescription.descriptionPlaceholder")}
              required
              className="bg-white/20 text-white/80 px-3 py-2 rounded-xl outline-none resize-none"
              value={car.description}
              onChange={(event) =>
                updateCarField("description", event.target.value)
              }
            />
            <p className="text-sm text-slate-300 mt-2">
              {t("addCar.locationDescription.descriptionTip")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-slate-300 hover:text-white transition-colors w-full sm:w-auto text-center"
          >
            {t("editCar.cancel") || "Cancel"}
          </button>
        )}

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="group relative overflow-hidden px-8 py-3 text-white bg-white/10 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          <Check className="w-5 h-5 relative z-10" />
          <span className="relative z-10">
            {isSubmitting ? submittingLabel : submitLabel}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CarForm;
