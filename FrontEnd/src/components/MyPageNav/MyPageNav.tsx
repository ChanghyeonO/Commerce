import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  TopArea,
  EditProfile,
  ShoppingBasket,
  OrderHistory,
  DeleteAccount,
} from "./MyPageNavStyle";

const MyPageNav = () => {
  return (
    <Container>
      <TopArea>
        <Link to={"/mypage/check-password"}>
          <EditProfile>프로필 수정</EditProfile>
        </Link>
        <Link to={"/mypage/cart"}>
          <ShoppingBasket>장바구니</ShoppingBasket>
        </Link>
        <Link to={"/mypage/order-history"}>
          <OrderHistory>주문내역</OrderHistory>
        </Link>
      </TopArea>
      <Link to={"mypage/delete-account"}>
        <DeleteAccount>회원탈퇴</DeleteAccount>
      </Link>
    </Container>
  );
};

export default MyPageNav;
