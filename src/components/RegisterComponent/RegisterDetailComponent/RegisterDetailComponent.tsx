import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const navigate = useNavigate();

  // const fullAddress = `${address} ${addressDetail}`;

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/register-success");
    } catch (error) {
      console.error("회원가입 에러", error);
    }
  };

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
              <EmailInput
                type="text"
                placeholder="이메일"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <EmailCheckButton>인증요청</EmailCheckButton>
            </EmailInputArea>
            <PasswordInput
              type="password"
              placeholder="패스워드"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <PasswordCheckInput
              type="password"
              placeholder="패스워드 확인"
              value={passwordCheck}
              onChange={e => setPasswordCheck(e.target.value)}
            />
            <NameInput
              type="text"
              placeholder="이름"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <PhoneNumberInputArea>
              <PhoneNumberInput
                type="text"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
              <SendCertificationButton>인증요청</SendCertificationButton>
            </PhoneNumberInputArea>
            <CertificationCheckArea>
              <CertificationCheckInput type="text" placeholder="인증번호" />
              <CertificationCheckButton>확인</CertificationCheckButton>
            </CertificationCheckArea>
            <FindAdressArea>
              <FindAdressInput
                type="text"
                placeholder="주소"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <FindAdressButton>주소검색</FindAdressButton>
            </FindAdressArea>
            <FindAdressDetailInput
              type="text"
              placeholder="상세 주소"
              value={addressDetail}
              onChange={e => setAddressDetail(e.target.value)}
            />
            <SuccessButtonArea>
              <SuccessButton onClick={handleRegister}>다음</SuccessButton>
            </SuccessButtonArea>
          </InputContainer>
        </InnerContent>
      </InnerContainer>
    </Container>
  );
};

export default RegisterDetailComponent;
