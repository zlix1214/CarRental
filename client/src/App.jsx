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
import EditCar from "./pages/owner/EditCar";
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
              <Route path="edit-car/:carId" element={<EditCar />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
