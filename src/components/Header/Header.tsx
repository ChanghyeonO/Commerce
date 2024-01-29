import React from "react";
import { Link } from "react-router-dom";
import FUNDITLOGO from "../../assets/icons/FUNDITHEADERFOOTER.png";
import UserImage from "../../assets/icons/UserLogo.png";

import {
  Container,
  LeftContainer,
  MainLogo,
  RightContainer,
  LoginContent,
  LoginButton,
  RegisterButton,
  UserContent,
  UserLogo,
} from "./HeaderStyle";

const Header = () => {
  return (
    <Container>
      <LeftContainer>
        <Link to={"/"}>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </Link>
      </LeftContainer>
      <RightContainer>
        <LoginContent>
          <Link to={"/login"}>
            <LoginButton>로그인</LoginButton>
          </Link>
          |
          <Link to={"/register-terms"}>
            <RegisterButton>회원가입</RegisterButton>
          </Link>
        </LoginContent>
        <UserContent>
          <UserLogo src={UserImage} alt="유저 이미지" />
        </UserContent>
      </RightContainer>
    </Container>
  );
};

export default Header;
