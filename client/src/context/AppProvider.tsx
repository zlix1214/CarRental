import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/apiClient";
import { getErrorMessage } from "../api/getErrorMessage";
import { getAvailableCars, getCurrentUser } from "../api/userApi";
import { authScopedQueryKeys, queryKeys } from "../queries/queryKeys";
import type { Car, CarsResponse, User } from "../types/domain";
import { AppContext } from "./appContext";

interface AppProviderProps {
  children: ReactNode;
}

const readStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setAuthToken(storedToken);
  }
  return storedToken;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [token, setTokenState] = useState<string | null>(readStoredToken);
  const [user, setUser] = useState<User | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isInitialized, setIsInitialized] = useState(!token);

  const {
    data: carsResponse,
    error: carsError,
    refetch: refetchCars,
  } = useQuery({
    queryKey: queryKeys.cars,
    queryFn: getAvailableCars,
  });

  const currentUserQuery = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: getCurrentUser,
    enabled: Boolean(token),
    retry: false,
  });

  const setToken: Dispatch<SetStateAction<string | null>> = useCallback(
    (nextToken) => {
      setTokenState((currentToken) => {
        const resolvedToken =
          typeof nextToken === "function"
            ? nextToken(currentToken)
            : nextToken;

        setAuthToken(resolvedToken);
        return resolvedToken;
      });
    },
    []
  );

  const cars = useMemo(
    () => (carsResponse?.success ? carsResponse.cars : []),
    [carsResponse]
  );

  const setCars: Dispatch<SetStateAction<Car[]>> = useCallback(
    (nextCars) => {
      queryClient.setQueryData<CarsResponse>(queryKeys.cars, (currentData) => {
        const currentCars = currentData?.success ? currentData.cars : [];
        const resolvedCars =
          typeof nextCars === "function" ? nextCars(currentCars) : nextCars;

        return {
          success: true,
          message: currentData?.message,
          cars: resolvedCars,
        };
      });
    },
    [queryClient]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    setIsInitialized(true);
    authScopedQueryKeys.forEach((queryKey) => {
      queryClient.removeQueries({ queryKey });
    });
    toast.success("You have been logged out");
    navigate("/");
  }, [navigate, queryClient, setToken]);

  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsOwner(false);
      return null;
    }

    try {
      const data = await queryClient.fetchQuery({
        queryKey: queryKeys.currentUser,
        queryFn: getCurrentUser,
      });

      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
        return data.user;
      }

      logout();
      return null;
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error(getErrorMessage(error));
      if (isAxiosError(error) && error.response?.status === 401) {
        logout();
      }
      return null;
    }
  }, [logout, queryClient, token]);

  const fetchCars = useCallback(async () => {
    const { data } = await refetchCars();

    if (data?.success) {
      return data.cars;
    }

    if (data?.message) toast.error(data.message);
    return [];
  }, [refetchCars]);

  useEffect(() => {
    if (!token) {
      setAuthToken(null);
      setUser(null);
      setIsOwner(false);
      setIsInitialized(true);
    }
  }, [token]);

  useEffect(() => {
    if (!currentUserQuery.data) return;

    if (currentUserQuery.data.success) {
      setUser(currentUserQuery.data.user);
      setIsOwner(currentUserQuery.data.user.role === "owner");
      setIsInitialized(true);
      return;
    }

    setIsInitialized(true);
    logout();
  }, [currentUserQuery.data, logout]);

  useEffect(() => {
    if (!currentUserQuery.error) return;

    setIsInitialized(true);
    toast.error(getErrorMessage(currentUserQuery.error));

    if (
      isAxiosError(currentUserQuery.error) &&
      currentUserQuery.error.response?.status === 401
    ) {
      logout();
    }
  }, [currentUserQuery.error, logout]);

  useEffect(() => {
    if (carsResponse && !carsResponse.success) {
      toast.error(carsResponse.message || "Failed to load cars");
    }
  }, [carsResponse]);

  useEffect(() => {
    if (carsError) {
      toast.error(getErrorMessage(carsError));
    }
  }, [carsError]);

  const value = {
    navigate,
    currency,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    isInitialized,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
