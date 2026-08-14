import React from "react";

export const themes = {
  light: {
    backgroundColor: "AntiqueWhite",
    textColor: "DarkSlateGrey",
    buttonBackground: "Lavender", 
    inputBackground: "Gainsboro",
    linkColor: "DarkBlue"
  },
  dark: {
    backgroundColor: "DarkSlateGrey",
    textColor: "AntiqueWhite",
    buttonBackground: "#232b3c",
    inputBackground: "#45516d",
    linkColor: "LightBlue"
  }
};

export const ThemeContext = React.createContext();