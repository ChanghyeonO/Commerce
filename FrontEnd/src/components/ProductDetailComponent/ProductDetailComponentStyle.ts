import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
`;

export const TopContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 17%;
  width: 100%;
  height: 500px;
  border-bottom: 1px solid #eee;
`;

export const LeftContent = styled.div`
  width: 500px;
  height: 100%;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 100%;
`;

export const DescriptionArea = styled.div`
  width: 80%;
`;

export const Title = styled.h1`
  font-size: 25px;
`;

export const Description = styled.p`
  font-size: 15px;
  white-space: pre-wrap;
`;

export const OptionArea = styled.div`
  width: 80%;
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
  top: 83%;
  left: 0;
  right: 0;
  background-color: #eee;
  z-index: 1;
  border-radius: 0 0 10px 10px;
`;

export const DropdownOption = styled.div`
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #999;
  &:last-child {
    border-bottom: none;
  }
`;

export const IntroDeadLineArea = styled.div`
  width: 80%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const IntroDeadLine = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const IntroProductCountArea = styled.div`
  width: 80%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
  width: 80%;
  height: 60px;
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
  width: 80%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 80%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  height: 500px;
  justify-content: center;
  overflow: hidden;
  display: flex;
  gap: 17%;
  border-bottom: 1px solid #eee;
`;

export const ProductImage = styled.img`
  width: 500px;
  height: 100%;
  object-fit: contain;
`;

export const ProductDescription = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  white-space: pre-wrap;
`;
