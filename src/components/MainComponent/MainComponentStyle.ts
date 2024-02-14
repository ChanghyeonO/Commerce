import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
`;

export const TopContent = styled.div`
  max-width: 100%;
  height: 500px;
  background-color: #eee;
`;

export const BottomContent = styled.div`
  max-width: 100%;
  min-height: 500px;
  padding: 50px;
`;

export const AddItemButtonArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

export const AddItemButton = styled.button`
  width: 220px;
  height: 50px;
  border-radius: 12px;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background-color: #5271ff;
`;
