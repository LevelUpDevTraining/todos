import React, { useContext } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const defaultTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: purple,
    secondary: green,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: purple,
    secondary: green,
  },
});
const Context = React.createContext({
  darkMode: false,
  setDarkMode: () => {},
});

const Provider = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  return (
    <Context.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);

export function withProvider(Component) {
  return function WrapperComponent(props) {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
}

export { Context, Provider };

export const useApp = () => {
  const { darkMode, setDarkMode } = useStore();
  return {
    darkMode,
    setDarkMode,
  };
};

export function withThemeProvider(Component) {
  const WrapperComponent = ({ props }) => {
    const { darkMode } = useApp();
    const theme = darkMode ? darkTheme : defaultTheme;
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  };
  return withProvider(WrapperComponent);
}
