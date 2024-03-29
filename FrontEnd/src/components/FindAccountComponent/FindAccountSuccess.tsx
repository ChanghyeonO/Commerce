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
import { FindAccountComponentProps } from "../../types/PagePropsType";

const FindAccountSuccessComponent = ({
  pageType,
}: FindAccountComponentProps) => {
  const location = useLocation();
  const email = location.state?.email || "이메일 정보 없음";

  const getMessage = () => {
    switch (pageType) {
      case "email":
        return "이메일 찾기 성공!";
      case "password":
        return "비밀번호 재설정 이메일 전송 완료!";
      default:
        return "성공!";
    }
  };

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
          {pageType === "email" && (
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
            {pageType === "email" ? (
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
