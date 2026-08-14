import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { ThemeContext } from '../context/theme-context';

function Header() {
  const theme = useContext(ThemeContext);

  const styles = { 
    color: theme.linkColor
  }

  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <ul>
        <li>
          <Link style={styles} to="/">Home</Link>
        </li>
        <li>
          <Link style={styles} to="/sign-in">Sign In</Link>
        </li>
      </ul>
      <hr/>
    </React.Fragment>
  );
}

export default Header;