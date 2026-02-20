import React, { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import EditTicketForm from './EditTicketForm';
import TicketList from './TicketList';
import TicketView from './TicketView';

function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    if (selectedTicket !== null) {
      setFormVisibleOnPage(false);
      setSelectedTicket(null);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = mainTicketList.concat(newTicket);
    setMainTicketList(newMainTicketList);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedTicket = (id) => {
    const selection = mainTicketList.find(ticket => ticket.id === id);
    setSelectedTicket(selection);
  }

  const handleDeleteTicket = (id) => {
    const newMainTicketList = mainTicketList.filter(ticket => ticket.id !== id);
    setMainTicketList(newMainTicketList);
    setSelectedTicket(null);
  }

  const handleEditClick = () => {
    setIsEditing(true);
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (isEditing) {
    currentlyVisibleState = (
      <EditTicketForm ticket={selectedTicket}/>
    )
  } else if (selectedTicket !== null) {
    currentlyVisibleState = 
      <TicketView
        ticket={selectedTicket}
        onClickingDelete={handleDeleteTicket}
        onClickingEdit={handleEditClick}
      />;
    buttonText = "Return to Ticket List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = 
      <NewTicketForm
        onNewTicketCreation={handleAddingNewTicketToList}
      />;
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = 
      <TicketList
        ticketList={mainTicketList}
        onTicketSelection={handleChangingSelectedTicket}
      />;
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