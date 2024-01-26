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
  justify-content: center;
  flex-direction: column;
  width: 500px;
  height: 300px;
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

export const RegisterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const LoginButton = styled.button`
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
