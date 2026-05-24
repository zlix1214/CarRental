import { apiClient } from "./apiClient";
import type {
  BookingsResponse,
  ChangeBookingStatusPayload,
  CreateBookingPayload,
  MutationResponse,
  UserBookingsResponse,
} from "../types/domain";

export const getUserBookings = async (): Promise<UserBookingsResponse> => {
  const { data } = await apiClient.get<UserBookingsResponse>(
    "/api/bookings/user"
  );
  return data;
};

export const createBooking = async ({
  car,
  pickupDate,
  returnDate,
}: CreateBookingPayload): Promise<MutationResponse> => {
  const { data } = await apiClient.post<MutationResponse>(
    "/api/bookings/create",
    {
      car,
      pickupDate,
      returnDate,
    }
  );
  return data;
};

export const getOwnerBookings = async (): Promise<BookingsResponse> => {
  const { data } = await apiClient.get<BookingsResponse>("/api/bookings/owner");
  return data;
};

export const changeOwnerBookingStatus = async ({
  bookingId,
  status,
}: ChangeBookingStatusPayload): Promise<MutationResponse> => {
  const { data } = await apiClient.post<MutationResponse>(
    "/api/bookings/change-status",
    {
      bookingId,
      status,
    }
  );
  return data;
};
