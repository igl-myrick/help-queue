import React from "react";
import PropTypes from "prop-types";

function DeleteTicketForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={handleDeleteTicketFormSubmission}>
        <p>Are you sure you want to delete this ticket?</p>
        <h3>{props.ticket.location} - {props.ticket.names}</h3>
        <p><em>{props.ticket.issue}</em></p>
        <button type="submit">Delete</button>
      </form>
    </React.Fragment>
  )
}

DeleteTicketForm.propTypes = {
  ticket: PropTypes.object
}

export default DeleteTicketForm;