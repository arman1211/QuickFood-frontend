import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRestaurant } from "../../api/services/resturent";
import "./RestaurantDetails.css";
import resturant from "../../assets/restaurant.jpg";
import food from "../../assets/food_1.png";
import { assets } from "../../assets/assets"; // Corrected import
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const RestaurantDetails = () => {
  const { id } = useParams();
  const { data: restaurant, isLoading } = useQuery(
    ["restaurant", id],
    () => getRestaurant(id),
    { enabled: !!id }
  );
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  if (isLoading)
    return <p className="loading-text">Loading restaurant details...</p>;
  if (!restaurant) return <p className="loading-text">Restaurant not found!</p>;

  return (
    <div className="restaurant-details-container">
      <div className="restaurant-info">
        <img
          src={restaurant.image || resturant}
          alt={restaurant.name}
          className="restaurant-banner"
        />
        <h2 className="restaurant-name">{restaurant.name}</h2>
        <p className="restaurant-description">{restaurant.description}</p>
        <p className="restaurant-location">
          <strong>Location:</strong> {restaurant.location}
        </p>
      </div>

      {/* Menu Items */}
      <h3 className="menu-title">Menu Items</h3>
      {restaurant.menu_items.length > 0 ? (
        <div className="menu-list">
          {restaurant.menu_items.map((item) => (
            <FoodItem
              key={item.id}
              id={item.id}
              image={item.image}
              price={item.price}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <p className="no-menu-text">No menu items available.</p>
      )}
    </div>
  );
};

export default RestaurantDetails;
