import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 85px;
  width: 100%;
  height: 100%;
`;

export const ItemBox = styled.div`
  border: 1.5px solid #eee;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  width: 300px;
  height: 450px;
  position: relative;
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 12px;
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
