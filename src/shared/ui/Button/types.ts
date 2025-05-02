import { ReactNode } from "react";

export interface ButtonProps {
  $primary?: boolean;
  children: ReactNode;
  onClick?: () => void;
}
