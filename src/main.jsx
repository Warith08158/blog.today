import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../src/Toastify/Toast.jsx";
import UserProvider from "./context/UserContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <Toast />
    </UserProvider>
  </React.StrictMode>
);
