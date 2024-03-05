import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { SortProvider } from "./contexts/SortContext";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyles from "./styles/GlobalStyles";
import GlobalFont from "./styles/GlobalFont";
import Main from "./pages/Main/Main";
import FundingProduct from "./pages/Product/FundingProduct";
import OtherProduct from "./pages/Product/OtherProduct";
import FundingProductCreator from "./pages/ProductCreator/FundingProductCreator";
import OtherProductCreator from "./pages/ProductCreator/OtherProductCreator";
import FundingProductDetail from "./pages/ProductDetail/FundingProductDetail";
import OtherProductDetail from "./pages/ProductDetail/OtherProductDetail";
import EditProfile from "./pages/MyPage/EditProfile";
import OrderHistory from "./pages/MyPage/OrderHistory";
import ShoppingBasket from "./pages/MyPage/ShoppingBasket";
import DeleteAccount from "./pages/MyPage/DeleteAccount";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import RegisterTerms from "./pages/Register/RegisterTerms";
import RegisterDetail from "./pages/Register/RegisterDetail";
import RegisterSuccess from "./pages/Register/RegisterSuccess";
import CheckPassword from "./pages/MyPage/CheckPassword";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/funding", element: <FundingProduct /> },
  { path: "/other", element: <OtherProduct /> },
  { path: "/funding/detail/:id", element: <FundingProductDetail /> },
  { path: "other/detail/:id", element: <OtherProductDetail /> },
  { path: "/funding/create", element: <FundingProductCreator /> },
  { path: "other/create", element: <OtherProductCreator /> },
  { path: "mypage/check-password", element: <CheckPassword /> },
  { path: "mypage/edit-profile", element: <EditProfile /> },
  { path: "mypage/order-history", element: <OrderHistory /> },
  { path: "mypage/cart", element: <ShoppingBasket /> },
  { path: "mypage/delete-account", element: <DeleteAccount /> },
  { path: "checkout", element: <Checkout /> },
  { path: "/login", element: <Login /> },
  { path: "/register-terms", element: <RegisterTerms /> },
  { path: "/register-detail", element: <RegisterDetail /> },
  { path: "/register-success", element: <RegisterSuccess /> },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <SortProvider>
            <GlobalStyles />
            <GlobalFont />
            <RouterProvider router={router} />
          </SortProvider>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
