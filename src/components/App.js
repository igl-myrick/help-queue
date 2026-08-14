import React, { useState } from 'react';
import Header from './Header';
import TicketControl from './TicketControl';
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToggleTheme from './ToggleTheme';
import { ThemeContext, themes } from '../context/theme-context';

function App() {
  const [theme, setTheme] = useState(themes.light);

  document.body.style.backgroundColor = theme.backgroundColor;
  document.body.style.color = theme.textColor;

  const toggleTheme = () => {
    setTheme(theme =>
      theme.textColor === "AntiqueWhite" ? themes.light : themes.dark
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Router>
        <Header/>
        <ThemeContext.Consumer>
          {contextTheme => <ToggleTheme theme={contextTheme} toggleTheme={toggleTheme}/>}
        </ThemeContext.Consumer>
        <Routes>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/" element={<TicketControl/>}/>
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;