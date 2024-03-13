import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  EmailInput,
  InnerContainer,
  InnerContent,
  InputContainer,
  IntroText,
  IntroTextArea,
  MainLogo,
  MainLogoArea,
  ButtonArea,
} from "./FindAccountStyle";
import FUNDITLOGO from "../../assets/icons/FUNDIT.png";
import DefaultButton from "../DefaultButton/DefaultButton";

const FindEmailSuccessComponent = () => {
  const location = useLocation();
  const { email } = location.state;
  return (
    <Container>
      <InnerContainer>
        <MainLogoArea>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </MainLogoArea>
        <IntroTextArea>
          <IntroText>이메일 찾기 성공</IntroText>
        </IntroTextArea>
        <InnerContent>
          <InputContainer>
            <EmailInput type="text" placeholder="이름" value={email} readOnly />
          </InputContainer>
          <ButtonArea>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <DefaultButton name="로그인" />
            </Link>
            <Link to="/find-password" style={{ textDecoration: "none" }}>
              <DefaultButton name="비밀번호 찾기" />
            </Link>
          </ButtonArea>
        </InnerContent>
      </InnerContainer>
    </Container>
  );
};

export default FindEmailSuccessComponent;
