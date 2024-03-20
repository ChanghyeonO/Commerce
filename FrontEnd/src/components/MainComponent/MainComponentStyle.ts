import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
`;

export const TopContent = styled.div`
  max-width: 100%;
  height: 600px;
  background-color: #fff;
`;

export const BottomContent = styled.div`
  max-width: 100%;
  min-height: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1180px) {
    padding: 10px;
  }
`;

export const ItemContent = styled.div`
  width: 100%;
  min-height: 600px;
  margin-bottom: 50px;
`;

export const IntroArea = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IntroTitle = styled.h2`
  font-size: 25px;
`;

export const ItemArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 80px;
  width: 100%;
  height: 100%;
`;

export const GoProductPageButton = styled.button`
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #38b6ff;
  transition: 0.2s;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    font-size: 22px;
  }
`;

export const CenterButtonArea = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const SortDropDownArea = styled.div`
  width: 220px;
  height: 50px;
  justify-content: center;
`;

export const AddItemButtonArea = styled.div`
  min-width: 20%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 20px;
  }
`;
