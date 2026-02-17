import React from "react";
import PropTypes from "prop-types";

function EditTicketForm(props) {
  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onTicketEdit({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      id: event.target.id.value
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleEditTicketFormSubmission}>
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
        <button type="submit">Edit</button>
      </form>
    </React.Fragment>
  )
}

EditTicketForm.propTypes = {
  onTicketEdit: PropTypes.func
}

export default EditTicketForm;