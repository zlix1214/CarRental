import React, { useState } from "react";
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

//TODO addCar 時候的預覽卡片
//TODO 首次List car的 條款確認畫面

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <Navbar />
      <div className="pt-20">
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
    </>
  );
};

export default App;
