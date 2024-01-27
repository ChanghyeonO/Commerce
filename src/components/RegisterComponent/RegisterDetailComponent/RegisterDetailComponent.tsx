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
  InputContainer,
  EmailInputArea,
  EmailInput,
  EmailCheckButton,
  PasswordInput,
  PasswordCheckInput,
  NameInput,
  PhoneNumberInputArea,
  PhoneNumberInput,
  SendCertificationButton,
  CertificationCheckArea,
  CertificationCheckInput,
  CertificationCheckButton,
  FindAdressArea,
  FindAdressInput,
  FindAdressButton,
  FindAdressDetailInput,
  SuccessButtonArea,
  SuccessButton,
} from "./RegisterDetailComponentStyle";

const RegisterDetailComponent = () => {
  return (
    <Container>
      <InnerContainer>
        <MainLogoArea>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </MainLogoArea>
        <IntroTextArea>
          <IntroText>회원가입</IntroText>
        </IntroTextArea>
        <InnerContent>
          <InputContainer>
            <EmailInputArea>
              <EmailInput type="text" placeholder="이메일" />
              <EmailCheckButton>인증요청</EmailCheckButton>
            </EmailInputArea>
            <PasswordInput type="password" placeholder="패스워드" />
            <PasswordCheckInput type="password" placeholder="패스워드 확인" />
            <NameInput type="text" placeholder="이름" />
            <PhoneNumberInputArea>
              <PhoneNumberInput type="text" placeholder="전화번호" />
              <SendCertificationButton>인증요청</SendCertificationButton>
            </PhoneNumberInputArea>
            <CertificationCheckArea>
              <CertificationCheckInput type="text" placeholder="인증번호" />
              <CertificationCheckButton>확인</CertificationCheckButton>
            </CertificationCheckArea>
            <FindAdressArea>
              <FindAdressInput type="text" placeholder="주소" readOnly />
              <FindAdressButton>주소검색</FindAdressButton>
            </FindAdressArea>
            <FindAdressDetailInput type="text" placeholder="상세 주소" />
            <SuccessButtonArea>
              <Link to="/register-success">
                <SuccessButton>다음</SuccessButton>
              </Link>
            </SuccessButtonArea>
          </InputContainer>
        </InnerContent>
      </InnerContainer>
    </Container>
  );
};

export default RegisterDetailComponent;
