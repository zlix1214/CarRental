import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import IOSGlassUIDemo from "./components/UiDemo";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBookings";
import Cars from "./pages/Cars";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import AddCar from "./pages/owner/AddCar";
import DashBoard from "./pages/owner/DashBoard";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  useEffect(() => {
    console.log(showLogin);
  }, [showLogin]);

  return (
    <div className="min-h-screen bg-black relative">
      <Toaster />

      {/* 背景光暈層 - 固定在視窗上 */}
      <div
        className="fixed inset-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* 左上角紫色光暈 */}
        <div
          className="absolute -top-1/4 -left-1/8 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(123, 75, 255, 0.75) 0%, rgba(123, 75, 255, 0.18) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* 右下角綠色光暈 */}
        <div
          className="absolute -bottom-1/4 -right-1/8 w-[900px] h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 255, 163, 0.6) 0%, rgba(0, 255, 163, 0.12) 35%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* 線條圖案 */}
        <div
          className="absolute inset-0 opacity-65"
          style={{
            backgroundImage: `repeating-linear-gradient(
              25deg,
              transparent,
              transparent 47px,
              rgba(255, 255, 255, 0.02) 47px,
              rgba(255, 255, 255, 0.02) 48px
            )`,
          }}
        />

        {/* 雜訊效果 */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* 主要內容區 - 在背景之上 */}
      <div className="relative" style={{ zIndex: 1 }}>
        {showLogin && <Login />}
        <Navbar />
        <div className="pt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car-details/:id" element={<CarDetails />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/owner" element={<Layout />}>
              <Route index element={<DashBoard />} />
              <Route path="add-car" element={<AddCar />} />
              <Route path="manage-cars" element={<ManageCars />} />
              <Route path="manage-bookings" element={<ManageBookings />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
