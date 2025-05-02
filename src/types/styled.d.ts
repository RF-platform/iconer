import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      card: {
        background: string;
        text: string;
        label: string;
        tooltip: {
          background: string;
          text: string;
        };
        skeleton: string;
        success: string;
        error: string;
        tradeYes: string;
        tradeNo: string;
      };
    };
  }
}
