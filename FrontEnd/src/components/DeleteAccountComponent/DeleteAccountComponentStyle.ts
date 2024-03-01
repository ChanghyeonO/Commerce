import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  background-color: #eee;
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
`;

export const Title = styled.h1`
  font-size: 35px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const InnerContent = styled.div`
  width: 50%;
  height: 71.8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
