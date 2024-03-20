import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  min-height: 128vh;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerContent = styled.div`
  width: 70%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  @media (max-width: 1180px) {
    width: 99%;
  }
`;

export const Title = styled.h1`
  font-size: 35px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const InfoTextContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
`;

export const InfoText = styled.h3`
  font-size: 25px;
`;

export const ShoppingBasketContainer = styled.div`
  width: 80%;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #eee;
  @media (max-width: 1180px) {
    width: 100%;
  }
`;

export const ShoppingBasket = styled.div`
  width: 100%;
  height: 150px;
  overflow-y: scroll;
  border: 2px solid #eee;
  border-radius: 12px;
`;

export const ShippingAreaContainer = styled.div`
  width: 80%;
 min- height: 425px;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #eee;
`;

const InputDesign = styled.input`
  width: 200px;
  height: 40px;
  padding: 0 10px;
  border-radius: 12px;
  border: none;
  background-color: #eee;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const NameInput = styled(InputDesign)``;

export const PhoneNumberInput = styled(InputDesign)``;

export const MainAddressArea = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  @media (max-width: 510px) {
    flex-direction: column;
    gap: 0px;
  }
`;

export const AddressInput = styled(InputDesign)``;

export const FindAddressButton = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  background-color: #38b6ff;
  @media (max-width: 510px) {
    width: 220px;
    margin-bottom: 20px;
  }
`;

export const AddressDetailInput = styled(InputDesign)``;

export const DeliveryRequestInput = styled(InputDesign)`
  width: 290px;
  @media (max-width: 510px) {
    width: 90%;
  }
`;
