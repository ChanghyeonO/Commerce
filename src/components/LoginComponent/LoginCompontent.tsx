import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../api/firebase";
import { FirebaseError } from "firebase/app";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import FUNDITLOGO from "../../assets/icons/FUNDIT.png";

import {
  Container,
  InnerContainer,
  MainLogoArea,
  MainLogo,
  IntroTextArea,
  IntroText,
  InnerContent,
  InputContainer,
  EmailInput,
  PasswordInput,
  LoginButtonArea,
  DefaultLoginButton,
  GoogleLoginButton,
  RegisterArea,
  RegisterButton,
  FindAccountArea,
  FindEmail,
  FindPassword,
} from "./LoginComponentStyle";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (!userCredential.user.emailVerified) {
        Swal.fire(alertList.infoMessage("이메일 인증 후 이용 가능합니다."));
      } else {
        console.log("로그인 성공:", userCredential.user);
        Swal.fire(alertList.successMessage("로그인에 성공했습니다."));
        navigate("/");
      }
    } catch (error) {
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error instanceof FirebaseError) {
        console.log("Firebase 에러 코드:", error.code);
        switch (error.code) {
          case "auth/wrong-password":
            errorMessage = "비밀번호를 다시 확인해주세요.";
            break;
          case "auth/user-not-found":
            errorMessage = "등록된 계정을 찾을 수 없습니다.";
            break;
          case "auth/invalid-email":
            errorMessage = "유효하지 않은 이메일 형식입니다.";
            break;
          default:
            errorMessage = "로그인 중 문제가 발생했습니다.";
        }
        Swal.fire(alertList.errorMessage(errorMessage));
      } else {
        Swal.fire(alertList.errorMessage(errorMessage));
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Google 로그인 성공, 사용자 정보는 result.user에 담겨 있음
      console.log("Google 계정으로 로그인 성공:", result.user);
      // 로그인 성공 후 리디렉션, 예: 홈 페이지로
      navigate("/");
    } catch (error) {
      console.error("Google 로그인 실패:", error);
      // 적절한 에러 처리
    }
  };

  return (
    <Container>
      <InnerContainer>
        <MainLogoArea>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </MainLogoArea>
        <IntroTextArea>
          <IntroText>만나서 반가워요!</IntroText>
        </IntroTextArea>
        <InnerContent>
          <InputContainer>
            <EmailInput
              type="text"
              placeholder="이메일"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <PasswordInput
              type="password"
              placeholder="패스워드"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </InputContainer>
          <FindAccountArea>
            <FindEmail>이메일</FindEmail>|<FindPassword>비밀번호</FindPassword>
            찾기
          </FindAccountArea>
          <LoginButtonArea>
            <DefaultLoginButton onClick={handleLogin}>
              로그인
            </DefaultLoginButton>
            <GoogleLoginButton onClick={handleGoogleLogin} />
          </LoginButtonArea>
          <RegisterArea>
            <Link to="/register-terms">
              <RegisterButton>회원가입</RegisterButton>
            </Link>
          </RegisterArea>
        </InnerContent>
      </InnerContainer>
    </Container>
  );
};

export default LoginComponent;
