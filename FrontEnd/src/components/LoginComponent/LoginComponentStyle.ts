import styled from "styled-components";
import GoogleLoginImage from "../../assets/images/GoogleSignup.png";

export const Container = styled.div`
  max-width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  height: 800px;
`;

export const MainLogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const MainLogo = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 12px;
`;

export const IntroTextArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const IntroText = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
`;

export const InnerContent = styled.div``;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputDesign = styled.input`
  width: 200px;
  height: 40px;
  padding: 0 10px;
  border-radius: 12px;
  border: none;
  background-color: #eee;
  font-size: 15px;
  font-weight: bold;
`;

export const EmailInput = styled(InputDesign)``;

export const PasswordInput = styled(InputDesign)``;

const LoginButtonDesign = styled.button`
  width: 220px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: #eee;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export const LoginButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const GoogleLoginButton = styled(LoginButtonDesign)`
  background-image: url(${GoogleLoginImage});
  background-size: 100% 100%;
  border: 2px solid #eee;
`;

const RegisterFindAccountButtonDesign = styled.button`
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  background-color: transparent;
`;

export const RegisterArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const RegisterButton = styled(RegisterFindAccountButtonDesign)``;

export const FindAccountArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const FindEmail = styled(RegisterFindAccountButtonDesign)``;

export const FindPassword = styled(RegisterFindAccountButtonDesign)``;
