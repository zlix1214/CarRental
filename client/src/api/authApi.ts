import { apiClient } from "./apiClient";
import type { AuthResponse } from "../types/domain";

export interface AuthPayload {
  name?: string;
  email: string;
  password: string;
}

export type AuthMode = "login" | "register";

export const submitAuth = async (
  mode: AuthMode,
  payload: AuthPayload
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    `/api/user/${mode}`,
    payload
  );
  return data;
};
