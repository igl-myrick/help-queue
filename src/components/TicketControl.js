import React, { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);

  const handleClick = () => {
    setFormVisibleOnPage(!formVisibleOnPage);
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (formVisibleOnPage) {
    currentlyVisibleState = <NewTicketForm/>;
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = <TicketList/>;
    buttonText = "Add Ticket";
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={handleClick}>{buttonText}</button>
    </React.Fragment>
  );
}

export default TicketControl;