import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import GlobalFont from "./styles/GlobalFont";
import Main from "./pages/Main/Main";
import MainDetail from "./pages/MainDetail/MainDetail";
import ShoppingBasket from "./pages/ShoppingBasket/ShoppingBasket";
import Login from "./pages/Login/Login";
import RegisterTerms from "./pages/Register/RegisterTerms";
import RegisterDetail from "./pages/Register/RegisterDetail";
import RegisterSuccess from "./pages/Register/RegisterSuccess";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/detail/:id", element: <MainDetail /> },
  { path: "/cart", element: <ShoppingBasket /> },
  { path: "/login", element: <Login /> },
  { path: "/register-terms", element: <RegisterTerms /> },
  { path: "/register-detail", element: <RegisterDetail /> },
  { path: "/register-success", element: <RegisterSuccess /> },
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
