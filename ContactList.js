import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const onDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) {
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/delete_contact/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to delete contact");
            }
            updateCallback();
        } catch (error) {
            console.error("Error deleting contact:", error);
            alert("Failed to delete contact. Please try again.");
        }
    };

    return (
        <div className="contact-list">
            <h2>My Contacts</h2>
            {contacts.length === 0 ? (
                <p className="no-contacts">No contacts found. Add a new contact to get started.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{`${contact.firstName} ${contact.lastName}`}</td>
                                <td>{contact.email}</td>
                                <td>
                                    <button onClick={() => updateContact(contact)} className="edit-button"> Edit </button>
                                    <button onClick={() => onDelete(contact.id)} className="delete-button"> Delete </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ContactList;