import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import queryClient from "./base/QueryClient.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
