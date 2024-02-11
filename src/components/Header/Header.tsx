import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import FUNDITLOGO from "../../assets/icons/FUNDITHEADERFOOTER.png";
import UserImage from "../../assets/icons/UserLogo.png";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";

import {
  Container,
  LeftContainer,
  MainLogo,
  RightContainer,
  LoginContent,
  LoginLogoutButton,
  RegisterButton,
  UserContent,
  UserLogo,
} from "./HeaderStyle";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
    });
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Swal.fire(alertList.successMessage("로그아웃 되었습니다."));
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      Swal.fire(alertList.errorMessage("로그아웃에 실패했습니다."));
    }
  };

  return (
    <Container>
      <LeftContainer>
        <Link to={"/"}>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </Link>
      </LeftContainer>
      <RightContainer>
        {isLoggedIn ? (
          <LoginContent>
            <LoginLogoutButton onClick={handleLogout}>
              로그아웃
            </LoginLogoutButton>
            <UserContent>
              <UserLogo src={UserImage} alt="유저 이미지" />
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
