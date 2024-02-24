import styled from "styled-components";

interface ButtonProps {
  $isActive: boolean;
}

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #eee;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #eee;
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
  padding: 5px 55px;
  cursor: pointer;
  border-radius: 12px;
  background: ${props => (props.$isActive ? "#5271ff" : "#fff")};
  border: 1px solid #eee;
`;
