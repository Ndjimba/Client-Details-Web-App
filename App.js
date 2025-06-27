import React, { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import ClientForm from "./ClientForm";
import ClientList from "./ClientList";
import Tabs from "./Tabs";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [activeTab, setActiveTab] = useState("contacts");

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

  const fetchClients = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/clients`);
      const data = await response.json();
      setClients(Array.isArray(data) ? data : []); // ✅ Fix applied here
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClients([]); // fallback to empty list if fetch fails
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchClients();
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

  const refreshAll = () => {
    fetchContacts();
    fetchClients();
    closeModal();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Contact Manager App</h1>
        <Tabs activeTab={activeTab} onChangeTab={setActiveTab} />
      </header>

      <main>
        {activeTab === "contacts" ? (
          <>
            <button onClick={openCreateModal} className="create-button">Add New Contact</button>
            <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={fetchContacts} />
          </>
        ) : (
          <>
            <ClientForm updateCallback={fetchClients} />
            <ClientList clients={clients} />
          </>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{currentContact.id ? "Edit Contact" : "Add New Contact"}</h2>
              <button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <ContactForm existingContact={currentContact} updateCallback={refreshAll} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
