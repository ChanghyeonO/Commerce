import React from "react";
import { Link } from "react-router-dom";
import FUNDITLOGO from "../../../assets/icons/FUNDIT.png";

import {
  Container,
  InnerContainer,
  MainLogoArea,
  MainLogo,
  IntroTextArea,
  IntroText,
  InnerContent,
  LoginButton,
} from "./RegisterSucesssComponentStyle";

const RegisterSuccessComponent = () => {
  return (
    <Container>
      <InnerContainer>
        <MainLogoArea>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </MainLogoArea>
        <IntroTextArea>
          <IntroText>회원가입 완료!</IntroText>
        </IntroTextArea>
        <InnerContent>
          <Link to="/login">
            <LoginButton>로그인</LoginButton>
          </Link>
        </InnerContent>
      </InnerContainer>
    </Container>
  );
};

export default RegisterSuccessComponent;
