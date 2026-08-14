import React, { useState, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./../firebase";
import { ThemeContext } from "../context/theme-context";

function SignIn() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  const theme = useContext(ThemeContext);

  const buttonStyles = {
    backgroundColor: theme.buttonBackground,
    color: theme.textColor
  }

  const inputStyles = {
    backgroundColor: theme.inputBackground,
    color: theme.textColor
  }

  const doSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`);
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}`)
      });
  }
  
  const doSignIn = (event) => {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`);
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}`);
      });
  }

  const doSignOut = () => {
    signOut(auth)
      .then(() => {
        setSignOutSuccess("You have successfully signed out!");
      })
      .catch((error) => {
        setSignOutSuccess(`There was an error signing out: ${error.message}`);
      });
  }

  return (
    <React.Fragment>
      <h1>Sign up</h1>
      {signUpSuccess}
      <form onSubmit={doSignUp}>
        <input
          style={inputStyles}
          type="text"
          name="email"
          placeholder="Email"/>
        <input
          style={inputStyles}
          type="password"
          name="password"
          placeholder="Password"/>
        <button style={buttonStyles} type="submit">Sign up</button>
      </form>

      <h1>Sign in</h1>
      {signInSuccess}
      <form onSubmit={doSignIn}>
        <input
          style={inputStyles}
          type="text"
          name="signInEmail"
          placeholder="Email"/>
        <input
          style={inputStyles}
          type="password"
          name="signInPassword"
          placeholder="Password"/>
        <button style={buttonStyles} type="submit">Sign In</button>
      </form>

      <h1>Sign out</h1>
      {signOutSuccess}
      <br/>
      <button style={buttonStyles} onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
}

export default SignIn;