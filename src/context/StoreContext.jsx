import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { QK } from "../base/qk";
import { getMenuItems } from "../api/services/menuItems";
import { useSnackbar } from "notistack";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const {
    data: food_list,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QK.foodLists],
    queryFn: getMenuItems,
  });
  const { enqueueSnackbar } = useSnackbar();

  // Load cart items from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {}; // Parse or return empty object
  });

  // Save to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    enqueueSnackbar("Added to cart", { variant: "success" });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] === 1) {
        delete newCart[itemId]; // Remove if quantity is 1
      } else {
        newCart[itemId] -= 1;
      }
      return newCart;
    });
    enqueueSnackbar("Removed from cart", { variant: "warning" });
  };

  const getTotalQuantity = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  const getTotalCartAmount = () => {
    if (!food_list || food_list.length === 0) return 0;
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = food_list.find((product) => product.id === Number(id));
      return item ? total + parseFloat(item.price) * qty : total;
    }, 0);
  };

  const contextValue = {
    food_list,
    cartItems,
    isLoading,
    error,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
