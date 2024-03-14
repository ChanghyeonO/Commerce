import React from "react";
import { ButtonArea, Button } from "./DefaultButtonStyle";

interface DefaultButtonProps {
  name: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}
const DefaultButton = ({
  name,
  onClick,
  style,
  buttonStyle,
}: DefaultButtonProps) => {
  return (
    <ButtonArea style={style}>
      <Button onClick={onClick} style={buttonStyle}>
        {name}
      </Button>
    </ButtonArea>
  );
};

export default DefaultButton;
