import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/AuthRoute/ProtectedRoute";
import PublicRoute from "../components/AuthRoute/PublicRoute";
import Loading from "../components/Loading/Loading";

import Main from "../pages/Main/Main";
const FundingProduct = lazy(() => import("../pages/Product/FundingProduct"));
const OtherProduct = lazy(() => import("../pages/Product/OtherProduct"));
const FundingProductDetail = lazy(
  () => import("../pages/ProductDetail/FundingProductDetail"),
);
const OtherProductDetail = lazy(
  () => import("../pages/ProductDetail/OtherProductDetail"),
);
const FundingProductCreator = lazy(
  () => import("../pages/ProductCreator/FundingProductCreator"),
);
const OtherProductCreator = lazy(
  () => import("../pages/ProductCreator/OtherProductCreator"),
);
const CheckPassword = lazy(() => import("../pages/MyPage/CheckPassword"));
const EditProfile = lazy(() => import("../pages/MyPage/EditProfile"));
const OrderHistory = lazy(() => import("../pages/MyPage/OrderHistory"));
const ShoppingBasket = lazy(() => import("../pages/MyPage/ShoppingBasket"));
const DeleteAccount = lazy(() => import("../pages/MyPage/DeleteAccount"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Login = lazy(() => import("../pages/Login/Login"));
const FindEmail = lazy(() => import("../pages/FindAccount/FindEmail"));
const FindEmailSuccess = lazy(
  () => import("../pages/FindAccount/FindEmailSuccess"),
);
const FindPasswordSuccess = lazy(
  () => import("../pages/FindAccount/FindPasswordSuccess"),
);
const FindPassword = lazy(() => import("../pages/FindAccount/FindPassword"));
const RegisterTerms = lazy(() => import("../pages/Register/RegisterTerms"));
const RegisterDetail = lazy(() => import("../pages/Register/RegisterDetail"));
const RegisterSuccess = lazy(() => import("../pages/Register/RegisterSuccess"));

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  {
    path: "/funding",
    element: (
      <Suspense fallback={<Loading />}>
        <FundingProduct />
      </Suspense>
    ),
  },
  {
    path: "/other",
    element: (
      <Suspense fallback={<Loading />}>
        <OtherProduct />
      </Suspense>
    ),
  },
  {
    path: "/funding/detail/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <FundingProductDetail />
      </Suspense>
    ),
  },
  {
    path: "other/detail/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <OtherProductDetail />
      </Suspense>
    ),
  },
  {
    path: "/funding/create",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <FundingProductCreator />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "other/create",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <OtherProductCreator />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "mypage/check-password",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <CheckPassword />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "mypage/edit-profile",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "mypage/order-history",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <OrderHistory />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "mypage/cart",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <ShoppingBasket />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "mypage/delete-account",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <DeleteAccount />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "checkout",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/find-email",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <FindEmail />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/find-password",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <FindPassword />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/find-email/success",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <FindEmailSuccess />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/find-password/success",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <FindPasswordSuccess />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/register-terms",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <RegisterTerms />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/register-detail",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <RegisterDetail />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: "/register-success",
    element: (
      <Suspense fallback={<Loading />}>
        <PublicRoute>
          <RegisterSuccess />
        </PublicRoute>
      </Suspense>
    ),
  },
]);

export default router;
