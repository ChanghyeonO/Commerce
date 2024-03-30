import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import {
  Container,
  NameInput,
  InnerContainer,
  InnerContent,
  InputContainer,
  IntroText,
  IntroTextArea,
  MainLogo,
  MainLogoArea,
  PasswordInput,
} from "./FindAccountStyle";
import Loading from "../Loading/Loading";
import FUNDITLOGO from "../../assets/icons/FUNDIT.png";
import DefaultButton from "../DefaultButton/DefaultButton";

const FindEmailComponent = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    const firstPart = numbers.slice(0, 3);
    const secondPart = numbers.slice(3, 7);
    const thirdPart = numbers.slice(7, 11);

    let formattedValue = firstPart;
    if (secondPart) {
      formattedValue += `-${secondPart}`;
    }
    if (thirdPart) {
      formattedValue += `-${thirdPart}`;
    }

    return formattedValue;
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const pattern = /^\d{3}-\d{3,4}-\d{4}$/;
    return pattern.test(phoneNumber);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleFindEmail = () => {
    if (!name) {
      Swal.fire(alertList.infoMessage("가입 시 입력했던 이름을 작성해주세요."));
      return;
    } else if (!phoneNumber) {
      Swal.fire(
        alertList.infoMessage("가입 시 입력했던 전화번호를 작성해주세요."),
      );
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Swal.fire(alertList.infoMessage("전화번호 형식이 올바르지 않습니다."));
      return;
    }

    setLoading(true);
    axios
      .post(
        "https://us-central1-commerce-204d5.cloudfunctions.net/getUserEmail",
        {
          name: name,
          phoneNumber: phoneNumber,
        },
      )
      .then((response) => {
        setLoading(false);
        navigate("/find-email/success", {
          state: { email: response.data.email },
        });
      })
      .catch((error) => {
        Swal.fire(alertList.errorMessage(error));
        setLoading(false);
      });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleFindEmail();
    }
  };

  return (
    <Container>
      <InnerContainer>
        <MainLogoArea>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </MainLogoArea>
        <IntroTextArea>
          <IntroText>이메일 찾기</IntroText>
        </IntroTextArea>
        <InnerContent>
          <InputContainer>
            <NameInput
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <PasswordInput
              type="text"
              placeholder="전화번호"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onKeyDown={handleKeyPress}
            />
          </InputContainer>
          <DefaultButton name="이메일 찾기" onClick={handleFindEmail} />
        </InnerContent>
        {loading && <Loading />}
      </InnerContainer>
    </Container>
  );
};

export default FindEmailComponent;
