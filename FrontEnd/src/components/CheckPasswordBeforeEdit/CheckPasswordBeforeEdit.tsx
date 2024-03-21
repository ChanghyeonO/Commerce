import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/firebase";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import MyPageNav from "../MyPageNav/MyPageNav";
import Loading from "../Loading/Loading";
import DefaultButton from "../DefaultButton/DefaultButton";
import {
  Container,
  RightContent,
  Title,
  InnerContent,
  PasswordInputArea,
  PasswordInput,
} from "./CheckPasswordBeforeEditStyle";
import { FirebaseError } from "firebase/app";

const CheckPasswordBeforeEdit = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleReauthenticate = async () => {
    setIsLoading(true);
    if (!auth.currentUser || !auth.currentUser.email) {
      Swal.fire(alertList.errorMessage("유저 정보를 불러오는데 실패했습니다"));
      return;
    }
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password,
    );

    try {
      setIsLoading(false);
      await reauthenticateWithCredential(auth.currentUser, credential);
      Swal.fire(alertList.successMessage("인증에 성공했습니다."));
      navigate("/mypage/edit-profile");
    } catch (error) {
      setIsLoading(false);
      if ((error as FirebaseError).code === "auth/wrong-password") {
        Swal.fire(alertList.errorMessage("잘못된 비밀번호입니다."));
      } else {
        Swal.fire(alertList.errorMessage("재인증에 실패했습니다."));
      }
    }
  };

  return (
    <Container>
      <MyPageNav />
      <RightContent>
        <Title>비밀번호 확인</Title>
        <InnerContent>
          <PasswordInputArea>
            <PasswordInput
              type="password"
              placeholder="패스워드"
              value={password}
              onChange={handlePasswordChange}
            />
          </PasswordInputArea>
          <DefaultButton name={"확인"} onClick={handleReauthenticate} />
        </InnerContent>
      </RightContent>
      {isLoading && <Loading />}
    </Container>
  );
};

export default CheckPasswordBeforeEdit;
