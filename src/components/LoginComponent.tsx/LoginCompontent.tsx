import React from "react";

import {
  Container,
  InnerContainer,
  MainLogoArea,
  MainLogo,
  IntroTextArea,
  IntroText,
  InnerContent,
  InputContainer,
  EmailInput,
  PasswordInput,
  LoginButtonArea,
  DefaultLoginButton,
  GoogleLoginButton,
  RegisterArea,
  RegisterButton,
  FindAccountArea,
  FindEmail,
  FindPassword,
} from "./LoginComponentStyle";

const LoginComponent = () => {
  return (
    <Container>
      <InnerContainer>
        <MainLogoArea>
          <MainLogo />
        </MainLogoArea>
        <IntroTextArea>
          <IntroText>만나서 반가워요!</IntroText>
        </IntroTextArea>
        <InnerContent>
          <InputContainer>
            <EmailInput type="text" placeholder="example@example.com" />
            <PasswordInput type="password" placeholder="password" />
          </InputContainer>
          <FindAccountArea>
            <FindEmail>이메일</FindEmail>|<FindPassword>비밀번호</FindPassword>
            찾기
          </FindAccountArea>
          <LoginButtonArea>
            <DefaultLoginButton>로그인</DefaultLoginButton>
            <GoogleLoginButton>구글 로그인</GoogleLoginButton>
          </LoginButtonArea>
          <RegisterArea>
            <RegisterButton>회원가입</RegisterButton>
          </RegisterArea>
        </InnerContent>
      </InnerContainer>
    </Container>
  );
};

export default LoginComponent;
