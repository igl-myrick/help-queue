import React from "react";
import PropTypes from "prop-types";

function TicketView(props) {
  return (
    <React.Fragment>
      <h3>{props.ticket.location} - {props.ticket.names}</h3>
      <p><em>{props.ticket.issue}</em></p>
      <button onClick={() => {}} type="button">New Ticket</button>
      <button onClick={() => {props.handleEditingTicket()}} type="button">Edit Ticket</button>
      <button type="button">Delete Ticket</button>
      <hr/>
    </React.Fragment>
  )
}

TicketView.propTypes = {
  ticket: PropTypes.object,
  handleEditingTicket: PropTypes.func
}

export default TicketView;