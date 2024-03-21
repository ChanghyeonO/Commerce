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

export const RightContentArea = styled.div`
  width: 55%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 12px;
  background-color: #fff;
  @media (max-width: 1180px) {
    justify-content: center;
  }
`;

export const Title = styled.h1`
  font-size: 35px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const RightContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  @media (max-width: 1180px) {
    width: 100%;
    align-items: center;
  }
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  gap: 50px;

  @media (max-width: 1180px) {
    align-items: center;
    width: 100%;
    gap: 20px;
  }
`;

export const CancelButton = styled.button`
  margin-top: auto;
  width: 80px;
  height: 35px;
  border-radius: 7px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  background-color: #e01040;
  @media (max-width: 1180px) {
    width: 170px;
  }
`;
