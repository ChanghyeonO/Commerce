import React from "react";
import { ButtonArea, Button } from "./DefaultButtonStyle";

interface DefaultButtonProps {
  name: string;
  onClick?: () => void;
}

const DefaultButton = ({ name, onClick }: DefaultButtonProps) => {
  return (
    <ButtonArea>
      <Button onClick={onClick}>{name}</Button>
    </ButtonArea>
  );
};

export default DefaultButton;
