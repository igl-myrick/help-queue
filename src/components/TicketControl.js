import React, { useEffect, useState } from 'react';
import NewTicketForm from './NewTicketForm';
import EditTicketForm from './EditTicketForm';
import TicketList from './TicketList';
import TicketView from './TicketView';
import { db, auth } from "./../firebase.js";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "tickets"),
      (querySnapshot) => {
        const tickets = [];
        querySnapshot.forEach((doc) => {
          const timeOpen = doc.get("timeOpen", {serverTimestamps: "estimate"}).toDate();
          const jsDate = new Date(timeOpen);
          tickets.push({
            names: doc.data().names,
            location: doc.data().location,
            issue: doc.data().issue,
            timeOpen: jsDate,
            formattedWaitTime: formatDistanceToNow(jsDate),
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

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the queue.</h1>
      </React.Fragment>
    );
  } else if (auth.currentUser != null) {
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
}

export default TicketControl;