import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../api/firebase";
import { signOut } from "firebase/auth";
import { useUser } from "../../contexts/UserContext";
import FUNDITLOGO from "../../assets/icons/FUNDITHEADERFOOTER.png";
import UserImage from "../../assets/icons/UserLogo.png";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";

import {
  Container,
  LeftContainer,
  MainLogo,
  PageLinkButton,
  RightContainer,
  LoginContent,
  LoginLogoutButton,
  RegisterButton,
  UserContent,
  UserLogo,
  CartItemCount,
} from "./HeaderStyle";

const Header = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const getCartItemCount = () => {
      const fundingItemsCart = JSON.parse(
        sessionStorage.getItem("fundingItemsCart") || "[]",
      );
      const otherItemsCart = JSON.parse(
        sessionStorage.getItem("otherItemsCart") || "[]",
      );
      const totalItemCount = fundingItemsCart.length + otherItemsCart.length;
      setCartItemsCount(totalItemCount);
    };

    window.addEventListener("storage", getCartItemCount);
    window.addEventListener("sessionStorageChanged", getCartItemCount);

    getCartItemCount();

    return () => {
      window.removeEventListener("storage", getCartItemCount);
      window.removeEventListener("sessionStorageChanged", getCartItemCount);
    };
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire(
      alertList.doubleCheckMessage("로그아웃 하시겠습니까?"),
    );
    if (result.isConfirmed) {
      try {
        await signOut(auth);
        Swal.fire(alertList.successMessage("로그아웃 되었습니다."));
        navigate("/");
      } catch (error) {
        console.error("로그아웃 실패:", error);
        Swal.fire(alertList.errorMessage("로그아웃에 실패했습니다."));
      }
    }
  };

  return (
    <Container>
      <LeftContainer>
        <Link to={"/"}>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </Link>
        <Link to={"/funding"}>
          <PageLinkButton>펀딩 상품 모아보기</PageLinkButton>
        </Link>
        <Link to={"/other"}>
          <PageLinkButton>기타 상품 모아보기</PageLinkButton>
        </Link>
      </LeftContainer>
      <RightContainer>
        {user ? (
          <LoginContent>
            <LoginLogoutButton onClick={handleLogout}>
              로그아웃
            </LoginLogoutButton>
            <UserContent>
              <Link to={"/mypage/check-password"}>
                <UserLogo src={UserImage} alt="유저 이미지" />
                {cartItemsCount > 0 && (
                  <CartItemCount>{cartItemsCount}</CartItemCount>
                )}
              </Link>
            </UserContent>
          </LoginContent>
        ) : (
          <LoginContent>
            <Link to={"/login"}>
              <LoginLogoutButton>로그인</LoginLogoutButton>
            </Link>
            |
            <Link to={"/register-terms"}>
              <RegisterButton>회원가입</RegisterButton>
            </Link>
          </LoginContent>
        )}
      </RightContainer>
    </Container>
  );
};

export default Header;
