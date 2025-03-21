import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUserProfile";

const Navbar = ({ setShowLogin }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const profile = useUserProfile();
  const [menu, setMenu] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("userInfo");
    window.location.href("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/items"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Items
        </Link>
        <Link
          to="restaurants"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Restaurants
        </Link>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search_icon" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>
          <div className={totalQuantity === 0 ? "dotHidden" : "dot"}>
            <p>{totalQuantity}</p>
          </div>
        </div>
        {profile ? (
          <div className="profile-dropdown">
            <button onClick={handleDropdownToggle}>{profile.username}</button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {profile.role === "user" && (
                  <Link
                    to={`orders/${profile.id}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                )}
                {profile.role === "restaurant_owner" && (
                  <Link to="/dashboard" onClick={() => setDropdownOpen(false)}>
                    Dashboard
                  </Link>
                )}
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
