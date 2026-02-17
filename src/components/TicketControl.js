import React, { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketView from './TicketView';
import EditTicketForm from './EditTicketForm';
import DeleteTicketForm from './DeleteTicketForm';

function TicketControl() {
  const [mainTicketList, setMainTicketList] = useState([]);
  const [newFormVisible, setNewFormVisible] = useState(false);
  const [ticketInfoVisible, setTicketInfoVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEditingTicket, setIsEditingTicket] = useState(false);
  const [isDeletingTicket, setisDeletingTicket] = useState(false);

  const handleClick = () => {
    setNewFormVisible(!newFormVisible);
  }

  const handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = mainTicketList.concat(newTicket);
    setMainTicketList(newMainTicketList);
    setNewFormVisible(false);
  }
  
  const handleRetrievingTicket = (id) => {
    let result = null;
    for (let i = 0; i < mainTicketList.length; i++) {
      if (mainTicketList[i].id === id) {
        result = mainTicketList[i];
        break;
      }
    }
    setSelectedTicket(result);
    setTicketInfoVisible(true);
    return result;
  }

  const beginEdit = () => {
    setTicketInfoVisible(false);
    setIsEditingTicket(true);
  }

  const handleTicketEdit = (ticketToEdit) => {
    const newMainTicketList = mainTicketList.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return {...ticket, location: ticketToEdit.location, names: ticketToEdit.names, issue: ticketToEdit.issue};
      }
    });
    console.log(newMainTicketList);
    setMainTicketList(newMainTicketList);
    setSelectedTicket(ticketToEdit);
    setIsEditingTicket(false);
    setTicketInfoVisible(true);
  }

  const beginDeletion = () => {
    setTicketInfoVisible(false);
    setisDeletingTicket(true);
  }

  const handleTicketDeletion = (ticketToDelete) => {
    let newMainTicketList = [];
    for (let i = 0; i < mainTicketList.length; i++) {
      if (mainTicketList[i].id !== ticketToDelete.id) {
        newMainTicketList.push(mainTicketList[i]);
      }
    }
    setMainTicketList(newMainTicketList);
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (newFormVisible) {
    currentlyVisibleState = <NewTicketForm onNewTicketCreation={handleAddingNewTicketToList}/>;
    buttonText = "Return to Ticket List";
  } else if (ticketInfoVisible) {
    currentlyVisibleState = <TicketView 
      ticket={selectedTicket} 
      handleEditingTicket={beginEdit}
      handleDeletingTicket={beginDeletion}/>
      buttonText = "Return to Ticket List";
  } else if (isEditingTicket) {
    currentlyVisibleState = <EditTicketForm onTicketEdit={handleTicketEdit}/>
    buttonText = "Return to Ticket";
  } else if (isDeletingTicket) {
    currentlyVisibleState = <DeleteTicketForm onTicketDeletion={handleTicketDeletion}/>
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = <TicketList ticketList={mainTicketList} handleRetrievingTicket={handleRetrievingTicket}/>;
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