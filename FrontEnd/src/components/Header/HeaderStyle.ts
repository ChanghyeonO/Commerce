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
  height: 80px;
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
  justify-content: flex-end;
  height: 100%;
`;

export const LoginContent = styled.div`
  width: 160px;
  height: 80px;
  display: flex;
  font-size: 15px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const LoginRegisterButtonDesign = styled.button`
  border: none;
  cursor: pointer;
  font-size: 17px;
  font-weight: bold;
  background-color: transparent;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

export const LoginLogoutButton = styled(LoginRegisterButtonDesign)`
  margin-right: 10px;
`;

export const RegisterButton = styled(LoginRegisterButtonDesign)`
  margin-left: 10px;
`;

export const UserContent = styled.div`
  position: relative;
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

export const CartItemCount = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: #e01040;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const HamburgerMenu = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 12px;
  cursor: pointer;
`;

export const DropdownMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  position: absolute;
  background-color: white;
  top: 82px;
  right: 0;
  width: 250px;
  height: 30%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 55;
`;
