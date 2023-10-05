import { IQTheme, ThemeContext } from ".";
import { Appearance, AppearanceProvider } from "react-native-appearance";
import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "react-native";
import React, { useState, useEffect } from "react";

const ManageThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useState("light");
  const setMode = (mode) => {
    setThemeState(mode);
  };
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  return (
    <ThemeContext.Provider value={{ mode: themeState, setMode }}>
      <ThemeProvider theme={IQTheme.colors[themeState]}>
        <>
          <StatusBar
            barStyle={themeState === "light" ? "dark-content" : "light-content"}
            backgroundColor={IQTheme.colors[themeState].primaryBackground}
          />
          {children}
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
const ThemeManager = ({ children }) => (
  <AppearanceProvider>
    <ManageThemeProvider>{children}</ManageThemeProvider>
  </AppearanceProvider>
);

export default ThemeManager;
