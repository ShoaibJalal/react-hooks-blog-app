import React from "react";
export const ThemeContext = React.createContext({
  primaryColor: "#33b5e5",
  secondaryColor: "#00C851"
});

export const StateContext = React.createContext({
  state: {},
  dispatch: () => {}
});
