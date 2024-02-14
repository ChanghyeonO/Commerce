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
  justify-content: flex-start;
  width: 540px;
  height: 100%;
  overflow: hidden;
  gap: 30px;
`;

export const MainLogo = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 12px;
  cursor: pointer;
`;

export const PageLinkButton = styled.button`
  width: 160px;
  height: 81px;
  border: none;
  cursor: pointer;
  color: #999;
  font-size: 20px;
  font-weight: bold;
  background-color: transparent;
  transition: border-bottom 0.3s ease-in;
  &:hover {
    border-bottom: 3px solid #5271ff;
    color: #000;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
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

export const LoginLogoutButton = styled(LoginRegisterButtonDesign)`
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
`;

export const UserLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: 100% 100%;
  border: 2px solid #eee;
  cursor: pointer;
`;
