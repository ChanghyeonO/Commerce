import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
`;

export const TopContent = styled.div`
  max-width: 100%;
  padding: 0 10%;
  height: 250px;
  display: flex;
  align-items: end;
  justify-content: flex-start;
  border-bottom: 1px solid #eee;
`;

export const Title = styled.h1`
  font-size: 25px;
`;

export const BottomContent = styled.div``;

export const ItemArea = styled.div`
  max-width: 100%;
  height: 150px;
  padding: 0 10%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
`;

export const ItemImage = styled.img`
  width: 150px;
  height: 100%;
`;

export const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 200px;
  height: 150px;
`;

export const ItemTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const ItemOption = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

export const ItemDescription = styled.div`
  font-size: 15px;
`;

export const RightContent = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TotalPrice = styled.div`
  font-size: 18px;
`;

export const ProductCountArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 80%;
  height: 60px;
`;

const PlusMinusButtonDesign = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
`;

export const MinusButton = styled(PlusMinusButtonDesign)``;

export const CountInput = styled.input`
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
  &:focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const PlusButton = styled(PlusMinusButtonDesign)``;

export const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  padding: 5px 10px;
  margin-left: auto;
`;

export const EmptyInfomation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  font-size: 30px;
  font-weight: bold;
  color: #bbb;
`;
