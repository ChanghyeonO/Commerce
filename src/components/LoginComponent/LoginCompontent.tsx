import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import FUNDITLOGO from "../../assets/icons/FUNDIT.png";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("로그인 성공:", userCredential.user);
      alert("로그인 성공!");
    } catch (error) {
      console.error("로그인 에러", error);
      alert("로그인 실패");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <MainLogoArea>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </MainLogoArea>
        <IntroTextArea>
          <IntroText>만나서 반가워요!</IntroText>
        </IntroTextArea>
        <InnerContent>
          <InputContainer>
            <EmailInput
              type="text"
              placeholder="이메일"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <PasswordInput
              type="password"
              placeholder="패스워드"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </InputContainer>
          <FindAccountArea>
            <FindEmail>이메일</FindEmail>|<FindPassword>비밀번호</FindPassword>
            찾기
          </FindAccountArea>
          <LoginButtonArea>
            <DefaultLoginButton onClick={handleLogin}>
              로그인
            </DefaultLoginButton>
            <GoogleLoginButton />
          </LoginButtonArea>
          <RegisterArea>
            <Link to="/register-terms">
              <RegisterButton>회원가입</RegisterButton>
            </Link>
          </RegisterArea>
        </InnerContent>
      </InnerContainer>
    </Container>
  );
};

export default LoginComponent;
