import { useState, KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { db, auth } from "../../api/firebase";
import { useUser } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";
import DefaultButton from "../DefaultButton/DefaultButton";
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
  GoogleLoginButton,
  RegisterArea,
  RegisterButton,
  FindAccountArea,
  FindEmail,
  FindPassword,
} from "./LoginComponentStyle";

const LoginComponent = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchUserData = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        const userData = {
          userId: userId,
          email: docData.email,
          name: docData.name || "",
          phoneNumber: docData.phoneNumber || "",
          address: docData.address || "",
          addressDetail: docData.addressDetail || "",
          admin: docData.admin || false,
        };
        setUser(userData);
      } else {
        console.log("유저 데이터를 찾을 수 없음:", userId);
      }
    } catch (error) {
      console.error("유저 데이터를 받아오는 중 오류 발생:", error);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (!userCredential.user.emailVerified) {
        Swal.fire(alertList.infoMessage("이메일 인증 후 이용 가능합니다."));
      } else {
        fetchUserData(userCredential.user.uid);
        Swal.fire(alertList.successMessage("로그인에 성공했습니다."));
        navigate("/");
      }
    } catch (error) {
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error instanceof FirebaseError) {
        console.log("Firebase 에러 코드:", error.code);
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "유효하지 않은 이메일 형식입니다.";
            break;
          case "auth/missing-password":
            errorMessage = "비밀번호를 입력해주세요.";
            break;
          case "auth/wrong-password":
            errorMessage = "비밀번호를 다시 확인해주세요.";
            break;
          case "auth/user-not-found":
            errorMessage = "등록된 계정을 찾을 수 없습니다.";
            break;
          default:
            errorMessage = "로그인 중 문제가 발생했습니다.";
        }
      }
      Swal.fire(alertList.errorMessage(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        fetchUserData(result.user.uid);
        Swal.fire(alertList.successMessage("로그인에 성공했습니다."));
        navigate("/");
      } else {
        await signOut(auth);
        await result.user.delete();
        Swal.fire(alertList.errorMessage("최초 회원가입이 필요합니다."));
      }
    } catch (error) {
      let errorMessage = "Google 로그인에 실패했습니다.";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/account-exists-with-different-credential":
            errorMessage = "이미 다른 인증 방법으로 가입된 이메일 주소입니다.";
            break;
          case "auth/popup-closed-by-user":
            errorMessage = "로그인 팝업 창이 사용자에 의해 닫혔습니다.";
            break;
          case "auth/cancelled-popup-request":
            errorMessage = "팝업 요청이 취소되었습니다. 다시 시도해 주세요.";
            break;
          case "auth/popup-blocked":
            errorMessage =
              "팝업 창이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해 주세요.";
            break;
          default:
            errorMessage = error.message;
        }
      }
      console.error("Google 로그인 실패:", error);
      Swal.fire(alertList.errorMessage(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
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
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <PasswordInput
              type="password"
              placeholder="패스워드"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </InputContainer>
          <FindAccountArea>
            <Link to="/find-email">
              <FindEmail>이메일</FindEmail>
            </Link>
            |
            <Link to="/find-password">
              <FindPassword>비밀번호</FindPassword>
            </Link>
            찾기
          </FindAccountArea>
          <LoginButtonArea>
            <DefaultButton name={"로그인"} onClick={handleLogin} />
            <GoogleLoginButton onClick={handleGoogleLogin} />
          </LoginButtonArea>
          <RegisterArea>
            <Link to="/register-terms">
              <RegisterButton>회원가입</RegisterButton>
            </Link>
          </RegisterArea>
        </InnerContent>
        {isLoading && <Loading />}
      </InnerContainer>
    </Container>
  );
};

export default LoginComponent;
