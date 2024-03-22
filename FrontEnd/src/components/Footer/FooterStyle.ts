import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  height: 200px;
  border-top: 2px solid #eee;
  padding: 0 5%;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 50px;
  overflow: hidden;
`;

export const MainLogo = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 12px;
  cursor: pointer;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  width: 250px;
  height: 100%;
`;

export const ContactInfomationText = styled.h1`
  font-size: 20px;
  border-bottom: 1px solid #ddd;
`;

export const Contact = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;

const ContactLogoDesign = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const Instagram = styled(ContactLogoDesign)``;

export const Email = styled(ContactLogoDesign)``;

export const TelephoneNumber = styled(ContactLogoDesign)``;

export const CopyRight = styled.div`
  font-size: 12.5px;
  margin-bottom: 10px;
  width: 100%;
  height: 20px;
`;
