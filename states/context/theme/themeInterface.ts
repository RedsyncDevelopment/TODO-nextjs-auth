import { ReactNode } from "react";

export interface ThemeProviderInterface {
  children: ReactNode;
}

export interface ThemeContextInterface {
  dark: boolean;
  toggleTheme?: () => void;
}

export const defaultState = {
  dark: true,
};
