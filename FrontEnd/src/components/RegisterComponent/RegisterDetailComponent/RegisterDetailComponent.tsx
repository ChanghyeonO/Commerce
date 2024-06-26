import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../api/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Loading from "../../Loading/Loading";
import DefaultButton from "../../DefaultButton/DefaultButton";
import Swal from "sweetalert2";
import alertList from "../../../utils/Swal";
import { User } from "../../../types/UserDataType";
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
} from "./RegisterDetailComponentStyle";

const RegisterDetailComponent = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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
    if (input.length === 11) {
      setPhoneNumberError("");
    } else {
      setPhoneNumberError("정확한 전화번호를 입력해주세요.");
    }
  };

  const saveUserData = async (userData: User) => {
    try {
      await setDoc(doc(db, "users", userData.userId), {
        email: userData.email,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        addressDetail: userData.addressDetail,
        admin: false,
      });
      console.log("사용자 정보 저장 성공");
    } catch (error) {
      console.error("사용자 정보 저장 실패", error);
    }
  };

  const getAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
        setAddressError("");
      },
    }).open();
  };

  const validateInputs = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("*인증 후 로그인이 가능하니 형식에 맞게 작성해주세요.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("*패스워드는 8자 이상, 특수문자를 포함해주세요.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== passwordCheck) {
      setPasswordCheckError("*패스워드를 다시 확인해주세요.");
      isValid = false;
    } else {
      setPasswordCheckError("");
    }

    if (!name.trim()) {
      setNameError("이름을 입력해주세요.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError("전화번호를 입력해주세요.");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }

    if (!address.trim()) {
      setAddressError("주소를 입력해주세요.");
      isValid = false;
    } else {
      setAddressError("");
    }

    return isValid;
  };

  const handleRegister = async () => {
    setIsLoading(true);

    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    try {
      const emailQuery = query(
        collection(db, "users"),
        where("email", "==", email),
      );
      const emailQuerySnapshot = await getDocs(emailQuery);
      if (emailQuerySnapshot.docs.length > 0) {
        setIsLoading(false);
        setEmailError("이미 가입된 이메일입니다.");
        return;
      }

      const phoneQuery = query(
        collection(db, "users"),
        where("phoneNumber", "==", phoneNumber),
      );
      const phoneQuerySnapshot = await getDocs(phoneQuery);
      if (phoneQuerySnapshot.docs.length > 0) {
        setIsLoading(false);
        setPhoneNumberError("이미 가입된 전화번호입니다.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);

      const userData = {
        userId: userCredential.user.uid,
        name,
        phoneNumber,
        address,
        addressDetail,
        email,
        admin: false,
      };

      await saveUserData(userData);
      setIsLoading(false);
      navigate("/register-success");
    } catch (error) {
      setIsLoading(false);
      if (error instanceof FirebaseError) {
        let errorMessage = "회원가입 중 문제가 발생했습니다.";
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
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) {
                  setNameError("");
                }
              }}
            />
            {nameError && <WarningMessage>{nameError}</WarningMessage>}
            <PhoneNumberInputArea>
              <PhoneNumberInput
                type="text"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </PhoneNumberInputArea>
            {phoneNumberError && (
              <WarningMessage>{phoneNumberError}</WarningMessage>
            )}
            <FindAdressArea>
              <FindAdressInput
                type="text"
                placeholder="주소"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (e.target.value.trim()) {
                    setAddressError("");
                  }
                }}
                readOnly
              />
              <FindAdressButton onClick={getAddress}>주소검색</FindAdressButton>
            </FindAdressArea>
            {addressError && <WarningMessage>{addressError}</WarningMessage>}
            <FindAdressDetailInput
              type="text"
              placeholder="상세 주소"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />

            <DefaultButton
              name={"회원가입"}
              onClick={handleRegister}
              style={{
                height: "70px",
                justifyContent: "start",
              }}
            />
          </InputContainer>
        </InnerContent>
      </InnerContainer>
      {isLoading && <Loading />}
    </Container>
  );
};

export default RegisterDetailComponent;
