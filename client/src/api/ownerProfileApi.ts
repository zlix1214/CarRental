import { apiClient } from "./apiClient";
import type { MutationResponse } from "../types/domain";

export const updateOwnerImage = async (
  image: File
): Promise<MutationResponse> => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await apiClient.post<MutationResponse>(
    "/api/owner/update-image",
    formData
  );
  return data;
};
