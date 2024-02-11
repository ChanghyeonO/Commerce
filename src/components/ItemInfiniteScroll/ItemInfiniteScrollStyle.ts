import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  width: 100%;
  height: 100%;
`;

export const ItemBox = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const ItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
`;

export const ItemName = styled.h3`
  font-size: 25px;
`;

export const ItemPrice = styled.p`
  font-size: 15px;
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
