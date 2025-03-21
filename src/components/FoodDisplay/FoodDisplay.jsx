import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, isLoading, error } = useContext(StoreContext);

  if (isLoading) return <p>Loading food items...</p>;
  if (error) return <p>Failed to fetch food items</p>;

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {food_list &&
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default FoodDisplay;
