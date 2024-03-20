import styled from "styled-components";

export const Container = styled.div`
  width: 300px;
  height: 760px;
  padding: 20px 0px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #38b6ff;
`;

export const TopArea = styled.div`
  width: 100%;
  height: auto;
`;
const ButtonDesign = styled.button`
  width: 100%;
  height: 100px;
  border: none;
  cursor: pointer;
  font-size: 25px;
  font-weight: bold;
  transition: 0.2s ease-in;
  background-color: #38b6ff;
  transition: 0.2s ease-in;

  color: #fff;
  &:hover {
    background-color: #5271ff;
  }
`;

export const EditProfile = styled(ButtonDesign)``;

export const ShoppingBasket = styled(ButtonDesign)``;

export const OrderHistory = styled(ButtonDesign)``;

export const DeleteAccount = styled(ButtonDesign)``;
