import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

export const RightContent = styled.div`
  width: 55%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 12px;
`;

export const Title = styled.h1`
  font-size: 35px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 90px;
  gap: 30px;
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

export const EmailInputArea = styled.div``;

export const EmailInput = styled(InputDesign)``;

export const PasswordInputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const PasswordInput = styled(InputDesign)``;

export const PasswordCheckInput = styled(InputDesign)``;

export const NameInputArea = styled.div``;

export const NameInput = styled(InputDesign)``;

export const PhoneNumberInputArea = styled.div``;

export const PhoneNumberInput = styled(InputDesign)``;

export const AddressInputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const MainAddressArea = styled.div`
  display: flex;
  gap: 10px;
`;

export const AddressInput = styled(InputDesign)``;

export const FindAddressButton = styled.button`
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

export const AddressDetailInput = styled(InputDesign)``;

export const EditButtonArea = styled.div``;

export const EditButton = styled.button`
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
