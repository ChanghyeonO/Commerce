import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
`;

export const TopContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 160px;
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
  justify-content: center;
  align-items: center;
  width: 400px;
`;

export const DescriptionArea = styled.div`
  width: 80%;
`;

export const Title = styled.h1`
  font-size: 25px;
`;

export const Description = styled.p`
  font-size: 15px;
`;

export const OptionArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  gap: 10px;
  width: 80%;
  height: 60px;
  padding: 10px 0;
`;

export const OptionButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
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
  // background-color: #eee;
  font-size: 20px;
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
`;
export const ShoppingBasketButton = styled(CheckoutButton)``;

export const PurchaseButton = styled(CheckoutButton)``;

export const BottomContent = styled.div`
  width: 100%;
  min-height: 500px;
`;

export const ProductIntroArea = styled.div`
  max-width: 100%;
  height: 500px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const ProductImage = styled.img`
  width: 480px;
  height: 90%;
  object-fit: cover;
  border-radius: 12px;
`;

export const ProductDescription = styled.p`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;
