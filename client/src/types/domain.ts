export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "owner";
  image?: string;
}

export interface Car {
  _id: string;
  owner?: string | User | null;
  brand: string;
  model: string;
  image: string;
  year: number;
  category: string;
  type?: string;
  seating_capacity: number;
  fuel_type: string;
  transmission: string;
  pricePerDay: number;
  location: string;
  description: string;
  isAvaliable: boolean;
  availableFrom?: string;
  availableTo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  _id: string;
  car: Car;
  user: User;
  owner: string | User;
  pickupDate: string;
  returnDate: string;
  status: "pending" | "confirmed" | "cancelled";
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface CurrentUserResponse {
  success: boolean;
  message?: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
}

export interface CarsResponse {
  success: boolean;
  message?: string;
  cars: Car[];
}

export interface OwnerCarResponse {
  success: boolean;
  message?: string;
  car: Car;
}

export interface BookingsResponse {
  success: boolean;
  message?: string;
  bookings: Booking[];
}

export interface UserBookingsResponse {
  success: boolean;
  message?: string;
  Bookings: Booking[];
}

export interface MutationResponse {
  success: boolean;
  message?: string;
}

export interface OwnerDashboardData {
  totalCars: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  recentBookings: Booking[];
  monthlyRevenue: number;
}

export interface OwnerDashboardResponse {
  success: boolean;
  message?: string;
  dashboardData: OwnerDashboardData;
}

export interface CreateBookingPayload {
  car: string;
  pickupDate: string;
  returnDate: string;
}

export interface ChangeBookingStatusPayload {
  bookingId: string;
  status: Booking["status"];
}
