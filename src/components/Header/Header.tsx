import React from "react";

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
        <MainLogo />
      </LeftContainer>
      <RightContainer>
        <LoginContent>
          <LoginButton>로그인</LoginButton> |
          <RegisterButton>회원가입</RegisterButton>
        </LoginContent>
        <UserContent>
          <UserLogo />
        </UserContent>
      </RightContainer>
    </Container>
  );
};

export default Header;
