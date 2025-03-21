import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Restaurant from "./pages/Restaurant/Restaurant";
import RestaurantDetails from "./components/RestaurantDetails/RestaurantDetails";
import Items from "./pages/Items/Items";
import OrderProfile from "./pages/OrderProfile/OrderProfile";
import DashboardLayout from "./layouts/DashboardLayouts";
import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Login Popup */}
      {showLogin && (
        <LoginPopup
          open={setShowLogin}
          handleClose={() => setShowLogin(false)}
        />
      )}

      <Routes>
        {/* Normal Layout Pages (Navbar + Footer) */}
        <Route
          path="/*"
          element={
            <>
              <Navbar setShowLogin={setShowLogin} />
              <div className="app">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/items" element={<Items />} />
                  <Route path="/restaurants" element={<Restaurant />} />
                  <Route path="/dashboard" element={<OwnerDashboard />} />

                  <Route
                    path="/restaurants/:id"
                    element={<RestaurantDetails />}
                  />
                  <Route path="/order" element={<PlaceOrder />} />
                  <Route path="/orders/:id" element={<OrderProfile />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;
