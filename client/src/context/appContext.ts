import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { NavigateFunction } from "react-router-dom";
import type { Car, User } from "../types/domain";

export interface AppContextValue {
  navigate: NavigateFunction;
  currency: string;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  isOwner: boolean;
  setIsOwner: Dispatch<SetStateAction<boolean>>;
  fetchUser: () => Promise<User | null>;
  showLogin: boolean;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  fetchCars: () => Promise<Car[]>;
  cars: Car[];
  setCars: Dispatch<SetStateAction<Car[]>>;
  pickupDate: string;
  setPickupDate: Dispatch<SetStateAction<string>>;
  returnDate: string;
  setReturnDate: Dispatch<SetStateAction<string>>;
  isInitialized: boolean;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
};
