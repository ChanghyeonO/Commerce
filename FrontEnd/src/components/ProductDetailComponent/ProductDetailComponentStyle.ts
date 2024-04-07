import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
`;

export const TopContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17%;
  width: 100%;
  min-height: 500px;
  border-bottom: 1px solid #eee;
  @media (max-width: 1180px) {
    flex-direction: column;
  }
`;

export const LeftContent = styled.div`
  width: 500px;
  height: 500px;
  @media (max-width: 1180px) {
    width: 100%;
  }
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 100%;
  @media (max-width: 1180px) {
    width: 100%;
  }
`;

export const DescriptionArea = styled.div`
  width: 100%;
  @media (max-width: 1180px) {
    width: 90%;
  }
`;

export const Title = styled.h1`
  font-size: 25px;
`;

export const Description = styled.p`
  font-size: 15px;
  white-space: pre-wrap;
`;

export const OptionArea = styled.div`
  width: 100%;
  @media (max-width: 1180px) {
    width: 90%;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  user-select: none;
  font-size: 15px;
  font-weight: bold;
  z-index: 2;
`;

export const DropdownSelected = styled.div`
  padding: 15px;
  border: none;
  cursor: pointer;
  background-color: #eee;
  text-align: center;
  border-radius: 10px;
`;

export const DropdownOptions = styled.div`
  position: absolute;
  top: 88%;
  left: 0;
  right: 0;
  background-color: #eee;
  z-index: 1;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

export const DropdownOption = styled.div`
  padding: 15px;
  cursor: pointer;
  border-bottom: 0.1px solid #999;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #38b6ff;
    color: #fff;
  }
`;

export const IntroDeadLineArea = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 1180px) {
    width: 90%;
  }
`;

export const IntroDeadLine = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

export const FundingGaugeArea = styled.div`
  width: 100%;
  @media (max-width: 1180px) {
    width: 90%;
  }
`;

export const IntroProductCountArea = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media (max-width: 1180px) {
    width: 90%;
  }
`;

export const IntroProductCount = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const ProductCountArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 60px;
  @media (max-width: 1180px) {
    width: 90%;
  }
`;

const PlusMinusButtonDesign = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  background-color: #eee;
  transition: 0.2s ease-in;
  &:hover {
    background-color: #bbb;
    color: #fff;
  }
`;

export const MinusButton = styled(PlusMinusButtonDesign)``;

export const CountInput = styled.input`
  width: 60px;
  height: 30px;
  border: none;
  font-weight: bold;
  font-size: 17px;
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

export const TotalPriceArea = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1180px) {
    width: 90%;
  }
`;

export const TotalPrice = styled.div`
  border: none;
  text-align: center;
  min-width: 100px;
  height: 30px;
  border: none;
  font-size: 20px;
  font-weight: bold;
`;

export const CheckoutButtonArea = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (max-width: 1180px) {
    width: 90%;
  }
`;

const CheckoutButton = styled.button`
  width: 50%;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  font-size: 17px;
`;
export const ShoppingBasketButton = styled(CheckoutButton)`
  background-color: #38b6ff;
`;

export const PurchaseButton = styled(CheckoutButton)`
  background-color: #5271ff;
`;

export const BottomContent = styled.div`
  width: 100%;
  min-height: 500px;
`;

export const ProductIntroArea = styled.div`
  width: 100%;
  min-height: 500px;
  justify-content: center;
  overflow: hidden;
  display: flex;
  gap: 100px;
  border-bottom: 1px solid #eee;
  justify-content: center;
  align-items: center;
  @media (max-width: 1180px) {
    flex-direction: column;
  }
`;

export const ProductImage = styled.img`
  width: 40%;
  height: 100%;
  object-fit: contain;
  @media (max-width: 1180px) {
    width: 60%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ProductDescription = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  white-space: pre-wrap;
  @media (max-width: 1180px) {
    width: 60%;
    text-align: center;
  }
  @media (max-width: 800px) {
    width: 100%;
    text-align: center;
  }
`;
