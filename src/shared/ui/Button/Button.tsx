import React from "react";
import { ButtonProps } from "./types";
import { ButtonStyled } from "./styled";

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};

export default Button;
