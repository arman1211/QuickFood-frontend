import React, { useState } from "react";
import { useQuery } from "react-query";
import { QK } from "../../base/qk";
import { getRestaurants } from "../../api/services/resturent";
import "./Restaurant.css";
import resturant from "../../assets/restaurant.jpg";
import { Link } from "react-router-dom";

const Restaurant = () => {
  const { data: restaurants, isLoading } = useQuery(
    [QK.restaurants],
    getRestaurants
  );
  console.log(restaurants);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = restaurants?.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="restaurant-container">
      <h2 className="restaurant-title">Discover Restaurants</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a restaurant..."
        className="search-box"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Restaurants List */}
      {isLoading ? (
        <p className="loading-text">Loading restaurants...</p>
      ) : (
        <div className="restaurant-list">
          {filteredRestaurants?.map((restaurant) => (
            <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
              <div className="restaurant-card">
                <img
                  src={restaurant.image || resturant}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="restaurant-details">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-description">
                    {restaurant.description}
                  </p>
                  <p className="restaurant-location">{restaurant.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurant;
