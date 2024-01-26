import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import GlobalFont from "./styles/GlobalFont";
import Login from "./pages/Login/Login";
import RegisterTerms from "./pages/Register/RegisterTerms";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register-terms", element: <RegisterTerms /> },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <GlobalStyles />
      <GlobalFont />
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
