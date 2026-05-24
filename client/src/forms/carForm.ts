import type { Car } from "../types/domain";

export interface CarFormValues {
  brand: string;
  model: string;
  year: string | number;
  pricePerDay: string | number;
  category: string;
  transmission: string;
  fuel_type: string;
  seating_capacity: string | number;
  location: string;
  description: string;
}

interface SelectOption {
  value: string;
  labelKey: string;
}

interface BuildCarFormDataParams {
  car: CarFormValues;
  image: File | null;
  carId?: string;
}

export const initialCarForm: CarFormValues = {
  brand: "",
  model: "",
  year: "",
  pricePerDay: "",
  category: "",
  transmission: "",
  fuel_type: "",
  seating_capacity: "",
  location: "",
  description: "",
};

export const categoryOptions: SelectOption[] = [
  { value: "Economy", labelKey: "addCar.pricingDetails.categories.economy" },
  { value: "Compact", labelKey: "addCar.pricingDetails.categories.compact" },
  { value: "Midsize", labelKey: "addCar.pricingDetails.categories.midsize" },
  { value: "SUV", labelKey: "addCar.pricingDetails.categories.suv" },
  { value: "Luxury", labelKey: "addCar.pricingDetails.categories.luxury" },
  { value: "Sport", labelKey: "addCar.pricingDetails.categories.sport" },
  { value: "Van", labelKey: "addCar.pricingDetails.categories.van" },
];

export const transmissionOptions: SelectOption[] = [
  {
    value: "Automatic",
    labelKey: "addCar.specifications.transmissionTypes.automatic",
  },
  { value: "Manual", labelKey: "addCar.specifications.transmissionTypes.manual" },
  {
    value: "Semi-Automatic",
    labelKey: "addCar.specifications.transmissionTypes.semiAutomatic",
  },
];

export const fuelOptions: SelectOption[] = [
  { value: "Gasoline", labelKey: "addCar.specifications.fuelTypes.gasoline" },
  { value: "Diesel", labelKey: "addCar.specifications.fuelTypes.diesel" },
  { value: "Hybrid", labelKey: "addCar.specifications.fuelTypes.hybrid" },
  { value: "Electric", labelKey: "addCar.specifications.fuelTypes.electric" },
];

export const locationOptions: SelectOption[] = [
  { value: "Taipei", labelKey: "addCar.locationDescription.locations.taipei" },
  {
    value: "New Taipei",
    labelKey: "addCar.locationDescription.locations.newTaipei",
  },
  { value: "Taoyuan", labelKey: "addCar.locationDescription.locations.taoyuan" },
  { value: "Hsinchu", labelKey: "addCar.locationDescription.locations.hsinchu" },
  {
    value: "Taichung",
    labelKey: "addCar.locationDescription.locations.taichung",
  },
  { value: "Tainan", labelKey: "addCar.locationDescription.locations.tainan" },
  {
    value: "Kaohsiung",
    labelKey: "addCar.locationDescription.locations.kaohsiung",
  },
  { value: "Keelung", labelKey: "addCar.locationDescription.locations.keelung" },
  { value: "Yilan", labelKey: "addCar.locationDescription.locations.yilan" },
  { value: "Hualien", labelKey: "addCar.locationDescription.locations.hualien" },
];

export const toCarForm = (car: Car): CarFormValues => ({
  brand: car.brand ?? "",
  model: car.model ?? "",
  year: car.year ?? "",
  pricePerDay: car.pricePerDay ?? "",
  category: car.category ?? "",
  transmission: car.transmission ?? "",
  fuel_type: car.fuel_type ?? "",
  seating_capacity: car.seating_capacity ?? "",
  location: car.location ?? "",
  description: car.description ?? "",
});

export const buildCarFormData = ({
  car,
  image,
  carId,
}: BuildCarFormDataParams): FormData => {
  const formData = new FormData();
  const carData = {
    ...car,
    year: Number(car.year),
    pricePerDay: Number(car.pricePerDay),
    seating_capacity: Number(car.seating_capacity),
  };

  if (image) {
    formData.append("image", image);
  }

  if (carId) {
    formData.append("carId", carId);
  }

  formData.append("carData", JSON.stringify(carData));
  return formData;
};
