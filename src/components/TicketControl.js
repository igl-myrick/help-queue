import React, { useEffect, useState } from 'react';
import NewTicketForm from './NewTicketForm';
import EditTicketForm from './EditTicketForm';
import TicketList from './TicketList';
import TicketView from './TicketView';
import db from "./../firebase.js";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "tickets"),
      (collectionSnapshot) => {
        const tickets = [];
        collectionSnapshot.forEach((doc) => {
          tickets.push({
            names: doc.data().names,
            location: doc.data().location,
            issue: doc.data().issue,
            id: doc.id
          });
        });
        setMainTicketList(tickets);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedTicket !== null) {
      setFormVisibleOnPage(false);
      setSelectedTicket(null);
      setIsEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewTicketToList = async (newTicketData) => {
    await addDoc(collection(db, "tickets"), newTicketData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedTicket = (id) => {
    const selection = mainTicketList.find(ticket => ticket.id === id);
    setSelectedTicket(selection);
  }

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleEditTicket = async (ticketToEdit) => {
    const ticketRef = doc(db, "tickets", ticketToEdit.id);
    await updateDoc(ticketRef, ticketToEdit);
    setIsEditing(false);
    setSelectedTicket(null);
  }

  const handleDeleteTicket = async (id) => {
    deleteDoc(doc(db, "tickets", id));
    setSelectedTicket(null);
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>
  } else if (isEditing) {
    currentlyVisibleState = (
      <EditTicketForm
        ticket={selectedTicket}
        onTicketEdit={handleEditTicket}/>
    );
    buttonText = "Return to Ticket List";
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
      {error ? null : <button onClick={handleClick}>{buttonText}</button>}
    </React.Fragment>
  );
}

export default TicketControl;