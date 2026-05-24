export const queryKeys = {
  cars: ["cars"] as const,
  currentUser: ["currentUser"] as const,
  userBookings: ["user", "bookings"] as const,
  ownerCars: ["owner", "cars"] as const,
  ownerCar: (carId: string | undefined) => ["owner", "cars", carId] as const,
  ownerBookings: ["owner", "bookings"] as const,
  ownerDashboard: ["owner", "dashboard"] as const,
};

export const authScopedQueryKeys = [
  queryKeys.currentUser,
  queryKeys.userBookings,
  queryKeys.ownerCars,
  queryKeys.ownerBookings,
  queryKeys.ownerDashboard,
] as const;
