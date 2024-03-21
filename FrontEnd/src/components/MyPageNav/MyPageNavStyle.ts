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
  overflow: hidden;

  @media (max-width: 1180px) {
    justify-content: space-around;
    flex-direction: row;
    width: 80%;
    padding: 0px 0px;
    height: 80px;
  }

  @media (max-width: 500px) {
    flex-direction: row;
    width: 94%;
    padding: 0px 15px;
    gap: 50px;
  }
`;

export const TopArea = styled.div`
  width: 100%;
  height: auto;
  @media (max-width: 1180px) {
    width: 70%;
    display: flex;
    gap: 10px;
  }
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

  @media (max-width: 1180px) {
    width: 130px;
    height: 100%;
  }

  @media (max-width: 830px) {
    width: 100px;
    font-size: 18px;
  }

  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const EditProfile = styled(ButtonDesign)``;

export const ShoppingBasket = styled(ButtonDesign)``;

export const OrderHistory = styled(ButtonDesign)``;

export const DeleteAccount = styled(ButtonDesign)``;
