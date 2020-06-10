import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import useLocalStorage from "../../hooks/useLocalStorage";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: purple,
    secondary: green,
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: purple,
    secondary: green,
  },
});

const Theme = (props) => {
  const { children, darkMode } = props;
  const defaultTheme = darkMode ? themeDark : theme;
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export const withTheme = (Component) => {
  return (props) => {
    const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
    return (
      <Theme darkMode={darkMode}>
        <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
      </Theme>
    );
  };
};
