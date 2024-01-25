import React from "react";
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
        <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
      </LeftContainer>
      <RightContainer>
        <LoginContent>
          <LoginButton>로그인</LoginButton> |
          <RegisterButton>회원가입</RegisterButton>
        </LoginContent>
        <UserContent>
          <UserLogo src={UserImage} alt="유저 이미지" />
        </UserContent>
      </RightContainer>
    </Container>
  );
};

export default Header;
