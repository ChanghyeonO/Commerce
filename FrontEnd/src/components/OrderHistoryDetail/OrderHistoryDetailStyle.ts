import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(170, 170, 170, 0.5);
  z-index: 3;
`;

export const InnerContent = styled.div`
  width: 500px;
  height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  background-color: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
`;

export const ItemArea = styled.div`
  width: 90%;
  height: 400px;
  overflow-y: scroll;
`;

export const InnerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: #fff;
`;

export const ProductName = styled.h1`
  font-size: 17px;
`;
export const ProductPrice = styled.p`
  font-size: 17px;
`;

export const CloseButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  gap: 10px;
`;

export const CloseButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: #eee;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  background-color: #e01040;
`;
