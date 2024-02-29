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

export const RightContentArea = styled.div`
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

export const RightContent = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
`;

export const SelectArea = styled.select`
  border-radius: 4px;
  background-color: #eee;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

export const CancelDeleteContent = styled.div`
  width: 30%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

export const CancelButton = styled.button`
  width: 80px;
  height: 35px;
  border-radius: 12px;
  border: none;
  background-color: #eee;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  background-color: #e01040;
`;
