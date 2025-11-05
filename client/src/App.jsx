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
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="add-car" element={<AddCar />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
