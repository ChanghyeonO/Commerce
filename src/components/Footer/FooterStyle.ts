import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  height: 200px;
  border-top: 2px solid #eee;
  border-bottom: 2px solid #eee;
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
  width: 200px;
  height: 200px;
  border-radius: 12px;
  cursor: pointer;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 100%;
`;

export const Contact = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 80px;
`;

const ContactLogoDesign = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const Instagram = styled(ContactLogoDesign)``;

export const Email = styled(ContactLogoDesign)``;

export const TelephoneNumber = styled(ContactLogoDesign)``;

export const CopyRight = styled.div`
  margin-bottom: 10px;
`;
