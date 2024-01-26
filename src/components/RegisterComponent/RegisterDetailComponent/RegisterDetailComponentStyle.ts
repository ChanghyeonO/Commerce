import styled from "styled-components";

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
  flex-direction: column;
  width: 500px;
  height: 900px;
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

export const InnerContent = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
`;

export const InputContainer = styled.div`
  width: 62%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
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

const CheckButtonDesign = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  background-color: #38b6ff;
`;

const InputAreaDesign = styled.div`
  display: flex;
  gap: 10px;
`;

export const EmailInputArea = styled(InputAreaDesign)``;

export const EmailInput = styled(InputDesign)``;

export const EmailCheckButton = styled(CheckButtonDesign)``;

export const PasswordInput = styled(InputDesign)``;

export const PasswordCheckInput = styled(InputDesign)``;

export const NameInput = styled(InputDesign)``;

export const PhoneNumberInputArea = styled(InputAreaDesign)``;

export const PhoneNumberInput = styled(InputDesign)``;

export const SendCertificationButton = styled(CheckButtonDesign)``;

export const CertificationCheckArea = styled(InputAreaDesign)``;

export const CertificationCheckInput = styled(InputDesign)``;

export const CertificationCheckButton = styled(CheckButtonDesign)``;

export const FindAdressArea = styled(InputAreaDesign)``;

export const FindAdressInput = styled(InputDesign)``;

export const FindAdressButton = styled(CheckButtonDesign)``;

export const FindAdressDetailInput = styled(InputDesign)``;

export const SuccessButtonArea = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
`;

export const SuccessButton = styled.button`
  width: 220px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: #5271ff;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
