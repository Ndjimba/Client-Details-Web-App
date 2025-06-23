import React, { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/contacts`);
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => setIsModalOpen(true);

  const openEditModal = (contact) => {
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Contact Manager App</h1>
        <button onClick={openCreateModal} className="create-button"> Add New Contact </button>
      </header>
      <main>
        <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={fetchContacts} />
      </main>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{currentContact.id ? "Edit Contact" : "Add New Contact"}</h2>
              <button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;