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

const FindAccountSuccessComponent = () => {
  const location = useLocation();

  const successType = location.pathname.includes("/find-email/success")
    ? "emailSuccess"
    : location.pathname.includes("/find-password/success")
    ? "passwordSuccess"
    : null;

  const getMessage = () => {
    switch (successType) {
      case "emailSuccess":
        return "이메일 찾기 성공!";
      case "passwordSuccess":
        return "비밀번호 재설정 이메일 전송 완료!";
      default:
        return "성공!";
    }
  };

  const email = location.state?.email || "이메일 정보 없음";

  return (
    <Container>
      <InnerContainer>
        <MainLogoArea>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </MainLogoArea>
        <IntroTextArea>
          <IntroText>{getMessage()}</IntroText>
        </IntroTextArea>
        <InnerContent>
          {successType === "emailSuccess" && (
            <InputContainer>
              <EmailInput
                type="text"
                placeholder="이메일"
                value={email}
                readOnly
              />
            </InputContainer>
          )}
          <ButtonArea>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <DefaultButton name="로그인" />
            </Link>
            {successType === "emailSuccess" ? (
              <Link to="/find-password" style={{ textDecoration: "none" }}>
                <DefaultButton name="비밀번호 찾기" />
              </Link>
            ) : (
              <Link to="/find-email" style={{ textDecoration: "none" }}>
                <DefaultButton name="이메일 찾기" />
              </Link>
            )}
          </ButtonArea>
        </InnerContent>
      </InnerContainer>
    </Container>
  );
};

export default FindAccountSuccessComponent;
