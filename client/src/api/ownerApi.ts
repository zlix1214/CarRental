import { apiClient } from "./apiClient";
import type {
  CarsResponse,
  MutationResponse,
  OwnerCarResponse,
  OwnerDashboardResponse,
} from "../types/domain";

export const getOwnerCars = async (): Promise<CarsResponse> => {
  const { data } = await apiClient.get<CarsResponse>("/api/owner/cars");
  return data;
};

export const getOwnerCar = async (
  carId: string | undefined
): Promise<OwnerCarResponse> => {
  const { data } = await apiClient.get<OwnerCarResponse>(
    `/api/owner/car/${carId}`
  );
  return data;
};

export const addOwnerCar = async (
  formData: FormData
): Promise<MutationResponse> => {
  const { data } = await apiClient.post<MutationResponse>(
    "/api/owner/add-car",
    formData
  );
  return data;
};

export const updateOwnerCar = async (
  formData: FormData
): Promise<MutationResponse> => {
  const { data } = await apiClient.post<MutationResponse>(
    "/api/owner/update-car",
    formData
  );
  return data;
};

export const toggleOwnerCarAvailability = async (
  carId: string
): Promise<MutationResponse> => {
  const { data } = await apiClient.post<MutationResponse>(
    "/api/owner/toggle-car",
    { carId }
  );
  return data;
};

export const deleteOwnerCar = async (
  carId: string
): Promise<MutationResponse> => {
  const { data } = await apiClient.post<MutationResponse>(
    "/api/owner/delete-car",
    { carId }
  );
  return data;
};

export const getOwnerDashboard =
  async (): Promise<OwnerDashboardResponse> => {
    const { data } = await apiClient.get<OwnerDashboardResponse>(
      "/api/owner/dashboard"
    );
    return data;
  };
