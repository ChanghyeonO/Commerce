import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../api/firebase";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import Swal from "sweetalert2";
import alertList from "../../../utils/Swal";
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
  WarningMessage,
  EmailInput,
  PasswordInput,
  PasswordCheckInput,
  NameInput,
  PhoneNumberInputArea,
  PhoneNumberInput,
  FindAdressArea,
  FindAdressInput,
  FindAdressButton,
  FindAdressDetailInput,
  SuccessButtonArea,
  SuccessButton,
} from "./RegisterDetailComponentStyle";

const RegisterDetailComponent = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    if (!validateEmail(emailInput) && emailInput !== "") {
      setEmailError("*인증 후 로그인이 가능하니 형식에 맞게 작성해주세요.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
    if (!validatePassword(passwordInput)) {
      setPasswordError("*패스워드는 8자 이상, 특수문자를 포함해주세요.");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordCheckInput = e.target.value;
    setPasswordCheck(passwordCheckInput);
    if (password !== passwordCheckInput) {
      setPasswordCheckError("*패스워드를 다시 확인해주세요.");
    } else {
      setPasswordCheckError("");
    }
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    let formattedInput = "";

    if (input.length > 3) {
      if (input.length <= 7) {
        formattedInput = `${input.slice(0, 3)}-${input.slice(3)}`;
      } else {
        formattedInput = `${input.slice(0, 3)}-${input.slice(
          3,
          7,
        )}-${input.slice(7, 11)}`;
      }
    } else {
      formattedInput = input;
    }

    setPhoneNumber(formattedInput);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setEmailError("*인증 후 로그인이 가능하니 형식에 맞게 작성해주세요.");
      return;
    } else if (!validatePassword(password)) {
      setPasswordError("*패스워드는 8자 이상, 특수문자를 포함해주세요.");
      return;
    } else if (password !== passwordCheck) {
      setPasswordCheckError("*패스워드를 다시 확인해주세요.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      Swal.fire(
        alertList.successMessage(
          "회원가입 성공! 인증 이메일이 발송되었습니다.",
        ),
      );
      navigate("/register-success");
    } catch (error) {
      let errorMessage = "회원가입 중 오류가 발생했습니다.";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "이미 가입 된 이메일입니다.";
            break;
          default:
            errorMessage = "회원가입 중 문제가 발생했습니다.";
        }
        Swal.fire(alertList.errorMessage(errorMessage));
      } else {
        Swal.fire(alertList.errorMessage("알 수 없는 오류가 발생했습니다."));
      }
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
            <EmailInput
              type="text"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <WarningMessage>{emailError}</WarningMessage>}
            <PasswordInput
              type="password"
              placeholder="패스워드"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <WarningMessage>{passwordError}</WarningMessage>}
            <PasswordCheckInput
              type="password"
              placeholder="패스워드 확인"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
            />
            {passwordCheckError && (
              <WarningMessage>{passwordCheckError}</WarningMessage>
            )}
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
                onChange={handlePhoneNumberChange}
              />
            </PhoneNumberInputArea>
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
              <SuccessButton onClick={handleRegister}>회원가입</SuccessButton>
            </SuccessButtonArea>
          </InputContainer>
        </InnerContent>
      </InnerContainer>
    </Container>
  );
};

export default RegisterDetailComponent;
