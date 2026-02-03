import React, { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketView from './TicketView';
// import EditTicketForm from './EditTicketForm';
// import DeleteTicketForm from './DeleteTicketForm';

function TicketControl() {
  const [mainTicketList, setMainTicketList] = useState([]);
  const [newFormVisible, setNewFormVisible] = useState(false);
  const [ticketInfoVisible, setTicketInfoVisible] = useState(false);
  // const [editFormVisible, setEditFormVisible] = useState(false);
  // const [deleteFormVisible, setDeleteFormVisible] = useState(false);

  const handleClick = () => {
    setNewFormVisible(!newFormVisible);
  }

  const handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = mainTicketList.concat(newTicket);
    setMainTicketList(newMainTicketList);
    setNewFormVisible(false);
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (newFormVisible) {
    currentlyVisibleState = <NewTicketForm onNewTicketCreation={handleAddingNewTicketToList}/>;
    buttonText = "Return to Ticket List";
  } else if (ticketInfoVisible) {
    currentlyVisibleState = <TicketView/>
    buttonText = "Return to Ticket List";
  // } else if (editFormVisible) {
  //   currentlyVisibleState = <EditTicketForm/>
  //   buttonText = "Return to Ticket List";
  // } else if (deleteFormVisible) {
  //   currentlyVisibleState = <DeleteTicketForm/>
  //   buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = <TicketList ticketList={mainTicketList}/>;
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