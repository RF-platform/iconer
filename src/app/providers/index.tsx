import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { theme } from "@shared/config";
import { rootStore } from "../rootStore";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ChakraProvider>
  );
};

export default AppProviders;
