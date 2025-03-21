import { createBrowserRouter } from "react-router-dom";
import RestaurantDetails from "../components/RestaurantDetails/RestaurantDetails";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Items from "../pages/Items/Items";
import Restaurant from "../pages/Restaurant/Restaurant";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/restaurants",
        element: <Restaurant></Restaurant>,
      },
      {
        path: "/restaurants/:id",
        element: <RestaurantDetails></RestaurantDetails>,
      },
      {
        path: "/items",
        element: <Items></Items>,
      },
    ],
  },
]);
