import { apiClient } from "./apiClient";
import type { CarsResponse, CurrentUserResponse } from "../types/domain";

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const { data } = await apiClient.get<CurrentUserResponse>("/api/user/data");
  return data;
};

export const getAvailableCars = async (): Promise<CarsResponse> => {
  const { data } = await apiClient.get<CarsResponse>("/api/user/cars");
  return data;
};
