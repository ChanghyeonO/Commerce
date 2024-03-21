import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  background-color: #eee;
  @media (max-width: 1180px) {
    flex-direction: column;
    gap: 30px;
  }
`;

export const RightContent = styled.div`
  width: 55%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 12px;
  background-color: #fff;
  @media (max-width: 1180px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 35px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const InnerContent = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const PasswordInputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const PasswordInput = styled.input`
  width: 200px;
  height: 40px;
  padding: 0 10px;
  border-radius: 12px;
  border: none;
  background-color: #eee;
  font-size: 15px;
  font-weight: bold;
`;
