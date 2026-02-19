import React from "react";
import PropTypes from "prop-types";

function TicketView(props) {
  const { ticket } = props;

  return (
    <React.Fragment>
      <h1>Ticket Details</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <hr/>
    </React.Fragment>
  );
}

TicketView.propTypes = {
  ticket: PropTypes.object
}

export default TicketView;