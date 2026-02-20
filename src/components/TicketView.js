import React from "react";
import PropTypes from "prop-types";

function TicketView(props) {
  const { ticket, onClickingDelete, onClickingEdit } = props;

  return (
    <React.Fragment>
      <h1>Ticket Details</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <button onClick={onClickingEdit}>Update Ticket</button>
      <button onClick={() => onClickingDelete(ticket.id)}>Close Ticket</button>
      <hr/>
    </React.Fragment>
  );
}

TicketView.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
}

export default TicketView;