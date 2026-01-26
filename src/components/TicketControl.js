import React, { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);

  let currentlyVisibleState = null;

  if (formVisibleOnPage) {
    currentlyVisibleState = <NewTicketForm/>;
  } else {
    currentlyVisibleState = <TicketList/>;
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
    </React.Fragment>
  );
}

export default TicketControl;