import React from "react";

import { ButtonArea, Button } from "./DefaultButtonStyle";

const DefaultButton = (name: string) => {
  return (
    <ButtonArea>
      <Button>{name}</Button>
    </ButtonArea>
  );
};

export default DefaultButton;
