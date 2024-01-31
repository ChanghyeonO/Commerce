import styled from "styled-components";

interface ButtonProps {
  $isActive: boolean;
}

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Pagination = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 30px;
`;

export const NavButton = styled.span<ButtonProps>`
  padding: 4px 50px;
  cursor: pointer;
  border-radius: 12px;
  background: ${props => (props.$isActive ? "#5271ff" : "#fff")};
`;