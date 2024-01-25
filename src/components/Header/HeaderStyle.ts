import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  height: 80px;
  border-bottom: 2px solid #eee;
  padding: 0 5%;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100%;
  background-color: #eee;
`;

export const MainLogo = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #999;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 100%;
  background-color: #eee;
`;

export const LoginContent = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: bold;
`;

const LoginRegisterButtonDesign = styled.button`
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  background-color: transparent;
`;

export const LoginButton = styled(LoginRegisterButtonDesign)`
  margin-right: 10px;
`;

export const RegisterButton = styled(LoginRegisterButtonDesign)`
  margin-left: 10px;
`;

export const UserContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 100%;
  background-color: #eee;
`;

export const UserLogo = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;
