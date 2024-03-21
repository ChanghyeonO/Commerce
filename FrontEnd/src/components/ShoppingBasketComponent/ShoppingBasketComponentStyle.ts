import styled from "styled-components";
import { checkbox } from "../RegisterComponent/RegisterTermsComponent/RegisterTermsComponentsStyle";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
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

export const BottomContent = styled.div`
  width: 95%;
  height: 70%;
  border: 2px solid #eee;
  border-radius: 12px;
  overflow: hidden;
`;

export const ItemSelectInfoArea = styled.div`
  width: 100%;
  height: 63.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-bottom: 2px solid #eee;
`;

export const SelectInputBox = styled(checkbox)`
  width: 20px;
  height: 20px;
`;

export const InfoText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #777;
`;

export const FundingItemSection = styled.div`
  height: 30%;
  overflow-y: scroll;
`;

export const OtherItemSection = styled.div`
  width: 100%;
  height: 47%;
  overflow-y: scroll;
`;

export const ItemArea = styled.div`
  max-width: 100%;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid #eee;
  background-color: #fff;
  padding: 0px 10px;
  gap: 30px;
  @media (max-width: 1180px) {
    flex-direction: column;
    padding: 10px 0px;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 80%;
  height: auto;
  gap: 20px;
  @media (max-width: 800px) {
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }
`;

export const ItemImage = styled.img`
  width: 180px;
  height: 100%;
`;

export const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 150px;

  @media (max-width: 1180px) {
    width: 100%;
    align-items: center;
  }
`;

export const ItemTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

export const ItemOption = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

export const ItemDescription = styled.div`
  font-size: 15px;
  display: flex;
`;

export const RightContent = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  @media (max-width: 1180px) {
    width: 80%;
  }
`;

export const TotalPrice = styled.div`
  font-size: 18px;
  margin-left: auto;
  @media (max-width: 1180px) {
    margin-left: 0;
  }
`;

export const ProductCountArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  width: 160px;
  height: 30px;
  margin-left: auto;
  @media (max-width: 1180px) {
    margin-left: 0;
  }
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
  font-weight: bold;
  @media (max-width: 1180px) {
    margin-left: 0;
    padding: 10px 80px;
  }
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

export const OrderButtonArea = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
