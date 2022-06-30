import React, { useState } from "react";
import {
  defaultState,
  ThemeContextInterface,
  ThemeProviderInterface,
} from "./themeInterface";

export const ThemeContext =
  React.createContext<ThemeContextInterface>(defaultState);

export const ThemeProvider: React.FC<ThemeProviderInterface> = ({
  children,
}) => {
  const [dark, setDark] = useState<boolean>(true);
  const toggleTheme = () => {
    setDark((current) => !current);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
