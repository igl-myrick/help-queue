import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  const { formSubmissionHandler, buttonText } = props;

  return (
    <React.Fragment>
      <form onSubmit={formSubmissionHandler}>
        <input
          type="text"
          name="names"
          placeholder="Pair Names"/>
        <input
          type="text"
          name="location"
          placeholder="Location"/>
        <textarea
          name="issue"
          placeholder="Describe your issue."/>
        <button type="submit">{buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
}

export default ReusableForm;