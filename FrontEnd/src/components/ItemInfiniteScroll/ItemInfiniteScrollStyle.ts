import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 80px;
  width: 100%;
  height: 100%;
  margin-top: 70px;
`;

export const ItemBox = styled.div`
  border: 1.5px solid #eee;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  width: 300px;
  height: 450px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const SoldOutInfoText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 35px;
  z-index: 1;
  border-radius: 12px;
  cursor: pointer;
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 15px;
  background: #fff;
  border: 2px solid #eee;
`;

export const ItemName = styled.h3`
  font-size: 25px;
  width: 100%;
  height: 70px;
`;

export const ItemPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #bbb;
  width: 100%;
  height: 50px;
`;

export const EndMessage = styled.div`
  width: 100%;
  height: 50px;
  text-align: center;
  grid-column: 1 / -1;
  font-size: 20px;
  font-weight: bold;
  color: #bbb;
`;
