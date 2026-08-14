import React, { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import PropTypes from "prop-types";

function ReusableForm(props) {
  const { formSubmissionHandler, buttonText } = props;

  const theme = useContext(ThemeContext);

  const buttonStyles = {
    backgroundColor: theme.buttonBackground,
    color: theme.textColor
  }

  const inputStyles = {
    backgroundColor: theme.inputBackground,
    color: theme.textColor
  }

  return (
    <React.Fragment>
      <form onSubmit={formSubmissionHandler}>
        <input
          style={inputStyles}
          type="text"
          name="names"
          placeholder="Pair Names"/>
        <input
          style={inputStyles}
          type="text"
          name="location"
          placeholder="Location"/>
        <textarea
          style={inputStyles}
          name="issue"
          placeholder="Describe your issue."/>
        <button style={buttonStyles} type="submit">{buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
}

export default ReusableForm;