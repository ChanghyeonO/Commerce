import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
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
} from "./FindAccountStyle";
import Loading from "../Loading/Loading";
import FUNDITLOGO from "../../assets/icons/FUNDIT.png";
import DefaultButton from "../DefaultButton/DefaultButton";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const FindEmailComponent = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setLoading(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        navigate("/find-password/success");
      })
      .catch((error) => {
        console.error("비밀번호 재설정 이메일 전송 에러", error);
        Swal.fire(alertList.errorMessage("이메일 전송에 실패했습니다."));
        setLoading(false);
      });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleResetPassword();
    }
  };

  return (
    <Container>
      <InnerContainer>
        <MainLogoArea>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </MainLogoArea>
        <IntroTextArea>
          <IntroText>비밀번호 찾기</IntroText>
        </IntroTextArea>
        <InnerContent>
          <InputContainer>
            <EmailInput
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </InputContainer>
          <DefaultButton name="비밀번호 찾기" onClick={handleResetPassword} />
        </InnerContent>
        {loading && <Loading />}
      </InnerContainer>
    </Container>
  );
};

export default FindEmailComponent;
