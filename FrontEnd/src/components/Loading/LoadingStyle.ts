import styled from "styled-components";

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(170, 170, 170, 0.5);
  z-index: 100;
`;

export const LoadingImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;
