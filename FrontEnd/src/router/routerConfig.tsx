import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Main from "../pages/Main/Main";
import FundingProduct from "../pages/Product/FundingProduct";
import OtherProduct from "../pages/Product/OtherProduct";
import FundingProductDetail from "../pages/ProductDetail/FundingProductDetail";
import OtherProductDetail from "../pages/ProductDetail/OtherProductDetail";
import FundingProductCreator from "../pages/ProductCreator/FundingProductCreator";
import OtherProductCreator from "../pages/ProductCreator/OtherProductCreator";
import CheckPassword from "../pages/MyPage/CheckPassword";
import EditProfile from "../pages/MyPage/EditProfile";
import OrderHistory from "../pages/MyPage/OrderHistory";
import ShoppingBasket from "../pages/MyPage/ShoppingBasket";
import DeleteAccount from "../pages/MyPage/DeleteAccount";
import Checkout from "../pages/Checkout/Checkout";
import Login from "../pages/Login/Login";
import FindEmail from "../pages/FindAccount/FindEmail";
import FindEmailSuccess from "../pages/FindAccount/FindEmailSuccess";
import FindPasswordSuccess from "../pages/FindAccount/FindPasswordSuccess";
import FindPassword from "../pages/FindAccount/FindPassword";
import RegisterTerms from "../pages/Register/RegisterTerms";
import RegisterDetail from "../pages/Register/RegisterDetail";
import RegisterSuccess from "../pages/Register/RegisterSuccess";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/funding", element: <FundingProduct /> },
  { path: "/other", element: <OtherProduct /> },
  { path: "/funding/detail/:id", element: <FundingProductDetail /> },
  { path: "other/detail/:id", element: <OtherProductDetail /> },
  {
    path: "/funding/create",
    element: (
      <ProtectedRoute>
        <FundingProductCreator />
      </ProtectedRoute>
    ),
  },
  {
    path: "other/create",
    element: (
      <ProtectedRoute>
        <OtherProductCreator />
      </ProtectedRoute>
    ),
  },
  {
    path: "mypage/check-password",
    element: (
      <ProtectedRoute>
        <CheckPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "mypage/edit-profile",
    element: (
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "mypage/order-history",
    element: (
      <ProtectedRoute>
        <OrderHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "mypage/cart",
    element: (
      <ProtectedRoute>
        <ShoppingBasket />
      </ProtectedRoute>
    ),
  },
  {
    path: "mypage/delete-account",
    element: (
      <ProtectedRoute>
        <DeleteAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: "checkout",
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/find-email", element: <FindEmail /> },
  { path: "/find-password", element: <FindPassword /> },
  { path: "/find-email/success", element: <FindEmailSuccess /> },
  { path: "/find-password/success", element: <FindPasswordSuccess /> },
  { path: "/register-terms", element: <RegisterTerms /> },
  { path: "/register-detail", element: <RegisterDetail /> },
  { path: "/register-success", element: <RegisterSuccess /> },
]);

export default router;
