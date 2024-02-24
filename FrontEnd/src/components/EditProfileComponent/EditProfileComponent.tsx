import React, { useState, useEffect, ChangeEvent } from "react";
import { auth, db } from "../../api/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import MyPageNav from "../MyPageNav/MyPageNav";

import {
  Container,
  RightContent,
  WarningMessage,
  Title,
  InnerContent,
  EmailInputArea,
  EmailInput,
  PasswordInputArea,
  PasswordInput,
  PasswordCheckInput,
  NameInputArea,
  NameInput,
  PhoneNumberInputArea,
  PhoneNumberInput,
  AddressInputArea,
  MainAddressArea,
  AddressInput,
  FindAddressButton,
  AddressDetailInput,
  EditButtonArea,
  EditButton,
} from "./EditProfileComponentStyle";

const EditProfileComponent = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    addressDetail: "",
    password: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    address: "",
    name: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userDocRef = doc(db, "users", auth.currentUser!.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(prevState => ({
              ...prevState,
              email: auth.currentUser!.email || "",
              name: userData.name,
              phoneNumber: userData.phoneNumber,
              address: userData.address,
              addressDetail: userData.addressDetail,
            }));
          } else {
            console.log("해당 문서가 없습니다.");
          }
        } catch (error) {
          console.error(
            "사용자 데이터를 가져오는 중 오류가 발생했습니다:",
            error,
          );
        }
      } else {
        console.log("로그인된 사용자가 없습니다.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "password") {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "*패스워드는 8자 이상, 숫자와 특수문자를 포함해주세요.",
      }));
    } else if (name === "phoneNumber") {
      setErrors(prev => ({
        ...prev,
        phoneNumber: validatePhoneNumber(value)
          ? ""
          : "*유효한 전화번호 형식이 아닙니다.",
      }));
    } else if (name === "name") {
      setErrors(prev => ({
        ...prev,
        name: value.trim() === "" ? "*이름을 입력해 주세요." : "",
      }));
    }
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const pattern = /^\d{3}-\d{3,4}-\d{4}$/;
    return pattern.test(phoneNumber);
  };

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordCheckInput = e.target.value;
    setPasswordCheck(passwordCheckInput);
    setErrors(prev => ({
      ...prev,
      passwordCheck:
        user.password !== passwordCheckInput
          ? "*입력한 비밀번호가 일치하지 않습니다."
          : "",
    }));
  };

  const getAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setUser(prevUser => ({
          ...prevUser,
          address: data.address,
        }));
      },
    }).open();
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!validatePassword(user.password)) {
      newErrors.password =
        "*패스워드는 8자 이상, 숫자와 특수문자를 포함해주세요.";
      isValid = false;
    } else if (user.password !== passwordCheck) {
      newErrors.passwordCheck = "*입력한 비밀번호가 일치하지 않습니다.";
      isValid = false;
    } else if (!validatePhoneNumber(user.phoneNumber)) {
      newErrors.phoneNumber = "*유효한 전화번호 형식이 아닙니다.";
      isValid = false;
    } else if (user.name.trim() === "") {
      newErrors.name = "*이름을 입력해 주세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const updatePasswordFunction = async (newPassword: string) => {
    if (auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        console.log("비밀번호가 성공적으로 업데이트되었습니다.");
      } catch (error) {
        console.error("비밀번호 업데이트 중 오류가 발생했습니다:", error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!validateInputs()) {
      return;
    }

    if (auth.currentUser) {
      try {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          name: user.name,
          phoneNumber: user.phoneNumber,
          address: user.address,
          addressDetail: user.addressDetail,
        });
        Swal.fire(alertList.successMessage("회원 정보가 수정되었습니다."));
      } catch (error) {
        Swal.fire(alertList.errorMessage("회원 정보 수정에 실패했습니다."));
      }
    }
    if (user.password) {
      await updatePasswordFunction(user.password);
    }
  };

  return (
    <Container>
      <MyPageNav />
      <RightContent>
        <Title>프로필 수정</Title>
        <InnerContent>
          <EmailInputArea>
            <EmailInput type="text" value={user.email} readOnly />
          </EmailInputArea>
          <PasswordInputArea>
            <PasswordInput
              name="password"
              type="password"
              placeholder="패스워드"
              value={user.password}
              onChange={handleChange}
            />
            {errors.password && (
              <WarningMessage>{errors.password}</WarningMessage>
            )}
            <PasswordCheckInput
              type="password"
              placeholder="패스워드 확인"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
            />
            {errors.passwordCheck && (
              <WarningMessage>{errors.passwordCheck}</WarningMessage>
            )}
          </PasswordInputArea>
          <NameInputArea>
            <NameInput
              name="name"
              type="text"
              placeholder="이름"
              value={user.name}
              onChange={handleChange}
            />
          </NameInputArea>
          {errors.name && <WarningMessage>{errors.name}</WarningMessage>}
          <PhoneNumberInputArea>
            <PhoneNumberInput
              name="phoneNumber"
              type="text"
              placeholder="전화번호"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </PhoneNumberInputArea>
          {errors.phoneNumber && (
            <WarningMessage>{errors.phoneNumber}</WarningMessage>
          )}
          <AddressInputArea>
            <MainAddressArea>
              <AddressInput
                type="text"
                placeholder="주소"
                value={user.address}
                readOnly
              />
              <FindAddressButton onClick={getAddress}>검색</FindAddressButton>
              {errors.address && (
                <WarningMessage>{errors.address}</WarningMessage>
              )}
            </MainAddressArea>
            <AddressDetailInput
              type="text"
              placeholder="상세 주소"
              value={user.addressDetail}
              onChange={handleChange}
            />
          </AddressInputArea>
          <EditButtonArea>
            <EditButton onClick={handleUpdate}>수정하기</EditButton>
          </EditButtonArea>
        </InnerContent>
      </RightContent>
    </Container>
  );
};

export default EditProfileComponent;
