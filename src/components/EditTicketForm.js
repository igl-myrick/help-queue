import React from "react";

function EditTicketForm() {
  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onTicketEdit({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      id: ticket.id
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

export default EditTicketForm;