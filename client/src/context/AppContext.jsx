import { createContext, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isInitialized, setIsInitialized] = useState(false); // 新增:追蹤初始化狀態
  const [cars, setCars] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        // 如果獲取用戶失敗,清除 token
        logout();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error(error.response?.data?.message || error.message);
      // 如果是授權錯誤,清除 token
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("You have been logged out");
    navigate("/");
  };

  // 合併初始化邏輯到一個 useEffect
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        // 先設置 axios header
        axios.defaults.headers.common["Authorization"] = `${storedToken}`;
        // 再設置 token state
        setToken(storedToken);
        // 獲取用戶資料
        await fetchUser();
      }
      await fetchCars();
      // 標記初始化完成
      setIsInitialized(true);
    };

    initializeAuth();
  }, []); // 只在組件掛載時執行一次

  const value = {
    navigate,
    currency,
    axios,
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
    isInitialized, // 新增:供其他組件使用
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
