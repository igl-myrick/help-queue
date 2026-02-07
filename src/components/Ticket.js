import React from "react";
import PropTypes from 'prop-types';

function Ticket(props) {
  return (
    <React.Fragment>
      <h3>{props.location} - {props.names}</h3>
      <p><em>{props.issue}</em></p>
      <button onClick={() => {props.handleRetrievingTicket(props.id)}} type="button">View Ticket</button>
      <hr/>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
  key: PropTypes.string,
  handleRetrievingTicket: PropTypes.func
}

export default Ticket;